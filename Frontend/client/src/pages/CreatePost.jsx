import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    if (!form.title || !form.content) {
      return setMessage("❌ Title and content are required.");
    }

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      return setMessage("❌ You must be logged in to post.");
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post: form.content }),
      });

      if (res.ok) {
        navigate("/forum");
      } else {
        const data = await res.json();
        setMessage(data.error || "❌ Failed to create post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center text-blue-700">
        Create New Forum Post
      </h2>

      {message && <p className="text-red-600 text-sm mb-4 text-center">{message}</p>}

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Write your content..."
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-4 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleCreatePost}
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading && "opacity-50 cursor-not-allowed"
          }`}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
