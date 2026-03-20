import React from "react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const lastUpdated = "December 5, 2025";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main id="main" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              Welcome to CANVICHORDS Gallery ("Company," "we," "us," "our," or
              "Platform"). These Terms of Service (this "Agreement") govern your
              access to and use of our website, mobile application, and all
              related services (collectively, the "Platform").
            </p>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              By accessing, browsing, or using CANVICHORDS, you acknowledge that
              you have read, understood, and agree to be bound by all terms and
              conditions in this Agreement. If you do not agree to these terms,
              please do not use our Platform.
            </p>
            <p className="text-base leading-relaxed text-foreground/90">
              We reserve the right to modify these terms at any time. Changes
              become effective immediately upon posting. Your continued use
              constitutes acceptance of modified terms.
            </p>
          </section>

          {/* Section 1: User Accounts */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. User Accounts and Registration
            </h2>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Account Creation
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              To access certain features, you must create an account by
              providing accurate, complete information. You are responsible for:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Maintaining the confidentiality of your password</li>
              <li>All activities and content posted under your account</li>
              <li>Notifying us immediately of unauthorized access</li>
              <li>Providing accurate information and keeping it updated</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Account Termination
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              You may terminate your account at any time by contacting us. We
              may terminate or suspend your account for violating these terms,
              engaging in illegal activity, or threatening platform integrity.
              Upon termination:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Your access to the Platform is immediately revoked</li>
              <li>
                Your account data may be deleted after a 30-day grace period
              </li>
              <li>
                Published content may remain visible unless you request removal
              </li>
              <li>No refunds are issued for unused services or credits</li>
            </ul>
          </section>

          {/* Section 2: Artist Rights and Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. Artist Rights and Responsibilities
            </h2>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Intellectual Property Rights
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              Artists retain full intellectual property rights to all artwork
              submitted. By uploading artwork, you:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                Warrant that you own or have permission to use all content
                submitted
              </li>
              <li>
                Grant CANVICHORDS a non-exclusive license to display your work
              </li>
              <li>
                Remain responsible for enforcing copyright and protecting your
                work
              </li>
              <li>
                Understand that purchase agreements are between you and buyers
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Content Guidelines for Artists
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              Artists agree not to upload content that:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Violates intellectual property rights of others</li>
              <li>Contains explicit, illegal, or harmful material</li>
              <li>Includes hate speech, discrimination, or harassment</li>
              <li>Is misleading, false, or fraudulent</li>
              <li>Violates any applicable laws or regulations</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Artist Earnings and Payments
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              CANVICHORDS facilitates connections between artists and
              collectors. Artists are responsible for:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Setting accurate pricing for their work</li>
              <li>Paying applicable taxes on income earned</li>
              <li>Maintaining accurate payment information</li>
              <li>
                Understanding and accepting transaction fees (displayed before
                completion)
              </li>
            </ul>
            <p className="text-base leading-relaxed text-foreground/90">
              Earnings are paid through our payment processor. We are not
              responsible for delays or errors by third-party payment providers.
            </p>
          </section>

          {/* Section 3: Collector Rights and Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. Collector Rights and Responsibilities
            </h2>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Purchasing Artwork
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              When purchasing artwork through CANVICHORDS:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>You acknowledge the artwork description and pricing</li>
              <li>
                Transactions are between you and the artist; we facilitate only
              </li>
              <li>
                Digital artwork purchases are non-refundable unless otherwise
                agreed
              </li>
              <li>
                Ownership transfers as defined by the artist and purchase terms
              </li>
              <li>
                You agree to comply with all applicable laws regarding purchases
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Collector Code of Conduct
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              Collectors agree to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Respect artists' intellectual property rights</li>
              <li>Not reproduce, distribute, or sell purchased digital work</li>
              <li>Use the platform for legitimate, lawful purposes only</li>
              <li>
                Treat artists and other collectors with respect and dignity
              </li>
              <li>Report any fraudulent activity or policy violations</li>
            </ul>
          </section>

          {/* Section 4: Platform Conduct */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Prohibited Activities
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Violate any laws, regulations, or rights of third parties</li>
              <li>Upload content that is defamatory, obscene, or harassing</li>
              <li>
                Engage in harassment, bullying, discrimination, or hate speech
              </li>
              <li>
                Attempt to gain unauthorized access to systems or accounts
              </li>
              <li>
                Collect or transmit personally identifiable information without
                consent
              </li>
              <li>Engage in spam, phishing, or fraudulent activity</li>
              <li>Disrupt the platform's functionality or services</li>
              <li>
                Bypass security measures or use automated tools excessively
              </li>
              <li>Resell or redistribute platform access</li>
            </ul>
          </section>

          {/* Section 5: Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              5. Dispute Resolution and Grievances
            </h2>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Buyer-Seller Disputes
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              CANVICHORDS is a marketplace platform. Disputes between buyers and
              sellers are primarily between the parties involved. We encourage:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Direct communication between parties to resolve issues</li>
              <li>Good-faith negotiation before escalating to our team</li>
              <li>Documentation of all communications related to disputes</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Platform Disputes
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              For disputes with CANVICHORDS regarding terms, services, or
              account issues:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                Contact us at{" "}
                <a
                  href="mailto:sejosengoemotalepula@gmail.com"
                  className="text-primary underline"
                >
                  sejosengoemotalepula@gmail.com
                </a>{" "}
                with detailed information
              </li>
              <li>Allow 7-10 business days for response</li>
              <li>Disputes must be filed within 30 days of the incident</li>
              <li>We will attempt to resolve disputes in good faith</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Binding Arbitration
            </h3>
            <p className="text-base leading-relaxed text-foreground/90">
              Any unresolved disputes shall be settled by binding arbitration in
              accordance with applicable laws, except for injunctive relief or
              intellectual property disputes, which may be brought in court.
            </p>
          </section>

          {/* Section 6: Limitations of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              6. Limitation of Liability and Disclaimers
            </h2>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              "AS IS" Provision
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              The Platform and all content are provided "AS IS" without
              warranties of any kind, express or implied. We disclaim all
              warranties including merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              No Liability for Third-Party Content
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              We do not warrant or assume responsibility for:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                Accuracy, quality, or authenticity of user-submitted content
              </li>
              <li>Correctness of artwork descriptions or pricing</li>
              <li>Delivery of physical artwork or digital files</li>
              <li>Satisfaction with purchases or sales</li>
              <li>Third-party services or payment processors</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Limitation of Damages
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              To the maximum extent permitted by law, CANVICHORDS shall not be
              liable for:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Lost profits, revenue, or business opportunities</li>
              <li>Damages arising from service interruptions or data loss</li>
              <li>
                Total liability shall not exceed the amount paid by you in the
                12 months prior to the claim
              </li>
            </ul>
          </section>

          {/* Section 7: Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              7. Indemnification
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              You agree to indemnify and hold harmless CANVICHORDS, its owners,
              officers, employees, and agents from any claims, damages, or costs
              (including attorney fees) arising from: (a) your violation of
              these terms, (b) your use of the Platform, (c) content you submit,
              or (d) your infringement of third-party rights.
            </p>
          </section>

          {/* Section 8: Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              8. Intellectual Property Rights
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              CANVICHORDS owns all intellectual property rights to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>The Platform and its design, code, and interface</li>
              <li>Our logos, trademarks, and brand materials</li>
              <li>All aggregated data and analytics</li>
            </ul>
            <p className="text-base leading-relaxed text-foreground/90">
              Artists retain rights to their submitted work. Collectors
              purchasing digital artwork receive usage rights as specified in
              the purchase terms, not ownership of the original creative work.
            </p>
          </section>

          {/* Section 9: Moderation and Removal */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              9. Content Moderation and Removal
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              We reserve the right to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Remove content violating these terms or applicable laws</li>
              <li>
                Suspend or terminate accounts engaged in prohibited activities
              </li>
              <li>Refuse service to anyone at our sole discretion</li>
              <li>Enforce these terms and maintain platform integrity</li>
            </ul>
            <p className="text-base leading-relaxed text-foreground/90">
              We do not guarantee that all violations will be discovered or
              addressed immediately. Users may report violations through our
              contact form or email.
            </p>
          </section>

          {/* Section 10: Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              10. Governing Law and Jurisdiction
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              These terms are governed by and construed in accordance with
              applicable laws. Any legal action or proceeding arising from this
              Agreement shall be resolved through binding arbitration or, if
              arbitration is not available, in the courts of competent
              jurisdiction.
            </p>
          </section>

          {/* Section 11: Severability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              11. Severability and Waiver
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              If any provision of these terms is found invalid or unenforceable,
              the remaining provisions continue in full force. No waiver of any
              provision shall be deemed a waiver of any other provision.
            </p>
          </section>

          {/* Section 12: Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              12. Contact Information
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              For questions or concerns regarding these Terms of Service:
            </p>
            <div className="bg-muted p-6 rounded">
              <p className="text-base text-foreground mb-2">
                <strong>CANVICHORDS Gallery</strong>
              </p>
              <p className="text-base text-foreground mb-2">
                Email:{" "}
                <a
                  href="mailto:sejosengoemotalepula@gmail.com"
                  className="text-primary underline hover:no-underline"
                >
                  sejosengoemotalepula@gmail.com
                </a>
              </p>
              <p className="text-base text-foreground">
                Response time: Within 7 business days
              </p>
            </div>
          </section>

          {/* Links to Related Pages */}
          <div className="border-t pt-8 mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Related policies and information:
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/privacy"
                className="text-primary underline hover:no-underline"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="text-primary underline hover:no-underline"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="text-primary underline hover:no-underline"
              >
                About CANVICHORDS
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;
