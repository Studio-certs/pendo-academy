import React, { useState, useEffect } from 'react';
    import { Cookie, ShieldCheck, X } from 'lucide-react';

    export default function CookieConsent() {
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          setIsVisible(true);
        }
      }, []);

      const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
      };

      const handleDecline = () => {
        // You might want to implement different behavior for declining
        // For now, we'll just hide it, but not store consent
        setIsVisible(false);
        // Optionally, you could store 'declined' and handle it differently
        // localStorage.setItem('cookieConsent', 'declined');
      };

      if (!isVisible) {
        return null;
      }

      return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div className="flex items-start mb-4 sm:mb-0">
                <Cookie className="w-8 h-8 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Cookie Consent & Privacy</h3>
                  <p className="text-sm text-gray-600">
                    We use cookies to enhance your experience and ensure our platform functions correctly. By continuing to use our site, you agree to our use of cookies and our{' '}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 space-x-3 mt-4 sm:mt-0 sm:ml-6">
                <button
                  onClick={handleAccept}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <X className="w-4 h-4 mr-2" />
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
