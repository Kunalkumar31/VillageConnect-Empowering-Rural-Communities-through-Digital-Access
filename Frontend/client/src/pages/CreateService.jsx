import React, { useState } from "react";

export default function CreateService({ onCreated }) {

 const [form, setForm] = useState({
  title: "",
  description: "",
  link: "",
  category: "",
  contact: ""
});

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;


    if (!token) {
      return setMessage("❌ You must be logged in to create a service.");
    }
    if (form.link && !/^https?:\/\/.+\..+/.test(form.link)) {
      return setMessage("❌ Please enter a valid external link (e.g., https://example.com).");
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/services", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const contentType = res.headers.get("content-type");

      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.message || errorData.error || "Something went wrong.");

        } else {
          const text = await res.text();
          throw new Error(text || "Unknown error");
        }
      }

      const data = await res.json();
      setMessage(`✅ ${data.message || "Service created successfully."}`);
      setForm({ title: "", description: "", link: "" });
      if (onCreated) onCreated();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Create New Service</h2>

      {message && (
        <div className={`mb-4 p-3 rounded text-center text-sm ${message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      <label className="block mb-2 text-sm font-medium text-gray-600">Title</label>
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="block border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded px-3 py-2 w-full mb-4 transition-all"
        placeholder="Service Title"
      />

      <label className="block mb-2 text-sm font-medium text-gray-600">Description</label>
      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="block border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded px-3 py-2 w-full mb-1 transition-all"
        placeholder="Service Description"
        rows={4}
      />
      <div className="text-xs text-gray-400 mb-4 text-right">
        {form.description.length}/500
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-600">External Link</label>

      <input
        value={form.link}
        onChange={(e) => setForm({ ...form, link: e.target.value })}
        onBlur={(e) => {
          const value = e.target.value;
          if (value && !/^https?:\/\//i.test(value)) {
            setForm((prev) => ({ ...prev, link: `https://${value}` }));
          }
        }}
        className="block border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none rounded px-3 py-2 w-full mb-6 transition-all"
        placeholder="https://example.com"
      />


      <button
        onClick={handleCreate}
        disabled={loading}
        className={`w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition-all ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.372 0 0 5.373 0 12h4z"></path>
          </svg>
        ) : null}
        {loading ? "Creating..." : "Create Service"}
      </button>
    </div>
  );
}
