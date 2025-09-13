import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import { useQuery } from "@tanstack/react-query";
import api from "../config/api";

const Blogs = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const fetchBlogs = async (page, size) => {
    try {
      // Pass page and size as query params
      const res = await api.get(`/posts?page=${page}&size=${size}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", page, size],
    queryFn: () => fetchBlogs(page, size),
  });

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
    <div className="flex flex-col w-full">
      <section className="p-5">
        <div className="flex flex-col md:flex-row gap-5">
          <img
            src="https://images.pexels.com/photos/7376/startup-photos.jpg"
            alt=""
            className="w-full md:w-[350px] lg:flex-2 h-[200px] md:h-[350px] rounded-md object-cover"
          />
          <div className="w-full md:flex-1 flex flex-col relative gap-3">
            <h1 className="text-2xl md:text-4xl">Title</h1>
            <h3 className="text-lg md:text-2xl">Author</h3>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut at
              ullam temporibus nihil eius sint molestiae? Laudantium natus ad
              tempora molestias sapiente dolorem sed molestiae animi Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Dolores vel eveniet
              consequuntur temporibus tempore, repudiandae exercitationem! Et
              provident modi totam in ipsa iste, animi reprehenderit nobis
              corrupti vitae, maxime accusantium! Dignissimos omnis eos...
            </p>
            <button className="py-2 px-3 bg-yellow-400 rounded-full max-w-30 md:absolute left-2 bottom-2 cursor-pointer">
              Read More
            </button>
          </div>
        </div>
      </section>
      <section className="p-5">
        <div className="grid grid-cols-3 max-lg:grid-cols-2 gap-1 max-sm:grid-cols-1">
          {Array.isArray(data?.data?.content) &&
            data.data.content.map((post) => (
              <BlogCard
                title={post.title}
                author={post.name}
                date={post.createdAt}
                key={post.id}
                imgUrl={post.imgUrl}
              />
            ))}
        </div>
      </section>
      <section className="flex items-center justify-center p-5">
        <div className="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
          <button
            type="button"
            aria-label="prev"
            disabled={data.data.first}
            onClick={() => setPage(page - 1)}
            className="rounded-full border border-slate-300/80 disabled:cursor-not-allowed"
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
            Page {page + 1} of {data?.data?.totalPages}
          </span>

          <button
            type="button"
            disabled={data.data.last}
            aria-label="next"
            className="rounded-full border border-slate-300/80 disabled:cursor-not-allowed"
            onClick={() => setPage(page + 1)}
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
      </section>
    </div>
  );
};

export default Blogs;
