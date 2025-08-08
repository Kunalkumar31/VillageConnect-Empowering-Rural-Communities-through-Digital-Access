import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 max-w-6xl mx-auto flex-grow">
        <h1 className="text-4xl font-bold text-green-700 mb-4 text-center">
          About VillageConnect
        </h1>

        <p className="text-lg text-gray-700 mb-10 text-center">
          <strong>VillageConnect</strong> is a digital platform designed to empower rural communities by bridging the gap between technology and essential services.
          We aim to connect villagers with verified schemes, local services, forums, and real-time communication.
        </p>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center bg-green-100 rounded-lg p-6 mb-10 shadow-md">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2884/2884850.png"
            alt="mission"
            className="w-28 h-28 mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">🌱 Our Mission</h2>
            <p className="text-gray-700">
              To foster inclusive growth by connecting villages with modern tools and community support systems.
              We believe digital access should be simple, useful, and built for the grassroots.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <h2 className="text-2xl font-semibold text-green-800 mb-4">🚀 Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-10 cursor-pointer">
          {[
            {
              title: "Service Access",
              desc: "Discover local welfare schemes and apply with ease.",
              img: "https://cdn-icons-png.flaticon.com/512/10768/10768258.png",
            },
            {
              title: "Forum System",
              desc: "Engage in village discussions and raise issues.",
              img: "https://cdn-icons-png.flaticon.com/512/4576/4576041.png",
            },
            {
              title: "Real-Time Chat",
              desc: "Connect instantly with service providers and villagers.",
              img: "https://cdn-icons-png.flaticon.com/512/4701/4701482.png",
            },
            {
              title: "Role-Based Access",
              desc: "Different dashboards for Users, Admins, and Providers.",
              img: "https://cdn-icons-png.flaticon.com/512/1254/1254721.png",
            },
            {
              title: "Mobile Friendly",
              desc: "Works seamlessly across all screen sizes using Tailwind CSS.",
              img: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
            },
            {
              title: "Open Source",
              desc: "Built for collaboration, improvement, and transparency.",
              img: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-xl transition">
              <img src={feature.img} alt={feature.title} className="w-16 h-16 mx-auto mb-3" />
              <h3 className="font-bold text-lg text-green-700">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Community Card */}
        <div className="flex flex-col md:flex-row items-center bg-green-50 p-6 rounded-lg mb-10 shadow-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3601/3601271.png"
            alt="Community"
            className="w-24 h-24 mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-2xl font-semibold text-green-800 mb-2">🤝 Built For The Community</h2>
            <p className="text-gray-700">
              From farmers seeking subsidies to youth exploring opportunities — our platform is for everyone.
              We believe in making digital access meaningful and inclusive.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold mb-2">Want to contribute or suggest features?</h3>
          <p className="text-gray-600">Join our open-source journey and help build tools for tomorrow’s villages.</p>

          <a href="mailto:help@villageconnect.in?subject=Contribution Inquiry">
            <button className="mt-4 px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 cursor-pointer">
              Get Involved
            </button>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-2">VillageConnect</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bridging rural communities with essential services and digital empowerment.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Contact Us</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-yellow-400" /> +91 8210948537
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-yellow-400" /> help@villageconnect.in
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-yellow-400 transition">Services</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © 2025 VillageConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
