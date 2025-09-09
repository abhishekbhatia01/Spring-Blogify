import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react"; // using lucide icons

const BlogDetail = () => {
  const [blog, setBlog] = useState({
    title: "Perplexity x Theo Von’s This Past Weekend",
    content: `
Curiosity has a new co-host.

Today we’re announcing a new partnership with The Roost Podcast Network and Theo Von’s hit show, “This Past Weekend.” Our partnership pairs one of the world’s most famously inquisitive minds with the AI-powered answer engine built for people who are curious.

If you’ve ever listened to Theo Von, you’re familiar with the moments of spontaneity and curiosity that make him a joy to listen to. Those impulsive, unscripted detours, when suddenly a question comes to mind and Theo asks “Can we look that up?” Those moments resonate because all of us are curious.

Starting today, Perplexity will power these “look it up” moments to deliver accurate and trustworthy answers on-screen for Theo, his guests, and his fans.

This isn’t a typical ad spot or podcast sponsor shoutout. Perplexity’s presence is baked in. Perplexity is integrated directly into the flow of the conversation, because curiosity is a natural part of all conversation.

Theo’s curiosity is never staged or scripted, so our answers are always organic. No more Theo or team digging through endless blue links. No more results, just instant, accurate answers.
    `,
    imgUrl:
      "https://framerusercontent.com/images/w2fbgpK5XbA8dcXjol9h7rNB4Lo.png?width=1920&height=1080",
    createdAt: "2025-09-08",
    user: { name: "Perplexity Team" },
    likes: 12,
  });

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blog.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);

    // 🔗 Backend integration:
    // axios.post(`/api/posts/${blogId}/like`, { userId })
  };

  const [comments, setComments] = useState([
    { id: 1, author: "Jane Doe", text: "This is so well written 👏" },
    { id: 2, author: "John Smith", text: "Loved the clarity and tone." },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now(), author: "You", text: newComment },
    ]);
    setNewComment("");

    // 🔗 Backend integration:
    // axios.post(`/api/posts/${blogId}/comments`, { userId, text: newComment })
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="w-full">
        <img
          src={blog.imgUrl}
          alt={blog.title}
          className="w-full h-72 md:h-96 object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* Author + Date */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-6">
          <span>
            Written by <strong>{blog.user.name}</strong>
          </span>
          <span>{new Date(blog.createdAt).toDateString()}</span>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
        >
          {blog.title}
        </motion.h1>

        {/* Content */}
        {blog.content.split("\n").map((para, idx) => (
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
        <div className="flex items-center gap-3 mt-6">
          <motion.button
            onClick={handleLike}
            whileTap={{ scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Heart
              className={`w-6 h-6 cursor-pointer transition-colors ${
                liked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
            <span className="text-gray-700">
              {likesCount} {likesCount === 1 ? "Like" : "Likes"}
            </span>
          </motion.button>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="border-b pb-3">
                <p className="text-sm font-semibold">{c.author}</p>
                <p className="text-gray-600">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
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
              className="mt-3 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
