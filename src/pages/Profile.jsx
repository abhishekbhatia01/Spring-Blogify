// import React, { useState } from "react";
// import axios from "axios";
// import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // const { userInfo, setUserInfo } = useAuthStore();
  // const [name, setName] = useState(userInfo?.name || "");
  // const [bio, setBio] = useState(userInfo?.bio || "");
  // const [email, setEmail] = useState(userInfo?.email || "");
  const navigate = useNavigate();

  // const handleUpdate = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.put(
  //       `http://localhost:8080/users/${userInfo.id}`,
  //       { name, bio, email }
  //     );

  //     // update Zustand + localStorage
  //     setUserInfo(res.data);
  //     alert("Profile updated successfully ✅");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to update profile ❌");
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>

        {/* Profile Form */}
        <form onSubmit={() => {}} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={() => {}}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows="3"
              value={"Hello"}
              onChange={() => {}}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={"email"}
              onChange={() => {}}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition"
          >
            Update Profile
          </button>
        </form>

        {/* My Blogs Section */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium mb-2">
            Want to manage your blogs?
          </h3>
          <button
            onClick={() => navigate("/my-blogs")}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Go to My Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
