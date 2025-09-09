import React from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

const Blogs = () => {
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
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </section>
      <section className="flex items-center justify-center p-5">
        <Pagination />
      </section>
    </div>
  );
};

export default Blogs;
