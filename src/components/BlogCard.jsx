import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BlogCard = ({ title, author, date, imgUrl, postId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultImg =
    "https://plus.unsplash.com/premium_photo-1683121696175-d05600fefb85?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div
      className="bg-white rounded-md overflow-hidden shadow h-fit flex flex-col p-2 cursor-pointer"
      onClick={() =>
        navigate(`/blogs/${postId}`, { state: { from: location.pathname } })
      }
    >
      <img
        src={imgUrl ? imgUrl : defaultImg}
        alt=""
        className="object-cover w-full h-65"
      />
      <div className="flex flex-col flex-1 gap-1 mt-2">
        <h1 className="text-lg font-semibold line-clamp-2">{title}</h1>
        <h2 className="text-sm text-gray-600">{author}</h2>
        <h3 className="text-xs text-gray-400">{date?.split("T")[0]}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
