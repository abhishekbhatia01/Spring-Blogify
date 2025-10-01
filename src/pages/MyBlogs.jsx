// import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useAuthStore } from "../store/userAuthStore";
// import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BlogCard from "../components/BlogCard";
import { AwardIcon } from "lucide-react";
import api from "../config/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const deleteBlog = async (postId) => {
  await api.delete(`/posts/${postId}`);
};

const MyBlogs = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const id = user?.id;
  const queryClient = useQueryClient();

  const fetchMyBlogs = async (id) => {
    try {
      const { data } = await api.get(`/posts/my-blogs?userId=${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myblogs"],
    queryFn: () => fetchMyBlogs(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["myblogs"]);
      toast.success("✅ Blog Deleted successfully!");
    },
    onError: () => {
      toast.error("❌ Failed to delete blog. Try again!");
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const defaultImg =
    "https://plus.unsplash.com/premium_photo-1683121696175-d05600fefb85?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  if (isLoading) {
    return <div className="p-5">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="p-5 text-red-500">
        Error: {error?.message || "Failed to load blogs."}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Blogs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data?.content?.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-md overflow-hidden shadow h-fit flex flex-col p-2 cursor-pointer"
              onClick={() => navigate(`/blogs/${c.id}`)}
            >
              <img
                src={c.imgUrl ? c.imgUrl : defaultImg}
                alt=""
                className="object-cover w-full h-65"
              />
              <div className="flex flex-col flex-1 gap-1 mt-2 relative">
                <h1 className="text-lg font-semibold line-clamp-2">
                  {c.title}
                </h1>
                <h2 className="text-sm text-gray-600">{c.name}</h2>
                <h3 className="text-xs text-gray-400">
                  {c.createdAt?.split("T")[0]}
                </h3>
                <div className="absolute flex gap-3 right-2 bottom-0 text-white">
                  <button
                    className="px-2 py-1 rounded-md bg-green-500 hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-blog/${c.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 rounded-sm bg-red-500 hover:cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(c.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
