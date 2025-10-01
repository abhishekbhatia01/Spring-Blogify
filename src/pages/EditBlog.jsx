import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/userAuthStore";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const EditBlog = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Get userId from auth store
  const { user } = useAuthStore();

  // Fetch blog data
  const fetchBlog = async (postId) => {
    const res = await api.get(`/posts/${postId}`);
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", postId],
    queryFn: () => fetchBlog(postId),
  });

  // Local state for editing
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (data) {
      setTitle(data.title || "");
      setContent(data.content || "");
      setPreview(data.imgUrl || "");
    }
  }, [data]);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Mutation for updating blog
  const mutation = useMutation({
    mutationFn: async (updatedBlog) => {
      const formData = new FormData();
      formData.append("userId", user.id); // as @RequestParam
      formData.append("title", updatedBlog.title); // as @RequestParam
      formData.append("content", updatedBlog.content); // as @RequestParam
      if (updatedBlog.image) {
        formData.append("image", updatedBlog.image); // as @RequestPart
      }
      const res = await api.patch(`/posts/${postId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog updated successfully!");
      queryClient.invalidateQueries(["myBlogs"]);
      navigate("/my-blogs");
    },
    onError: () => {
      toast.error("Failed to update blog.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, content, image });
  };

  if (isLoading) return <div className="p-5">Loading...</div>;
  if (isError)
    return <div className="p-5 text-red-500">Failed to load blog.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Edit Blog</h2>
        {/* Image Preview & Upload */}
        <div className="flex flex-col items-center mb-6">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full max-w-md h-64 object-cover rounded-lg mb-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className=""
          />
        </div>
        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            required
          />
        </div>
        {/* Content */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition"
        >
          {mutation.isPending ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
