import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore";

const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(data);
      setData({ name: "", email: "", password: "", bio: "" });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full items-center justify-center h-[100vh]">
      <form
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Register</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign up to continue</p>
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#6B7280"
              d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 
      2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 
      3.134-7 7h2c0-2.761 2.239-5 
      5-5s5 2.239 5 5h2c0-3.866-3.134-7-7-7z"
            />
          </svg>
          <input
            type="text"
            value={data.name}
            name="name"
            onChange={handleChange}
            placeholder="Enter your name"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center w-full mt-5 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email id"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <svg
            width="13"
            height="17"
            viewBox="0 0 13 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
              fill="#6B7280"
            />
          </svg>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>
        <div className="flex items-start w-full mt-4 bg-white border border-gray-300/80 rounded-2xl overflow-hidden pl-6 pt-3 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            className="mt-1"
          >
            <path
              fill="#6B7280"
              d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 
      6h10v2H4v-2z"
            />
          </svg>
          <textarea
            placeholder="Write your bio..."
            name="bio"
            value={data.bio}
            onChange={handleChange}
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full min-h-[100px] resize-none"
            required
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {loading ? "Please Wait..." : "Register"}
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Already have an account?{" "}
          <a className="text-indigo-500" onClick={() => navigate("/login")}>
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
