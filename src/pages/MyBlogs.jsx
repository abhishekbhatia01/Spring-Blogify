// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import { useAuthStore } from "../store/authStore";
// import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

const MyBlogs = () => {
  //   const { userInfo } = useAuthStore();
  //   //   const [blogs, setBlogs] = useState([]);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const fetchBlogs = async () => {
  //       try {
  //         const res = await axios.get(
  //           `http://localhost:8080/users/${userInfo.id}/posts`
  //         );
  //         setBlogs(res.data);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //     fetchBlogs();
  //   }, [userInfo.id]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Blogs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-600 mt-2 line-clamp-3">{blog.content}</p>
              <button
                onClick={() => navigate(`/edit-blog/${blog.id}`)}
                className="mt-4 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
              >
                Edit Blog
              </button>
            </div>
          ))} */}
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;
