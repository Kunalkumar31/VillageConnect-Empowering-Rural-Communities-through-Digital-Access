import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
  MinusCircle,
  PackageSearch,
  Leaf,
  HeartHandshake,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import CreateService from "./CreateService";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const fetchServices = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/services")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load services.");
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  };

  const getIconForCategory = (category) => {
    switch (category) {
      case "Agriculture":
        return <Leaf className="text-green-500" size={20} />;
      case "Healthcare":
        return <HeartHandshake className="text-pink-500" size={20} />;
      default:
        return <PackageSearch className="text-gray-500" size={20} />;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>VillageConnect | Services</title>
        <meta
          name="description"
          content="Explore available government services, aid programs, agricultural tools, and more tailored for rural communities."
        />
      </Helmet>

      <div className="py-10 px-4 sm:px-6 bg-gray-50 flex-grow">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Explore Our Services
        </h2>
         <div className="max-w-5xl mx-auto text-center text-gray-700 mb-10 animate-fade-in-up">
  <p className="text-md sm:text-lg mb-8">
    VillageConnect brings essential services closer to rural communities. Explore agriculture, health, and digital tools that empower rural lives.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 cursor-pointer">
    {/* Agriculture */}
    <div className="group bg-white border border-green-100 p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-md animate-fade-in delay-100">
      <div className="text-4xl mb-3 group-hover:animate-bounce">🌾</div>
      <h4 className="font-semibold text-green-700 text-lg mb-2">Agricultural Help</h4>
      <p className="text-sm text-gray-600">
        Access tools, crop advisory, subsidies, and expert guidance for better yields.
      </p>
    </div>

    {/* Healthcare */}
    <div className="group bg-white border border-pink-100 p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-md animate-fade-in delay-200">
      <div className="text-4xl mb-3 group-hover:animate-bounce">🏥</div>
      <h4 className="font-semibold text-pink-700 text-lg mb-2">Health & Wellness</h4>
      <p className="text-sm text-gray-600">
        Discover clinics, health insurance, and mobile health camps near you.
      </p>
    </div>

    {/* Digital Services */}
    <div className="group bg-white border border-blue-100 p-6 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:shadow-md animate-fade-in delay-300">
      <div className="text-4xl mb-3 group-hover:animate-bounce">💻</div>
      <h4 className="font-semibold text-blue-700 text-lg mb-2">Digital Services</h4>
      <p className="text-sm text-gray-600">
        Get help with Aadhar, PAN, online forms, and digital literacy training.
      </p>
    </div>
  </div>
</div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowCreate((prev) => !prev)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            {showCreate ? (
              <>
                <MinusCircle size={18} /> Hide Create Form
              </>
            ) : (
              <>
                <PlusCircle size={18} /> Create New Service
              </>
            )}
          </button>
        </div>

        {showCreate && (
          <div className="max-w-4xl mx-auto mb-10">
            <CreateService onCreated={fetchServices} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-40 text-blue-600">
            <Loader2 className="animate-spin mr-2" size={28} />
            <span>Loading services...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center text-red-600 gap-2">
            <AlertTriangle size={22} />
            <span>{error}</span>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 text-lg">
            No services available yet. <br />
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:underline"
            >
              <PlusCircle size={18} /> Add the first service
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-lg hover:scale-[1.02] transition duration-200"
              >
                {service.category && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
                    {service.category}
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  {getIconForCategory(service.category)}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p
                  className="text-sm text-gray-600 line-clamp-3"
                  title={service.description}
                >
                  {service.description}
                </p>

                {service.link && (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 text-sm text-blue-600 hover:underline"
                    aria-label={`Learn more about ${service.title}`}
                    onClick={(e) => {
                      const confirmLeave = window.confirm("You are leaving VillageConnect. Continue?");
                      if (!confirmLeave) e.preventDefault();
                    }}
                  >
                    Learn More <ExternalLink size={14} />
                  </a>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-2">
              VillageConnect
            </h4>
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

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-yellow-400 transition">
                  Services
                </Link>
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
