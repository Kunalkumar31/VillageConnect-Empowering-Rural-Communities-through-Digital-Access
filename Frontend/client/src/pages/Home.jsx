import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  MessageCircle,
  Users,
  Phone,
  Mail,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import villageImage from "../assets/images.jpg";

export default function Home() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/signup"); //  Go to services if logged in  
    } else {
      navigate("/services");//  Otherwise go to signup
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>VillageConnect | Empowering Rural India</title>
        <meta
          name="description"
          content="VillageConnect is a digital platform empowering rural communities with access to government schemes, forums, and real-time support."
        />
      </Helmet>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white py-20 px-6"
        style={{ backgroundImage: `url(${villageImage})` }}
        role="banner"
        aria-label="Village landscape with welcome message"
      >
        <div className="bg-black bg-opacity-60 p-10 rounded-xl max-w-4xl mx-auto animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to VillageConnect
          </h2>
          <p className="text-lg">
            Empowering rural communities with access to services, forums, and
            real-time support.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-6 inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition cursor-pointer"
          >
            Get Started
          </button>

        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6 cursor-pointer">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">
          What We Offer
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <Users
              className="mx-auto text-blue-600"
              size={40}
              aria-hidden="true"
            />
            <h4 className="text-xl font-semibold mt-4 ">Community Forums</h4>
            <p className="text-gray-600 mt-2">
              Connect with fellow villagers, ask questions, and get local
              support.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <Sparkles
              className="mx-auto text-yellow-500"
              size={40}
              aria-hidden="true"
            />
            <h4 className="text-xl font-semibold mt-4">Government Services</h4>
            <p className="text-gray-600 mt-2">
              Browse and apply for schemes, health aid, farming tools, and more.
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
            <MessageCircle
              className="mx-auto text-green-600"
              size={40}
              aria-hidden="true"
            />
            <h4 className="text-xl font-semibold mt-4">Live Chat Support</h4>
            <p className="text-gray-600 mt-2">
              Instantly connect with volunteers and experts for help and
              guidance.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 px-6 border-t">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-10">
          How It Works
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-blue-600 font-bold text-5xl mb-2">1</div>
            <h4 className="text-xl font-semibold">Sign Up</h4>
            <p className="text-gray-600 mt-2">
              Register as a villager, volunteer, or official to get started.
            </p>
          </div>
          <div>
            <div className="text-yellow-500 font-bold text-5xl mb-2">2</div>
            <h4 className="text-xl font-semibold">Explore Services</h4>
            <p className="text-gray-600 mt-2">
              Browse government schemes, tools, and helpful information.
            </p>
          </div>
          <div>
            <div className="text-green-600 font-bold text-5xl mb-2">3</div>
            <h4 className="text-xl font-semibold">Get Support</h4>
            <p className="text-gray-600 mt-2">
              Use the chat or forum to connect with experts and neighbors.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-blue-800 mb-10">
          Voices from Our Villages
        </h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="italic text-gray-700">
              “Thanks to VillageConnect, I was able to apply for a farming loan
              and learn about subsidies I never knew existed.”
            </p>
            <p className="mt-4 font-semibold text-blue-700">– Ramesh, Bihar</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="italic text-gray-700">
              “The real-time chat helped me fix a health scheme issue within
              hours. Truly a lifeline for rural families.”
            </p>
            <p className="mt-4 font-semibold text-blue-700">– Sita, Jharkhand</p>
          </div>
        </div>
      </section>

      {/* Partners Section (optional) */}
      {/* <section className="bg-white py-10 px-6 border-t">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
          In Partnership With
        </h3>
        <div className="flex justify-center gap-10 flex-wrap">
          <img src={logo2} alt="Gov of India" className="h-12" />
          <img src={logo1} alt="UNICEF" className="h-12" />
          <img src="/logos/ngo.svg" alt="Rural NGO" className="h-12" />
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="bg-blue-100 py-16 px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">
          Join the Movement Towards Digital Rural Empowerment
        </h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          Our goal is to ensure every village can access information, collaborate
          with others, and seek assistance—all from one trusted platform.
        </p>
        <Link
          to="/about"
          className="mt-6 inline-block bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Learn More About Us
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-2">VillageConnect</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bridging rural communities with essential services and digital
              empowerment.
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
                <Link to="/privacy" className="hover:text-yellow-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-yellow-400 transition">
                  Terms & Conditions
                </Link>
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
