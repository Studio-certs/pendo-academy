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
    // Get and validate the request body
    const body = await req.json();
    const { session_id, user_id } = body;

    // Validate required parameters
    if (!session_id || !user_id) {
      throw new Error('Missing required parameters');
    }

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

    // Retrieve the session with line items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    });

    // Verify the payment was successful
    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed');
    }

    // Verify the user_id matches
    if (session.metadata.user_id !== user_id) {
      throw new Error('Invalid user');
    }

    // Get the number of tokens and token type from metadata
    const tokens = parseInt(session.metadata.tokens, 10);
    const tokenTypeId = session.metadata.token_type_id;

    if (!tokenTypeId) {
      throw new Error('Token type not specified');
    }

    // Calculate the total amount paid
    const amountPaid = session.amount_total ? session.amount_total / 100 : tokens; // Convert from cents to dollars

    try {
      // Call the handle_payment_success function
      const { data, error: rpcError } = await supabaseClient.rpc('handle_payment_success', {
        p_user_id: user_id,
        p_amount: amountPaid,
        p_tokens: tokens,
        p_stripe_checkout_id: session_id,
        p_token_type_id: tokenTypeId
      });

      if (rpcError) {
        console.error('Error in handle_payment_success:', rpcError);
        throw rpcError;
      }

      if (!data) {
        throw new Error('No response from handle_payment_success');
      }

      return new Response(
        JSON.stringify({ 
          success: true,
          tokens,
          amount: amountPaid
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to update transaction records');
    }
  } catch (error) {
    console.error('Error verifying payment:', error);

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
