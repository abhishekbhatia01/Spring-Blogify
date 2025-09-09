import React from "react";

const BlogCard = () => {
  return (
    <div className="p-2 cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="object-cover w-full rounded-md"
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Title</h1>
        <h2>Author</h2>
        <h3 className="text-gray-400">28 Aug 2025</h3>
      </div>
    </div>
  );
};

export default BlogCard;
