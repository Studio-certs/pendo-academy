import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms and Conditions</h1>
          
          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to our learning platform. These Terms and Conditions govern your use of our website, services, and products. By accessing or using our platform, you agree to be bound by these Terms and Conditions.
            </p>

            <h2>2. Definitions</h2>
            <p>
              <strong>"Platform"</strong> refers to our website, applications, and services.<br />
              <strong>"User"</strong> refers to any individual who accesses or uses the Platform.<br />
              <strong>"Content"</strong> refers to any material available on the Platform, including but not limited to courses, videos, text, images, and audio.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To access certain features of the Platform, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>

            <h2>4. User Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the Platform for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
              <li>Interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
              <li>Post or transmit any content that is harmful, offensive, or otherwise objectionable</li>
              <li>Attempt to gain unauthorized access to any part of the Platform</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All content on the Platform, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of the Platform or its content suppliers and is protected by international copyright laws.
            </p>

            <h2>6. Payment and Refunds</h2>
            <p>
              Payment for courses and services is processed through our secure payment system. All purchases are final and non-refundable unless otherwise specified in our refund policy.
            </p>

            <h2>7. Token System</h2>
            <p>
              Our platform uses a token-based system for accessing premium content. Tokens purchased are non-transferable and non-refundable. The platform reserves the right to modify the token system, including pricing and conversion rates, at any time.
            </p>

            <h2>8. Privacy Policy</h2>
            <p>
              Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms and Conditions by reference.
            </p>

            <h2>9. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms and Conditions or is harmful to other users of the Platform, us, or third parties, or for any other reason.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the Platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. If we make changes, we will provide notice by posting the updated terms on the Platform and updating the "Last Updated" date.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at support@learningplatform.com.
            </p>

            <p className="text-sm text-gray-500 mt-8">Last Updated: May 1, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}