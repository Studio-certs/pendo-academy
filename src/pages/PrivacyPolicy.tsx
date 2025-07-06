import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none">
            <p className="text-sm text-gray-500 mb-6">Last Updated: May 2025</p>

            <p className="mb-6">
              We are committed to protecting your privacy. Any personal information collected
              through this website will be handled in accordance with the Australian Privacy Act
              1988. We may collect data such as your name, email address, and browsing activity
              to improve our services. Your information will not be shared with third parties without
              your consent, except as required by law.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Introduction</h2>
            <p>
              At Pendo Academy Website or Pendo Health Pty Ltd, trading as Pendo Academy or Pendo Health Pty Ltd ("Pendo Academy," “Pendo Health Pty Ltd”, “The Company”, “The Website”, "we," "our," and "us"), we are committed to protecting your privacy. We comply with the Australian Privacy Principles outlined in the Privacy Act 1988 (Cth) ("Privacy Act").
            </p>
            <p>
              This privacy policy ("Privacy Policy") explains our information collection and privacy practices concerning our current and future services, including online applications ("Services"). It is designed to help you understand:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>How we manage your personal information.</li>
              <li>How we collect information, its purpose, and to whom it is disclosed.</li>
              <li>The measures we take to protect your information.</li>
            </ul>
            <p>
              By using our Services, you consent to the practices described in this Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">What Is Personal Information?</h2>
            <p>
              "Personal information" refers to information or opinions about an individual that can
              reasonably identify them, as defined by the Privacy Act. This may include health or
              sensitive data. We are dedicated to protecting your personal information in
              accordance with the Privacy Act and other applicable privacy laws.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Types of Personal Information We Collect and Hold</h2>
            <p>
              The personal information we collect depends on its intended purpose. This may
              include:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Contact details of website visitors (e.g., name, phone number, email address).</li>
              <li>Contact, credit card, and debit card details for users permitted to access Services.</li>
              <li>Information from job applicants, such as name, contact details, qualifications, academic results, experience, and current salary.</li>
              <li>Information about suppliers or individuals employed by suppliers.</li>
              <li>Other personal information that may arise from transactions and correspondence.</li>
            </ul>
            <p>
              If you provide unsolicited sensitive information, we may use it if it is essential for
              delivering our Services or if permitted by law.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Using Our Website</h2>
            <p>
              When accessing the Services, we may collect non-identifiable information about your
              usage. This includes:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Search queries, IP addresses, hardware settings, browser type and language, request timestamps, referral URLs, and certain cookies that identify your browser.</li>
            </ul>
            <p>
              We use and disclose this information in anonymized and aggregated forms to
              improve the functionality of our Services. You remain unidentifiable in these cases.
              However, in rare instances—such as a data breach or government investigation—we
              may be required to disclose this information in accordance with legal obligations.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Direct Marketing Communications</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>We will only send you direct marketing communications via mail, SMS, or email—including news, exclusive offers, promotions, or events—with your explicit consent.</li>
              <li>You may opt out of receiving these communications at any time by contacting us or using the opt-out options provided in the communications.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Does Personal Information Leave Australia?</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Your personal information is stored electronically and may also be held in cloud storage systems. To provide our products and services, we may disclose your personal information to overseas recipients, including service providers located abroad.</li>
              <li>Internal disclosures may include sharing personal information with staff located overseas. External disclosures may include:
                <ul className="list-disc pl-6 mt-2">
                  <li>Service providers engaged to perform specific services for us.</li>
                  <li>Companies providing infrastructure, IT, or other services.</li>
                  <li>Any party where you have given consent.</li>
                  <li>Any entity as required or permitted by law.</li>
                </ul>
              </li>
              <li>Unless an exception under the Privacy Act or other legislation applies, we will take commercially reasonable steps to ensure overseas recipients comply with the Australian Privacy Principles regarding your personal information.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">How Do We Protect Your Personal Information?</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>We take reasonable precautions to safeguard your personal information from misuse, loss, and unauthorized access, modification, or disclosure. Third parties receiving your personal information are also required to implement similar measures.</li>
              <li>Please notify us immediately if you become aware of any security breaches related to your personal information.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Accuracy of Personal Information</h2>
            <p>
              You have the right to request updates or corrections to any personal information we
              hold about you. We strive to keep your personal information as accurate as
              reasonably possible and rely on the information provided directly by you or indirectly
              through other channels.
            </p>
            <p>
              Please contact us if you believe the personal information we hold about you is
              inaccurate or if there are changes that need to be updated.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">How Long We Retain Your Personal Information</h2>
            <p>
              We will retain your personal information for as long as necessary to fulfill the
              purposes for which it was collected, as outlined in this Privacy Policy, unless a longer
              retention period is required by law or is necessary to comply with legal obligations,
              resolve disputes, or ensure security.
            </p>
            <p>
              When personal information is no longer needed, we will take reasonable steps to
              delete it from our systems or de-identify it.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Accessing and Correcting Your Personal Information</h2>
            <p>
              You can request access to the personal information the website or the
              company holds about you by using the contact details provided in the "Our Contact
              Details" section below. Access will be granted in accordance with the Privacy Act,
              subject to certain exemptions.
            </p>
            <p>
              We may require suitable identification from individuals requesting access, and in
              some cases, an administration fee may apply where permitted by law.
            </p>
            <p>
              If you identify errors in the personal information we hold or wish to update it, please
              notify us.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">How to Complain About a Privacy Breach</h2>
            <p>
              If you have questions, concerns, or complaints regarding how we collect, use, or
              disclose personal information, or if you believe we have not complied with the
              Privacy Policy or Privacy Act, please contact us.
            </p>
            <p>
              Pendo Academy Website or Pendo Health Pty Ltd takes privacy complaints
              seriously. Complaints will be reviewed by an appropriate person with the goal of
              resolving them efficiently. We may request relevant information to assist in this
              process, and we ask for your cooperation.
            </p>
            <p>
              If you are dissatisfied with our response, you can escalate your complaint to the
              Office of the Australian Information Commissioner, who may investigate further.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Our Contact Details</h2>
            <p>
              If you have questions or concerns about the personal information we hold or how we
              manage it, please contact using the contact form available on this website.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Privacy Policy</h2>
            <p>
              This Privacy Policy was last updated in May 2025. We may amend this Privacy
              Policy from time to time by updating this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
