import React from "react";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-cream py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl font-serif font-bold text-deepNavy mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none text-charcoal">
          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-deepNavy mb-4">
              Agreement to Terms
            </h2>
            <p>
              By accessing or using NATA Prep's website and services, you agree
              to be bound by these Terms of Service. If you disagree with any
              part of these terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-deepNavy mb-4">
              User Accounts
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                You are responsible for maintaining the confidentiality of your
                account
              </li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activities under your account</li>
              <li>
                You must notify us of any unauthorized use of your account
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-deepNavy mb-4">
              Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, and
              software, is the property of NATA Prep and is protected by
              intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-deepNavy mb-4">
              User Content
            </h2>
            <p>
              By posting content on our platform, you grant us the right to use,
              modify, and distribute that content on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-deepNavy mb-4">
              Limitation of Liability
            </h2>
            <p>
              NATA Prep shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-deepNavy mb-4">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes to these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-deepNavy mb-4">
              Contact Information
            </h2>
            <p>
              For any questions about these Terms of Service, please contact us
              at:
              <br />
              Email: legal@nataprep.com
              <br />
              Phone: +91 123 456 7890
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
