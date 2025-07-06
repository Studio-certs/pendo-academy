import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MessageSquare, Loader2, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';

export default function ContactUs() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Insert submission into Supabase
      const { error: submissionError } = await supabase
        .from('contact_submissions')
        .insert({
          full_name: fullName,
          email,
          phone,
          inquiry,
        });

      if (submissionError) {
        // If Supabase insert fails, we stop and show an error.
        throw submissionError;
      }

      // Step 2: Send email notification via EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const templateParams = {
          to_email: 'study@pendoacademy.com',
          subject: 'New Contact Us Inquiry',
          to_name: 'Pendo Team',
          message: `You have a new contact us Inquiry. Please contact them at the earliest. \n
          
Full Name: ${fullName} \n
Email: ${email} \n
Phone: ${phone || 'Not provided'} \n
Inquiry:
${inquiry} \n`,
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        // Log an error for developers if env vars are missing, but don't block the user.
        // The primary action (saving the inquiry) was successful.
        console.error("EmailJS environment variables are not fully configured. Email not sent.");
      }

      // If both steps are successful (or email sending is skipped gracefully), show success.
      setSubmitted(true);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Error submitting form:', errorMessage);
      setError('There was an error sending your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {submitted ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Thank You!</h2>
              <p className="mt-2 text-sm text-gray-600">
                Your message has been sent successfully. We will get back to you shortly.
              </p>
              <Link
                to="/"
                className="mt-8 w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <Link to="/" className="inline-block">
                  <img
                    src="https://rgltgdklkrksczphrupu.supabase.co/storage/v1/object/public/images//PENDO-ACADEMY.png"
                    alt="Logo"
                    className="h-40 w-auto mx-auto"
                  />
                </Link>
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                  Get in Touch
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  We'd love to hear from you. Please fill out the form below.
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="full-name"
                        name="full-name"
                        type="text"
                        autoComplete="name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1 relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Inquiry */}
                  <div>
                    <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700">
                      Inquiry
                    </label>
                    <div className="mt-1 relative">
                      <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <textarea
                        id="inquiry"
                        name="inquiry"
                        rows={4}
                        required
                        value={inquiry}
                        onChange={(e) => setInquiry(e.target.value)}
                        className="pl-10 block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Submit Inquiry'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&amp;amp;cs=tinysrgb&amp;amp;w=1260&amp;amp;h=750&amp;amp;dpr=2"
          alt="People working in an office"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-blue-800 mix-blend-multiply opacity-50" />
      </div>
    </div>
  );
}
