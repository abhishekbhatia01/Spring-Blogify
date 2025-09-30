import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/api";
import { useAuthStore } from "../store/userAuthStore";

const createBlog = async (newBlog) => {
  const formData = new FormData();
  formData.append("userId", newBlog.id);
  formData.append("title", newBlog.title);
  formData.append("content", newBlog.content);
  if (newBlog.imageToUpload) {
    formData.append("image", newBlog.imageToUpload);
  }

  const { data } = await api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const CreateBlog = () => {
  const { id } = useAuthStore((state) => state.user);
  const [image, setImage] = useState(null);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageToUpload(file);
      setImage(URL.createObjectURL(file)); // To preview image we convert it into a url
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, title, content, imageToUpload });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      toast.success("🎉 Blog created successfully!");

      setTitle("");
      setContent("");
      setImage(null);
      setImageToUpload(null);
    },
    onError: () => {
      toast.error("❌ Failed to create blog. Try again!");
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 bg-[url('https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image Upload */}
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center border-r">
          <label
            htmlFor="imageUpload"
            className="w-full h-64 flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer hover:border-sky-500 transition"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-500">Click to upload blog image</span>
            )}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-6">Create a New Blog</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />

            <textarea
              placeholder="Write your blog content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              required
            />

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full py-3 rounded-lg transition ${
                mutation.isPending
                  ? "bg-sky-300 text-gray-100 cursor-not-allowed"
                  : "bg-sky-600 text-white hover:bg-sky-700"
              }`}
            >
              {mutation.isPending ? "Publishing..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
