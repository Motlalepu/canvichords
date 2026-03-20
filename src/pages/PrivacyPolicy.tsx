import React from "react";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "December 5, 2025";

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main id="main" className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              At CANVICHORDS Gallery ("we," "us," "our," or "Company"), we are
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website, mobile application, and related services
              (collectively, the "Platform").
            </p>
            <p className="text-base leading-relaxed text-foreground/90">
              Please read this privacy policy carefully. If you do not agree
              with our policies and practices, please do not use our Platform.
              By accessing and using CANVICHORDS, you acknowledge that you have
              read, understood, and agree to be bound by all the terms of this
              Privacy Policy.
            </p>
          </section>

          {/* Section 1: Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              1. Information We Collect
            </h2>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Information You Provide Directly
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              We collect information you voluntarily provide, including:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                <strong>Account Information:</strong> Email address, password,
                name, profile photo, biography, and user type (Artist or
                Collector)
              </li>
              <li>
                <strong>Artwork Information:</strong> Title, description,
                images, videos, audio files, pricing, and category when you
                upload or submit artwork
              </li>
              <li>
                <strong>Contact Information:</strong> When you contact us
                through contact forms, feedback forms, or email
              </li>
              <li>
                <strong>Payment Information:</strong> Processing through
                third-party payment processors (we do not directly store credit
                card data)
              </li>
              <li>
                <strong>Communication Preferences:</strong> Your choices
                regarding notifications and newsletters
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Information Collected Automatically
            </h3>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              When you access our Platform, we automatically collect:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                <strong>Log Data:</strong> IP address, browser type, pages
                visited, time and date of access, and referring URLs
              </li>
              <li>
                <strong>Device Information:</strong> Device model, operating
                system, and unique identifiers
              </li>
              <li>
                <strong>Usage Data:</strong> How you interact with the Platform,
                features used, searches performed, and content viewed
              </li>
              <li>
                <strong>Cookies and Similar Technologies:</strong> Persistent
                and session identifiers, analytics cookies, and marketing
                cookies
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 text-foreground">
              Information from Third Parties
            </h3>
            <p className="text-base leading-relaxed text-foreground/90">
              We may receive information about you from: social media platforms
              if you connect your accounts, payment processors for transaction
              verification, and service providers assisting with operations.
            </p>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              2. How We Use Your Information
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Provide, maintain, and improve our Platform and services</li>
              <li>
                Process transactions and send transaction confirmations and
                receipts
              </li>
              <li>
                Authenticate your identity and prevent fraud or unauthorized
                access
              </li>
              <li>
                Communicate with you regarding your account, updates, or service
                changes
              </li>
              <li>
                Send promotional materials, newsletters, and marketing
                communications (with your consent)
              </li>
              <li>
                Analyze usage patterns to enhance user experience and Platform
                features
              </li>
              <li>
                Comply with legal obligations and enforce our Terms of Service
              </li>
              <li>Respond to inquiries and provide customer support</li>
              <li>
                Personalize your experience and show relevant content and
                recommendations
              </li>
            </ul>
          </section>

          {/* Section 3: How We Share Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              3. How We Share Your Information
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. However, we may share information with:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who
                assist with payments, hosting, analytics, and customer support
              </li>
              <li>
                <strong>Other Users:</strong> Public profile information,
                artwork listings, and related data (as intended by the Platform)
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law,
                regulation, or government request
              </li>
              <li>
                <strong>Business Transfers:</strong> In case of merger,
                acquisition, or asset sale
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly
                authorize us to share information
              </li>
            </ul>
          </section>

          {/* Section 4: Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              4. Data Security
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              We implement industry-standard security measures to protect your
              information, including:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>SSL/TLS encryption for data in transit</li>
              <li>Secure password hashing and storage</li>
              <li>Access controls and authentication protocols</li>
              <li>Regular security audits and updates</li>
              <li>Restricted employee access to personal data</li>
            </ul>
            <p className="text-base leading-relaxed text-foreground/90 text-yellow-700 bg-yellow-50 p-4 rounded">
              <strong>Note:</strong> No transmission over the internet is 100%
              secure. While we strive to protect your information, we cannot
              guarantee absolute security.
            </p>
          </section>

          {/* Section 5: Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              5. Your Privacy Rights
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                <strong>Access:</strong> Request access to the personal data we
                hold about you
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your data
                (subject to legal obligations)
              </li>
              <li>
                <strong>Data Portability:</strong> Request your data in a
                portable format
              </li>
              <li>
                <strong>Opt-Out:</strong> Opt out of marketing communications at
                any time
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw consent for
                processing your data
              </li>
            </ul>
            <p className="text-base leading-relaxed text-foreground/90">
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:sejosengoemotalepula@gmail.com"
                className="text-primary underline hover:no-underline"
              >
                sejosengoemotalepula@gmail.com
              </a>
              .
            </p>
          </section>

          {/* Section 6: Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>Maintain user sessions and remember preferences</li>
              <li>Analyze usage patterns and improve user experience</li>
              <li>Deliver personalized content and advertisements</li>
              <li>Track marketing campaign effectiveness</li>
            </ul>
            <p className="text-base leading-relaxed text-foreground/90">
              You can manage cookie preferences through your browser settings.
              Note that disabling cookies may affect functionality.
            </p>
          </section>

          {/* Section 7: Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              7. Third-Party Services
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              Our Platform integrates with third-party services including:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 text-foreground/90">
              <li>
                <strong>Supabase:</strong> Backend database and authentication
              </li>
              <li>
                <strong>Payment Processors:</strong> For secure payment
                processing
              </li>
              <li>
                <strong>Analytics:</strong> Google Analytics for usage insights
              </li>
              <li>
                <strong>Google AdSense:</strong> For serving advertisements
              </li>
            </ul>
            <p className="text-base leading-relaxed text-foreground/90">
              These services have their own privacy policies. We encourage you
              to review them.
            </p>
          </section>

          {/* Section 8: Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              8. Data Retention
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              We retain your personal information for as long as necessary to
              provide services, comply with legal obligations, and resolve
              disputes. After account deletion, we retain transaction records
              and comply with applicable data retention laws. Marketing data is
              retained until you unsubscribe.
            </p>
          </section>

          {/* Section 9: Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              9. Children's Privacy
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              CANVICHORDS is not intended for users under 13 years old. We do
              not knowingly collect personal information from children under 13.
              If we discover such information, we will delete it promptly. If
              you believe we have collected information from a child under 13,
              please contact us immediately at{" "}
              <a
                href="mailto:sejosengoemotalepula@gmail.com"
                className="text-primary underline hover:no-underline"
              >
                sejosengoemotalepula@gmail.com
              </a>
              .
            </p>
          </section>

          {/* Section 10: Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-base leading-relaxed text-foreground/90">
              We may update this Privacy Policy periodically. We will notify you
              of significant changes by posting the updated policy on our
              Platform with an updated "Last Updated" date. Your continued use
              of the Platform constitutes acceptance of the updated Privacy
              Policy.
            </p>
          </section>

          {/* Section 11: Contact Us */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              11. Contact Us
            </h2>
            <p className="text-base leading-relaxed text-foreground/90 mb-4">
              For questions or concerns about this Privacy Policy or our privacy
              practices, please contact us:
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
                to="/terms"
                className="text-primary underline hover:no-underline"
              >
                Terms of Service
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

export default PrivacyPolicy;
