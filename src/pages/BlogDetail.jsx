import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AwardIcon, Heart } from "lucide-react"; // using lucide icons
import { useNavigate, useParams } from "react-router-dom";
import api from "../config/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/userAuthStore";
import NotFound404 from "./NotFound404";

const postComment = async (requiredDetails) => {
  try {
    const { data } = await api.post(
      `/posts/${requiredDetails.postId}/comments?userId=${requiredDetails.id}`,
      { content: requiredDetails.newComment }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const id = user?.id;
  const [page, setPage] = useState(0);

  const { postId } = useParams();

  const [newComment, setNewComment] = useState("");

  const fetchBlog = async (postId) => {
    try {
      const res = await api.get(`/posts/${postId}`);
      return res;
    } catch (error) {
      // If unauthorized, return a fallback blog object instead of undefined
      if (error?.response?.status === 401) {
        return {
          data: {
            title: "Unauthorized",
            content: "You must be logged in to view this blog.",
            name: "",
            createdAt: Date.now(),
            imgUrl: "",
          },
        };
      }
      console.log(error);
      return {
        data: {
          title: "Not Found",
          content: "Blog not found.",
          name: "",
          createdAt: Date.now(),
          imgUrl: "",
        },
      };
    }
  };

  const fetchComments = async (postId, page, size = 2) => {
    try {
      const { data } = await api.get(
        `/posts/${postId}/comments?page=${page}&size=${size}`
      );
      return data;
    } catch (error) {
      if (error?.response?.status === 401) {
        return { content: [], first: true, last: true, totalPages: 1 };
      }
      console.log(error);
      return { content: [], first: true, last: true, totalPages: 1 };
    }
  };

  const fetchLikes = async (postId, userId) => {
    const params = {};
    if (userId) params.userId = userId;
    const { data } = await api.get(`/posts/${postId}/like`, { params });
    return data;
  };

  const {
    data: blogData,
    isLoading: isBlogLoading,
    refetch: blogRefetch,
  } = useQuery({
    queryKey: ["blog", postId],
    queryFn: () => fetchBlog(postId),
  });

  useEffect(() => {
    if (postId && blogRefetch) {
      blogRefetch();
    }
  }, [postId, blogRefetch]);

  const {
    data: allComments,
    isError: isCommentError,
    error: commentError,
    refetch: commentRefetch,
    isLoading: isCommentLoading,
  } = useQuery({
    queryKey: ["comment", postId, page],
    queryFn: () => fetchComments(postId, page),
  });

  const { data: likesData, refetch: likeRefetch } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () => fetchLikes(postId, id),
  });

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    if (!id) navigate("/login");
    if (isLiked) {
      dislikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      await api.post(`/posts/${postId}/like`, null, { params: { userId: id } });
    },
    onSuccess: () => {
      likeRefetch();
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/posts/${postId}/like`, { params: { userId: id } });
    },
    onSuccess: () => {
      likeRefetch();
    },
  });

  const mutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comment"]);
      toast.success("💬 Comment created successfully!");
      setNewComment("");
      commentRefetch();
    },
    onError: () => {
      toast.error("❌ Something went wrong. Try again!");
    },
  });

  useEffect(() => {
    if (likesData) {
      setIsLiked(!!likesData.likedByUser);
    }
  }, [likesData, postId]);

  if (isBlogLoading) {
    return <div className="p-5">Loading...</div>;
  }
  if (
    blogData?.data?.title === "Not Found" ||
    blogData?.data?.title === "Unauthorized" ||
    !blogData?.data?.title
  ) {
    return <NotFound404 />;
  }

  if (isCommentLoading) {
    return <div className="p-5">Loading...</div>;
  }

  if (isCommentError) {
    return (
      <div className="p-5 text-red-500">
        Error: {commentError?.message || "Failed to load comments."}
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    mutation.mutate({ postId, id, newComment });
    setNewComment("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="w-full">
        <img
          src={
            blogData?.data?.imgUrl
              ? blogData.data.imgUrl
              : "https://plus.unsplash.com/premium_photo-1683121696175-d05600fefb85?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={blogData?.data?.title || "Blog Image"}
          className="w-full h-72 md:h-96 object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Author + Date */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-6">
          <span>
            Written by <strong>{blogData?.data?.name || "Unknown"}</strong>
          </span>
          <span>
            {new Date(blogData?.data?.createdAt || Date.now()).toDateString()}
          </span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
        >
          {blogData?.data?.title || "Untitled"}
        </motion.h1>

        {/* Content */}
        {(blogData?.data?.content || "").split("\n").map((para, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="mb-5 leading-relaxed text-gray-700"
          >
            {para}
          </motion.p>
        ))}

        {/* Like Button */}
        <div
          className="flex items-center gap-3 mt-6"
          onClick={handleLikeToggle}
        >
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Heart
              className={`w-6 h-6 cursor-pointer transition-colors ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
            <span className="text-gray-700">
              {likesData?.likeCount || 0}{" "}
              {likesData?.likesCount === 1 ? "Like" : "Likes"}
            </span>
          </motion.button>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4">
            {allComments?.content.map((c) => (
              <div key={c.id} className="border-b pb-3">
                <p className="text-sm font-semibold">{c.userName}</p>
                <p className="text-gray-600">{c.content}</p>
              </div>
            ))}
          </div>
          <center>
            <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium my-4">
              <button
                type="button"
                disabled={allComments.first}
                onClick={() => setPage(page - 1)}
                aria-label="prev"
                className="rounded-full border border-slate-200 hover:bg-slate-100/70 active:scale-95 transition-all disabled:cursor-not-allowed"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth=".078"
                  />
                </svg>
              </button>

              <span>
                {page + 1} of {allComments?.totalPages}
              </span>

              <button
                type="button"
                disabled={allComments.last}
                onClick={() => setPage(page + 1)}
                aria-label="next"
                className="rounded-full border border-slate-200 hover:bg-slate-100/70 active:scale-95 transition-all disabled:cursor-not-allowed"
              >
                <svg
                  className="rotate-180"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
                    fill="#475569"
                    stroke="#475569"
                    strokeWidth=".078"
                  />
                </svg>
              </button>
            </div>
          </center>

          {/* Add Comment */}
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <textarea
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none resize-none"
              />
              <button
                type="submit"
                disabled={mutation.isPending}
                className="mt-3 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition"
              >
                {mutation.isPending ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className="mt-6 text-center">
              <p className="mb-2 text-gray-600">
                You must be logged in to post a comment.
              </p>
              <a
                href="/login"
                className="inline-block bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition"
              >
                Login to Comment
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
