import React, { useEffect, useState } from "react";
import { Loader2, AlertTriangle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Forum() {
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      window.location.href = "/login"; // redirect if not logged in
    }
  }, []);
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentSuccessMap, setCommentSuccessMap] = useState({});

  const currentUserId = JSON.parse(localStorage.getItem("user"))?.user?._id;


  const handleEdit = async (postId, commentId, oldText) => {
    const newText = prompt("Edit your comment:", oldText);
    if (!newText || newText.trim() === "") return;

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    const res = await fetch(`http://localhost:5000/api/forum/${postId}/comment/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newText }),
    });

    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p._id === postId ? updated : p)));
    } else {
      console.error("Failed to edit comment");
    }
  };


  const handleDelete = async (postId, commentId) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    try {
      const res = await fetch(`http://localhost:5000/api/forum/${postId}/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      const result = await res.json(); // Always try to read the response body

      if (res.ok) {
        setPosts((prev) => prev.map((p) => (p._id === postId ? result : p)));
      } else {
        console.error("❌ Failed to delete comment:", result.error || "Unknown error");
        alert(`❌ Delete failed: ${result.error || "Something went wrong."}`);
      }
    } catch (err) {
      console.error("🚨 Network error:", err.message);
      alert("🚨 Network error while deleting comment");
    }
  };



  useEffect(() => {
    fetch("http://localhost:5000/api/forum")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load forum posts.");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
        setLoading(false);
      });
  }, []);

  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="py-10 px-4 flex-grow">
        <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
          <h2 className="text-3xl font-bold text-blue-800">Community Forum</h2>
          <Link
            to="/forum/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Post
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-blue-600" size={32} />
            <span className="ml-3 text-blue-600">Loading posts...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center text-red-600 gap-2">
            <AlertTriangle size={24} />
            <span>{error}</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 mt-10 px-4">
            <p className="mb-4 text-lg sm:text-xl">
              No posts yet. Be the first to start a discussion!
            </p>
            <Link
              to="/forum/create"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
            >
              Create Post
            </Link>
          </div>

        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border border-gray-300 rounded-lg p-6 shadow hover:shadow-md transition duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Post by {post.createdBy?.name || "Anonymous"}
                </h3>
                <p className="text-gray-700 mb-2 whitespace-pre-line">{post.post}</p>

                {post.comments?.length > 0 ? (
                  <ul className="pl-5 list-disc text-sm text-gray-700 mb-2">
                    {post.comments.map((comment, i) => {

                      const commentUserId = typeof comment.user === "object"
                        ? comment.user?._id?.toString()
                        : comment.user?.toString();
                      const isOwner = commentUserId === currentUserId;
                      


                      return (
                        <li key={i} className="mb-1 text-gray-700">
                          <span className="font-semibold text-blue-700">
                            {typeof comment.user === "object" ? comment.user?.name : "Anonymous"}:
                          </span>{" "}
                          {comment.text}
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>

                          {isOwner ? (
                            <span className="ml-4 text-sm ">
                              <button title="Edit this Comment"
                                onClick={() => handleEdit(post._id, comment._id, comment.text)}
                                className="text-yellow-600 hover:underline mr-2 cursor-pointer"
                              >
                                ✏️
                              </button>
                              <button title="Delete this Comment"
                                onClick={() => handleDelete(post._id, comment._id)}
                                className="text-red-600 hover:underline cursor-pointer"
                              >
                                🗑️
                              </button>
                            </span>
                          ) : <></>}

                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic mb-2">No comments yet.</p>
                )}



                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const commentText = e.target.comment.value.trim();
                    if (!commentText) return;

                    const token = JSON.parse(localStorage.getItem("user"))?.token;

                    try {
                      const res = await fetch(`http://localhost:5000/api/forum/${post._id}/comment`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ text: commentText }),
                      });

                      if (res.ok) {
                        const updatedPost = await res.json();
                        setPosts((prev) =>
                          prev.map((p) => (p._id === post._id ? updatedPost : p))
                        );
                        setCommentSuccessMap((prev) => ({ ...prev, [post._id]: true }));
                        setTimeout(() => {
                          setCommentSuccessMap((prev) => ({ ...prev, [post._id]: false }));
                        }, 2000);
                      } else {
                        const errData = await res.json();
                        console.error(errData.error || "Failed to add comment.");
                      }
                    } catch (err) {
                      console.error("Comment submit failed:", err);
                    }

                    e.target.reset();
                  }}
                  className="mt-2 flex flex-wrap gap-2 items-center"
                >
                  <input
                    name="comment"
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm cursor-pointer"
                  >
                    Comment
                  </button>
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm cursor-pointer"
                    onClick={(e) => {
                      const input = e.target.form?.comment;
                      if (input) input.value = "";
                    }}
                  >
                    Cancel
                  </button>

                  {commentSuccessMap[post._id] && (
                    <p className="text-green-600 text-sm ml-2">✅ Comment added!</p>
                  )}
                </form>


              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 mt-16">
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
