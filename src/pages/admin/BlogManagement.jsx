import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/api";
import NotFound404 from "../NotFound404";

const BlogManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const size = 6;

  // Fetch blogs with pagination
  const fetchBlogs = async ({ queryKey }) => {
    const [_key, page, size] = queryKey;
    const { data } = await api.get(`/posts?page=${page}&size=${size}`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs", page, size],
    queryFn: fetchBlogs,
    keepPreviousData: true,
  });

  // Mutation for deleting a blog
  const deleteBlogMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  if (isLoading) return <p className="p-6">Loading blogs...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  // Defensive: handle missing or empty blogs
  const blogs = Array.isArray(data?.content) ? data.content : [];
  const { first, last, totalPages, number } = data || {};

  // Show NotFound404 if no blogs found
  if (!isLoading && !isError && blogs.length === 0) {
    return <NotFound404 />;
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const handleView = (blog) => {
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-2 text-slate-800">
        Blog Management
      </h2>
      <p className="text-slate-600 mb-6">
        View, manage, and delete blogs below.
      </p>

      <button
        className="mb-8 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        onClick={() => navigate("/admin")}
      >
        Back to Dashboard
      </button>

      {/* Blog Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
            }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">Author: {blog.name}</p>
            <p className="text-xs text-gray-400 mb-1">
              Created: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400 mb-4">ID: {blog.id}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleView(blog)}
                className="px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition flex items-center gap-1"
              >
                <Eye size={16} /> View
              </button>

              <button
                onClick={() => handleDelete(blog)}
                className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={first}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className={`px-4 py-2 rounded ${
            first
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Previous
        </button>

        <span className="text-slate-600">
          Page {number + 1} of {totalPages}
        </span>

        <button
          disabled={last}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded ${
            last
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogManagement;
