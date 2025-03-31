// @ts-nocheck
import { cors } from '../_shared/cors.ts';
import Stripe from 'npm:stripe@14.18.0';
import { supabaseClient } from '../_shared/supabaseClient.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Get request body
    const { amount, user_id, token_type_id } = await req.json();

    // Log incoming request data
    console.log('Request data:', { amount, user_id, token_type_id });

    // Validate required parameters
    if (!amount || !user_id || !token_type_id) {
      throw new Error(`Missing required parameters: ${[
        !amount && 'amount',
        !user_id && 'user_id',
        !token_type_id && 'token_type_id'
      ].filter(Boolean).join(', ')} required`);
    }

    // Validate amount is a positive number
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Amount must be a positive number');
    }

    // Get token type details
    const { data: tokenType, error: tokenTypeError } = await supabaseClient
      .from('token_types')
      .select('*')
      .eq('id', token_type_id)
      .limit(1)
      .single();

    console.log('Token type query result:', { tokenType, tokenTypeError });

    if (tokenTypeError) {
      throw new Error(`Error fetching token type: ${tokenTypeError.message}`);
    }

    if (!tokenType) {
      throw new Error(`Token type not found with ID: ${token_type_id}`);
    }

    // Calculate tokens based on conversion rate
    const tokens = Math.round(amount * tokenType.conversion_rate);

    // Get Stripe key from environment variable
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      throw new Error('Stripe key not configured');
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: tokenType.name,
              description: `${tokens} ${tokenType.name}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/profile?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/buy-tokens`,
      metadata: {
        user_id,
        tokens: tokens.toString(),
        token_type_id
      },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id, url: session.url }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);

    return new Response(
      JSON.stringify({
        error: {
          message: error.message || 'Internal server error',
          type: error.type || 'internal_error',
          code: error.statusCode || 500,
        }
      }),
      {
        status: error.statusCode || 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});