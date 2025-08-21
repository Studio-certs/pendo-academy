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
            <p className="text-sm text-gray-500 mb-6">Last Updated: May 2025</p>

            <div className="bg-gray-100 p-4 my-6 rounded-lg border-l-4 border-gray-400">
              <h2 className="text-xl font-semibold mt-6 mb-3">Website User Agreement</h2>
              <p className="font-bold mb-2">
                Pendo Academy's website is owned and operated by Pendo Health Pty Ltd, with an Australian Business Number (ABN) of 17 639 720 433 (Collectively, “Pendo Academy," “Pendo Health Pty Ltd”, “The Company”, “The Website”, "we," "our," and "us"). 
              </p>
              <p>
                By accessing this website, you agree to comply with and be bound by the terms and conditions listed below. If you do not agree, you must leave the site. The website serves as an advertisement for the company, offering information for general purposes only without making any guarantees. Content may change at any time without prior notice.
              </p>
              <p>
                Unauthorized use of the website may result in legal action, including claims for damages or criminal charges. The website and its affiliates reserve the right to deny service to users or reject requests for information made through the site.
              </p>
              <p>
                All intellectual property rights associated with this website are protected. You are not permitted to copy, share, or exploit any content without written permission. Such permission can be requested via the ‘Contact Us’ form.
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-3">Key Definitions</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Sale:</strong> Refers to the sale of items listed on this website, managed by the website's owning company, and identified with a Sale Number.</li>
              <li><strong>Australian Consumer Law:</strong> The consumer protection laws outlined in Schedule Two of the Competition and Consumer Act 2010 (Cth).</li>
              <li><strong>Buyer:</strong> A registered purchaser of products on this website who has completed the transaction, with payments received and validated by the website owner.</li>
              <li><strong>Company:</strong> The owner and operator of this website.</li>
              <li><strong>Website:</strong> Refers to the online platform operated by the Company, accessible via [https://pendoacademy.com/], where products and services are listed, sold, and managed.</li>
              <li><strong>Coins:</strong> Digital tokens used to purchase or access goods, services, or information on this website. Coins are bought using government-issued legal currency.</li>
              <li><strong>Condition of Product:</strong> The description of an item or service as listed on the website.</li>
              <li><strong>Damage and Description Disclaimer:</strong> A notice explaining potential damage or discrepancies in the description of products, as shown on the product listing.</li>
              <li><strong>Deposit:</strong> The amount of Coins stored in a user's account. Deposits are non-refundable.</li>
              <li><strong>Encumbrance:</strong> Includes:
                <ol className="list-decimal pl-6">
                  <li>Any financial claim, lien, or security interest over an item, such as mortgages or pledges.</li>
                  <li>Agreements to create such claims or security interests.</li>
                </ol>
              </li>
              <li><strong>EPA Authority:</strong> Licences, permits, or registrations as outlined in the Environment Protection Act 2017 (Vic).</li>
              <li><strong>GST:</strong> Goods and Services Tax under the GST Act: A New Tax System (Goods and Services Tax) Act 1999 (Cth).</li>
              <li><strong>Loss:</strong> Any form of damage, liability, or expense (including legal fees), whether current or future, actual or potential.</li>
              <li><strong>Non-PDH Goods:</strong> Products not typically purchased for personal, domestic, or household use.</li>
              <li><strong>PDH Goods:</strong> Products commonly purchased for personal, domestic, or household use.</li>
              <li><strong>PPS Register:</strong> The registry under the Personal Property Securities Act for recording security interests.</li>
              <li><strong>Product:</strong> Goods, services, information, or processes available for purchase on this website, linked to a Sale Number.</li>
              <li><strong>Purchase Price:</strong> The price accepted by the website administrator for the product, including any applicable fees.</li>
              <li><strong>Sale Number:</strong> The unique identifier assigned to a product for sale.</li>
              <li><strong>Seller:</strong> The product owner or the person who authorizes the website to sell the product on their behalf.</li>
              <li><strong>Taxable Supply:</strong> A term defined in the GST Act.</li>
              <li><strong>Tax Invoice:</strong> As outlined in the GST Act.</li>
              <li><strong>Website:</strong> This site you are currently visiting.</li>
              <li><strong>WH&S Legislation:</strong> Workplace health and safety laws applicable where the sale occurs.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">Website User Agreement</h2>
            <p>
              By accessing this website, you agree to comply with and be bound by the terms and
              conditions listed below. If you do not agree, you must leave the site. The website
              serves as an advertisement for the company, offering information for general
              purposes only without making any guarantees. Content may change at any time
              without prior notice.
            </p>
            <p>
              Unauthorized use of the website may result in legal action, including claims for
              damages or criminal charges. The website and its affiliates reserve the right to deny
              service to users or reject requests for information made through the site.
            </p>
            <p>
              All intellectual property rights associated with this website are protected. You are not
              permitted to copy, share, or exploit any content without written permission. Such
              permission can be requested via the 'Contact Us' form.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Sale Contract Parties</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Agent Role:</strong> The website acts as an agent on behalf of the Seller.</li>
              <li><strong>Contract Formation:</strong> The sale contract for a product is directly between the Seller and the Buyer.</li>
              <li><strong>Entire Agreement:</strong> Buyer's registration, these Terms and Conditions, and the sale record collectively constitute the full agreement between the Company, Seller, and Buyer.</li>
              <li><strong>Dispute Resolution:</strong> Any dispute related to a product is strictly between Buyer and Seller. The Buyer agrees to release the Company and Website from any liability or Loss related to the product and indemnify them on a full indemnity basis for all costs, including those related to prior, current, or future claims.</li>
            </ol>

            <p className="my-4">
              We act only as a reseller or facilitator of third-party courses. The final responsibility
              for course delivery, content, and quality lies with the course provider. We are not
              liable for any changes, cancellations, or disputes that arise directly between you and
              the course provider.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Buying a Product</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Eligibility:</strong> Buyers must be either legal adults or legally registered entities.</li>
              <li><strong>Registration:</strong> Buyers must register on the Website, verify their identity, and allow the Website to collect their personal information for processing purchases and deliveries. By registering, Buyers consent to the use of their personal data by the Website, its personnel, affiliated companies, and subsidiaries.</li>
              <li><strong>Agreement to Terms:</strong> By registering, Buyers agree to adhere to these Terms and Conditions.</li>
              <li><strong>Acting as an Agent:</strong> Buyers are assumed to act on their own behalf unless they disclose, before purchase, that they are acting as an agent for another party. In such cases, On demand, Buyers must provide written authority and any required documents.</li>
              <li><strong>Use of Coins:</strong> Buyers must purchase coins on the Website. These coins can then be exchanged for Products.</li>
              <li><strong>Prohibited Use of Coins:</strong> Coins are strictly intended for purchasing goods, services, and information on the website. Any attempts to transfer, trade, or sell Coins outside the website are strictly prohibited. Buyers agree not to engage in such activities and acknowledge that doing so may result in account suspension or termination without notice.</li>
              <li><strong>Fraud Prevention:</strong> The Company reserves the right to investigate any suspicious activity related to Coins. Buyers agree to cooperate with any investigations and accept that the Company may restrict access to accounts or Coins during the investigation period.</li>
              <li><strong>Account Verification:</strong> The Company may request additional verification steps to prevent misuse or fraudulent activity related to Coins. Buyers agree to comply with these requests promptly to maintain access to their accounts.</li>
              <li><strong>Loss of Coins Due to Unauthorized Use:</strong> The Website and Company are not liable for any Coins lost due to unauthorized access or misuse of the Buyer's account. Buyers are responsible for safeguarding their account credentials and notifying the Website immediately if any breach or unauthorized activity is suspected.</li>
              <li><strong>Coin Transactions:</strong> All transactions involving Coins are subject to review and approval by the Company. Transactions that appear suspicious or violate the Terms and Conditions may be blocked or reversed without notice.</li>
              <li><strong>Expiration of Coins:</strong> Coins that remain unused for five years will expire and revert to the Company, as per Clause 10. Buyers acknowledge that once reverted, Coins cannot be reclaimed.</li>
              <li><strong>Restricted Conversion:</strong> Coins cannot be converted back into legal currency or any other form of payment. Buyers agree that Coins only hold value within the context of the website and its offerings.</li>
              <li><strong>Termination for Violation:</strong> Any breach of these additional terms regarding Coins may result in immediate termination of the Buyer's account. The Company reserves the right to withhold any remaining Coins or other account balances as compensation for damages caused by the violation.</li>
              <li><strong>Product Availability:</strong> Products may become unavailable for purchase or delivery at the sole discretion of the Company, even after issuing a tax invoice. If this occurs, Coins used for the purchase will be refunded to the Buyer's deposit.</li>
              <li><strong>Right to Refuse Service:</strong> The Website and Company may refuse service to a Buyer without explanation.</li>
              <li><strong>Technical Issues:</strong> The Website and Company are not liable for technical delays or failures in processing purchases or deliveries. Buyers agree not to hold the Website or Company accountable for any resulting losses, including those caused by errors beyond their control (e.g., internet issues). Buyers must indemnify the Website and Company against third-party claims arising from these losses.</li>
              <li><strong>Binding Record:</strong> The Buyer's details entered in the sale record are binding and serve as proof of agreement to purchase.</li>
              <li><strong>System Limitations:</strong> The Website cannot guarantee the security of its system or the Buyer's information due to potential issues like system failures, errors, or misuse.</li>
              <li><strong>Inactive Wallets:</strong> Coins stored in wallets inactive for over five years will revert to the Company. The Company will send annual reminders to the associated email address before this occurs.</li>
              <li><strong>Delivery:</strong> Buyers bear delivery costs, which will be communicated before purchase. Special delivery requests incur additional fees. Delivery costs must be paid before dispatch.</li>
              <li><strong>Uncollected Purchases:</strong> If a Product is uncollected and storage fees equal 60% of the sale price, the Website may sell the Product to recover fees. Any remaining balance will be refunded to the Buyer as Coins.</li>
              <li><strong>Delayed Collection:</strong> If a Product is not collected within seven working days (bank trading days in Victoria, Australia), the Website is not responsible for damages or loss.</li>
              <li><strong>Buyer's Responsibility:</strong> Buyers must conduct due diligence before purchasing. If a Seller's Product does not meet expectations or legal requirements, the Buyer agrees not to hold the Website or Company responsible and indemnifies them against all costs in case of claims against the Seller.</li>
              <li><strong>Deposit Amount:</strong> The deposit amount is specified on the course page and during checkout. The amount varies depending on the course selected and will be deducted from the total course fee.</li>
              <li><strong>Balance Payment:</strong> The remaining balance of the course fee must be paid by the due date specified in your confirmation email.</li>
              <li><strong>Non-refundable deposit:</strong> All deposits are non-refundable.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Selling a Product</h2>
            <ol className="list-decimal pl-6 space-y-2" start="27">
              <li><strong>Ownership and Authority:</strong> The Seller guarantees that, at the time the Product is advertised for sale on the Website, they have legal ownership of the Product, full authority to sell it, and no undisclosed Encumbrances on it.</li>
              <li><strong>Product Representation:</strong> The Seller commits to providing a true and accurate representation of the Product. The Website relies on this guarantee to list the Product for sale.</li>
              <li><strong>Seller Charges:</strong> The Seller accepts responsibility for all charges related to selling the Product, including transaction fees, taxes, levies, and other applicable governmental charges. The Website or Company will issue an invoice detailing these charges, which may change or be added during the sales process. Sellers are responsible for staying informed of these charges, which will be deducted from the sale price.</li>
              <li><strong>Guarantees and Consumer Law:</strong> Any guarantee provided by the Seller or the Website under this section is additional to, and does not override, any rights or remedies available to Buyers under Australian Consumer Law or other applicable legislation.</li>
              <li><strong>Prohibited Listings:</strong> The Seller agrees not to list Products that infringe intellectual property rights, violate laws, or breach the Website's policies. The Website reserves the right to remove such listings without prior notice.</li>
              <li><strong>Liability for Inaccuracies:</strong> The Seller bears full responsibility for any misrepresentation or inaccuracy in their Product listing. The Seller agrees to indemnify the Website and Company from any claims or losses arising from inaccurate or misleading listings.</li>
              <li><strong>Suspension or Termination:</strong> The Website reserves the right to suspend or terminate the Seller's account if they breach these Terms and Conditions, provide false information, or engage in fraudulent or illegal activity. In such cases, the Seller forfeits any proceeds or rights associated with the sale.</li>
              <li><strong>Confidentiality:</strong> The Seller agrees to maintain the confidentiality of all correspondence or negotiations with the Website, Buyers, or third parties. Any breach of confidentiality may result in penalties, including the termination of the Seller's account.</li>
              <li><strong>Dispute Resolution:</strong> Any disputes between the Seller and Buyer must be resolved directly between those parties. The Seller agrees to release the Website and Company from any liability or claims related to such disputes.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Rights Reserved</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Withdrawal of Products:</strong> The Website and/or Seller reserve the right to withdraw any Product from sale at any time.</li>
              <li><strong>Company and Website Rights:</strong>
                <ol className="list-alpha pl-6 space-y-1">
                  <li><strong>Partial Sale:</strong> The Website reserves the right to offer only part of any listed Product for sale.</li>
                  <li><strong>Bundling Products:</strong> The Website may sell two or more Products as a single bundle. If the bundle does not sell, the Website may sell the items separately.</li>
                  <li><strong>Admission Refusal:</strong> The Website reserves the right to deny or eject any individual or organization from accessing the Website.</li>
                  <li><strong>Confidentiality of Pricing:</strong> The Website may withhold details about a Product's minimum or cost price.</li>
                  <li><strong>Allocation of Funds:</strong> If a Buyer purchases multiple Products, the Website reserves the right to allocate any received payments across those Products as it deems appropriate.</li>
                  <li><strong>Interdependent Contracts:</strong> The sale of multiple Products may be treated as interdependent. A default on one contract may be regarded as a default on all related contracts.</li>
                  <li><strong>Private Agreements:</strong> The Website may, at its discretion, sell a Product through a private agreement. Such agreements are subject to these Terms and Conditions unless explicitly agreed otherwise in writing by the Company.</li>
                </ol>
              </li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Warranties and Consumer Guarantees</h2>
            <ol className="list-decimal pl-6 space-y-2" start="3">
              <li><strong>Exclusion of Consumer Guarantees:</strong> Buyers acknowledge that consumer guarantees under sections 54, 55, 56, 57, 58, and 59 of the Australian Consumer Law do not apply to goods sold through this third party sale listing website. As a result, the Company and Seller provide no warranties or guarantees regarding:
                <ul className="list-disc pl-6 space-y-1">
                  <li>The Product being of acceptable quality.</li>
                  <li>The Product being suitable for any disclosed or implied purpose.</li>
                  <li>The Product matching its description or any sample/demonstration model.</li>
                  <li>The availability of repairs or spare parts for the Product.</li>
                  <li>Compliance with any express warranties made by the manufacturer.</li>
                </ul>
              </li>
              <li><strong>Applicable Guarantees:</strong> If the Product falls under one of the following categories:
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>PDH Goods:</strong> Goods typically acquired for personal, domestic, or household use; or</li>
                  <li><strong>Non-PDH Goods:</strong> Products with a purchase price of $100,000 or less (or any other amount specified in section 3 of the Australian Consumer Law), certain guarantees may apply, including:
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Guarantees of the Buyer receiving title to the Product.</li>
                      <li>Guarantees of the Buyer having undisturbed possession of the Product.</li>
                      <li>Guarantees ensuring the Product is free from undisclosed Encumbrances.</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><strong>Consumer Protections:</strong> Nothing in this section—or any other clause within these Terms and Conditions—seeks to exclude, limit, or modify the application of relevant provisions under the Australian Consumer Law, the liability of the Company or Seller for non-compliance, or the rights of consumers to make claims under these guarantees or other applicable provisions of the Australian Consumer Law.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
            <p><strong>You indemnify us:</strong> You indemnify us against all losses, costs (including legal costs), expenses, demands or liability that we incur arising out of, or in connection with, a third-party claim against us arising from your use of our services or any third-party product, except for losses arising from:</p>
            <ol className="list-decimal pl-6 space-y-2" start="6">
              <li>A breach of these terms by the company, its employees, contractors or agents, or</li>
              <li>Any gross negligence, wilful misconduct, fraud or material error that was solely the responsibility of the company, its employees, contractors or agents.</li>
            </ol>
            <p>For this indemnity, the company will take reasonable mitigation measures where possible.</p>

            <p className="mt-4">Where the Buyer incurs Loss resulting from the purchase of a Product:</p>
            <ol className="list-decimal pl-6 space-y-2" start="8">
              <li>If the Product consists of Non-PDH Goods priced above $100,000; or</li>
              <li>If the Loss occurs independently of a breach by the Seller, Website, or Company concerning consumer guarantees or provisions under the Australian Consumer Law,</li>
            </ol>
            <p>then, subject to applicable laws that cannot be excluded or limited, the Seller, Website, and Company are not liable for such Loss. This applies even if the Seller, Website, or Company were aware or should have been aware that the Loss might occur.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Finance</h2>
            <p>Before making an offer or negotiating the private purchase of a Product, the Buyer warrants they:</p>
            <ol className="list-decimal pl-6 space-y-2" start="10">
              <li>Have sufficient cash resources immediately available to complete the purchase; or</li>
              <li>Have secured financial assistance on terms acceptable to the Company.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Default</h2>
            <ol className="list-decimal pl-6 space-y-2" start="12">
              <li>If the Buyer defaults on any obligations under these Terms and Conditions or any related agreements with the Website, Company, or Seller, the Company and/or Seller may:
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Cancel and rescind the sale.</li>
                  <li>Forfeit any payments made by the Buyer.</li>
                  <li>Resell the Product(s) under new terms and recover all losses, costs, and expenses incurred from the Buyer, including any excess over the original Purchase Price, lost commissions, advertising expenses, and legal costs.</li>
                  <li>Recover damages from the Buyer on an indemnity basis.</li>
                </ol>
              </li>
              <li>If the Seller fails to deliver a Product or part thereof, the Seller must refund any payments made by the Buyer through the Website.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">General Law</h2>
            <ol className="list-decimal pl-6 space-y-2" start="14">
              <li>The governing law for interpreting and enforcing these Terms and Conditions is the law of the State where the Sale occurred.</li>
              <li>Parties irrevocably submit to the non-exclusive jurisdiction of courts in that State and appellate courts with competent authority.</li>
              <li>All rights and remedies available to parties under general law are subject to these conditions.</li>
              <li>If any Terms and Conditions are deemed invalid or unenforceable by a court, they are severed, and the remaining provisions remain valid and enforceable.</li>
              <li>Delays or failures to exercise rights, powers, or remedies do not constitute a waiver. A single or partial exercise does not prevent further exercises of the same or other rights.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Further Special Conditions</h2>
            <p>The Website or Company may announce additional special conditions for Sale, Product or specific item during or before the sale. These conditions become part of the Terms and Conditions.</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Goods and Services Tax (GST)</h2>
            <ol className="list-decimal pl-6 space-y-2" start="19">
              <li><strong>GST Inclusion or Exclusion:</strong> The Seller will decide whether the Purchase Price of the goods is inclusive or exclusive of GST. If GST applies, it will be added to all relevant charges and fees.</li>
              <li><strong>Buyer's Obligation:</strong> If any portion of the Purchase Price qualifies as consideration for a taxable supply, the Buyer must pay the applicable GST amount to the Seller via the Website or Company. The Website will provide the Buyer with a tax invoice (if applicable) at the time of purchase.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Products for Sale</h2>
            <p>The Buyer acknowledges that:</p>
            <ol className="list-decimal pl-6 space-y-2" start="21">
              <li>The Website or Company does not conduct detailed inspections of the Products for sale. Buyers may arrange inspections and queries directly with the Seller.</li>
              <li>Information about each Product is provided by the Seller and is not verified or guaranteed by the Website or Company.</li>
              <li>It is the Buyer's responsibility to assess the condition, description, and state of the Product before purchase.</li>
              <li>Product categories listed on the Website should not be solely relied upon to determine their intended use.</li>
              <li>If disputes arise regarding Product information, the Buyer agrees to indemnify the Website and Company against such disputes, including covering any related costs on a full indemnity basis.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Cancellation</h2>
            <ol className="list-decimal pl-6 space-y-2" start="26">
              <li>The Website or Company, acting on behalf of the Seller, reserves the right to cancel any Sale or withdraw any Product from sale at its discretion, regardless of other clauses within these Terms and Conditions.</li>
              <li>In case of disputes related to cancellations, the Buyer agrees to indemnify the Website, Company, and Seller, including covering any related costs on a full indemnity basis.</li>
              <li>If you wish to change or cancel your course enrolment, you must notify us in writing at least 30 days before the course start date. Any change is subject to the course provider's policy and availability.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Force Majeure</h2>
            <p>
              If performance of obligations under this agreement is delayed, hindered, or
              prevented due to unforeseen events beyond the control of the parties (e.g., natural
              disasters, pandemics, governmental actions, strikes, or system failures), neither
              party shall be held liable for non-performance during the affected period. Parties
              must notify each other promptly, or as soon as practical, when such circumstances
              arise and take reasonable steps to mitigate any adverse effects.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Confidentiality</h2>
            <p>
              The parties agree to keep all information shared during the course of this agreement
              confidential, including trade secrets, pricing details, and user data. This information
              cannot be disclosed to third parties or used for purposes outside the scope of this
              contract unless explicitly authorized in writing. Breaching confidentiality may result in
              penalties, including termination of the agreement and liability for damages.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Intellectual Property Rights</h2>
            <p>
              All intellectual property contained in the Website or associated with the sale of
              Products (e.g., trademarks, copyrights, designs) remains the property of the
              respective owner unless explicitly transferred in writing. Buyers and Sellers agree not
              to use intellectual property for any unauthorized purpose or infringe upon rights
              protected by applicable laws.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Dispute Resolution</h2>
            <p>
              In the event of a dispute, parties must first attempt to resolve the issue through
              mediation facilitated by a neutral third party. If mediation is unsuccessful, the dispute
              shall be resolved through binding arbitration under applicable rules. Parties agree to
              share mediation/arbitration costs equally, and court proceedings shall be avoided
              whenever possible. The mediation shall be in Melbourne, Australia through the
              Dispute Settlement Centre of Victoria, or the Victorian Bar Mediation Centre.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Termination Rights</h2>
            <p>Either party may terminate this agreement under the following circumstances:</p>
            <ol className="list-decimal pl-6 space-y-2" start="29">
              <li>Breach of a material term by the other party.</li>
              <li>Fraudulent or illegal activity by the other party.</li>
              <li>Force majeure events lasting beyond 90 days. Termination must be communicated in writing, specifying reasons and effective dates. Rights and obligations accrued before termination remain enforceable.</li>
            </ol>

            <h2 className="text-xl font-semibold mt-6 mb-3">Indemnity for Third-Party Claims</h2>
            <p>
              Each party agrees to indemnify and hold harmless the other against any claims,
              liabilities, or damages brought by third parties related to this agreement. This
              includes indemnity for legal costs, settlements, or judgments arising from misuse or
              negligence.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Non-Compete Clause</h2>
            <p>
              Sellers and Buyers agree not to engage in activities that compete directly with The
              Website or The Company for 12 months following the completion of their
              transactions. This includes soliciting users of the Website or poaching Website or
              Company staff.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Data Protection</h2>
            <p>
              All personal data collected during transactions will be handled in compliance with
              applicable privacy laws. The website agrees to take all reasonable measures to
              secure user information, including encryption, access controls, and data retention
              policies. Breaches must be disclosed promptly, and affected users will be notified.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Audit Rights</h2>
            <p>
              The company reserves the right to audit Buyer or Seller activities to ensure
              compliance with this agreement. Audits may include reviewing transaction histories,
              inspecting documents, or accessing relevant systems. Parties must cooperate fully,
              and audits shall be conducted with reasonable notice.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
            <p>
              Liability for any damages or claims arising under this agreement shall be capped at a
              specified maximum amount that is the total Purchase Price of a Product. The parties
              agree that this limitation excludes liability for fraud, intentional misconduct, or
              breaches of confidentiality.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Legal Disclaimer</h2>
            <p>
              Pendo Academy is an education and training platform. We provide general information, job-ready access to programs, and resources to assist individuals in getting into the workforce. While our content may reference legal, financial, or training programs, it is provided for educational purposes only and does not constitute financial, legal, tax, or business advice.
            </p>
            <p>
              We do not hold a Registered Training Organisation (RTO) or Australian Financial Services Licence (AFSL) and do not provide personalised financial advice. All information is general in nature and should not be relied upon without obtaining independent professional advice.
            </p>
            <p>
              Training outcomes vary and are subject to numerous factors, including the nature of your study, financial obligations to the RTO partners, RTO terms, and your personal circumstances. While we teach strategies aimed at reducing entry barriers into the workforce, challenges to completion of the programs are uncommon and personal success is not guaranteed.
            </p>
            <p>
              Past performance is not indicative of future results. We do not guarantee any particular outcome. Always seek advice from a qualified education agent, accountant, solicitor, or financial advisor before proceeding with any training courses.
            </p>
            <p>
              This website is subject to the laws of Australia, and any disputes arising from its use
              will be exclusively adjudicated by Australian courts.
            </p>

            <p className="mt-6">
              Pendo Academy's website is owned and operated by Pendo Health Pty Ltd, with an
              Australian Business Number (ABN) of 17 639 720 433. Pendo Health Pty Ltd is a
              registered entity in Australia, and its ABN is 17 639 720 433.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
