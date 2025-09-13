import React from "react";

const BlogCard = ({ title, author, date, imgUrl }) => {
  return (
    <div className="bg-white rounded-md overflow-hidden shadow h-92 flex flex-col p-2 cursor-pointer">
      <img src={imgUrl} alt="" className="object-cover w-full h-65" />
      <div className="flex flex-col flex-1 gap-1 mt-2">
        <h1 className="text-lg font-semibold line-clamp-2">{title}</h1>
        <h2 className="text-sm text-gray-600">{author}</h2>
        <h3 className="text-xs text-gray-400">{date?.split("T")[0]}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
