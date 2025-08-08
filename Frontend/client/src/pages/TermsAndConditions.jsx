import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ShieldCheck,
  Settings,
  FileText,
  Ban,
  Scale,
  Mail
} from 'lucide-react';

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | VillageConnect";
  }, []);

  const sections = [
    {
      icon: <BookOpen className="text-blue-600" />,
      title: "1. Use of the Platform",
      text:
        "You agree to use the platform only for lawful purposes and in a way that does not infringe the rights of others.",
    },
    {
      icon: <ShieldCheck className="text-blue-600" />,
      title: "2. Account Responsibility",
      text:
        "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.",
    },
    {
      icon: <Settings className="text-blue-600" />,
      title: "3. Service Changes",
      text:
        "We reserve the right to modify or discontinue any part of the service with or without notice at any time.",
    },
    {
      icon: <FileText className="text-blue-600" />,
      title: "4. Content Ownership",
      text:
        "All content on the site, including text, graphics, logos, and software, is the property of VillageConnect or its content suppliers and is protected by applicable copyright laws.",
    },
    {
      icon: <Ban className="text-blue-600" />,
      title: "5. Termination",
      text:
        "We may suspend or terminate your access to the platform if you violate any of these Terms and Conditions.",
    },
    {
      icon: <Scale className="text-blue-600" />,
      title: "6. Governing Law",
      text:
        "These Terms & Conditions are governed by and construed in accordance with the laws of India. You agree to submit to the exclusive jurisdiction of the courts located in India.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Hero Header */}
      <div className="bg-blue-700 text-white py-12 px-4 shadow-md text-center">
        <h1 className="text-4xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Please read these terms carefully before using VillageConnect.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 mt-10">
        {/* Intro */}
        <div className="bg-white shadow-sm border-l-4 border-blue-500 p-6 rounded mb-6">
          <p className="text-gray-700">
            By accessing or using VillageConnect, you agree to be bound by these Terms and Conditions. If you do not agree, you may not use the platform.
          </p>
        </div>

        {/* Section Cards */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white border-l-4 border-blue-500 p-6 rounded shadow-sm mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
            </div>
            <p className="text-gray-700">{section.text}</p>
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-white border-l-4 border-blue-500 p-6 rounded shadow-sm mt-8">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Contact Us
            </h2>
          </div>
          <p className="text-gray-700">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:help@villageconnect.in"
              className="text-blue-600 hover:underline"
            >
              help@villageconnect.in
            </a>.
          </p>
        </div>

        {/* Last Updated */}
        <p className="text-xs text-gray-500 text-center mt-8">
          Last updated: August 6, 2025
        </p>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
