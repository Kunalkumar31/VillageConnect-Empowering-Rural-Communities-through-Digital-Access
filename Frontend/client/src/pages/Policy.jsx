import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  Lock,
  Globe,
  Cookie,
  Mail,
  AlertCircle,
  Info,
  FileText,
  Users
} from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Helmet>
        <title>Privacy Policy | VillageConnect</title>
        <meta
          name="description"
          content="Learn how VillageConnect collects, uses, stores, and protects your personal data. Your privacy and data security is our top priority."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-12 px-4 shadow-md text-center">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Transparency and trust are at the core of our values. Learn how VillageConnect collects, uses, and protects your data.
        </p>
      </div>

      <div className="max-w-5xl mx-auto mt-10 px-4">
        {/* Section Template */}
        {[
          {
            icon: <User className="text-blue-600" />,
            title: '1. Information We Collect',
            items: [
              'Name, email address, and contact details',
              'Geographic location and IP address',
              'Service usage data and preferences',
              'Feedback, reviews, or support queries',
            ],
          },
          {
            icon: <ShieldCheck className="text-blue-600" />,
            title: '2. How We Use Your Information',
            items: [
              'Provide, maintain, and improve our services',
              'Respond to your inquiries or service requests',
              'Send important updates or notifications',
              'Analyze usage patterns and enhance user experience',
              'Comply with legal obligations',
            ],
          },
          {
            icon: <Lock className="text-blue-600" />,
            title: '3. Data Security',
            items: [
              'SSL/TLS encryption for data transmission',
              'Role-based access control',
              'Regular vulnerability assessments',
              'Secure database storage and hashed passwords',
            ],
          },
          {
            icon: <FileText className="text-blue-600" />,
            title: '4. Data Retention',
            text:
              'We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.',
          },
          {
            icon: <Cookie className="text-blue-600" />,
            title: '5. Cookies & Tracking',
            text:
              'Our website uses cookies and similar technologies to improve functionality and performance. You can manage cookie preferences in your browser settings.',
          },
          {
            icon: <Globe className="text-blue-600" />,
            title: '6. Third-Party Services',
            text:
              'We may share limited data with trusted third-party services for hosting, analytics, and support. These providers are bound by strict confidentiality and data protection agreements.',
          },
          {
            icon: <Users className="text-blue-600" />,
            title: '7. Your Rights',
            items: [
              'Access, update, or delete your personal information',
              'Withdraw consent at any time',
              'Request data portability or restriction of processing',
            ],
          },
          {
            icon: <Info className="text-blue-600" />,
            title: '8. Children’s Privacy',
            text:
              'Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children.',
          },
          {
            icon: <Globe className="text-blue-600" />,
            title: '9. International Data Transfers',
            text:
              'If you are accessing VillageConnect from outside India, your data may be transferred to and processed in India. We take steps to ensure your data is handled securely under applicable laws.',
          },
          {
            icon: <ShieldCheck className="text-blue-600" />,
            title: '10. Consent',
            text:
              'By using our website or services, you consent to the collection and use of your information as described in this policy.',
          },
          {
            icon: <AlertCircle className="text-blue-600" />,
            title: '11. Changes to This Policy',
            text:
              'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.',
          },
          {
            icon: <Mail className="text-blue-600" />,
            title: '12. Contact Us',
            text: (
              <>
                For questions or concerns, contact us at:{' '}
                <a href="mailto:help@villageconnect.in" className="text-blue-600 underline">
                  help@villageconnect.in
                </a>
              </>
            ),
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-600"
          >
            <div className="flex items-center gap-3 mb-3">
              <div>{section.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
            </div>
            {section.text && <p className="text-gray-700">{section.text}</p>}
            {section.items && (
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-10">
          Effective Date: August 6, 2025
        </p>
        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-block text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
