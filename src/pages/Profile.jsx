import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useAuthStore } from "../store/userAuthStore";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../config/api";

const updateProfile = async (updatedUser) => {
  const formData = new FormData();
  formData.append("name", updatedUser.name);
  formData.append("bio", updatedUser.bio);
  formData.append("email", updatedUser.email);
  if (updatedUser.profilePic) {
    formData.append("profileImage", updatedUser.profilePic);
  }
  const { data } = await api.patch(`/users/${updatedUser.id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const id = user.id;
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

  const handleProfileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user", id]);
      updateUser(data);
      toast.success("🎉 Profile updated successfully!");
    },
    onError: () => {
      toast.error("❌ Something went wrong. Try again!");
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    mutation.mutate({ id, name, bio, email, profilePic });
  };

  const clearError = useAuthStore((state) => state.clearError);

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Profile</h2>
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="profileImageUpload"
            className="relative cursor-pointer"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-sky-200 shadow"
              />
            ) : user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-sky-200 shadow"
              />
            ) : (
              <img
                src="https://imgs.search.brave.com/nVY-jJFjRjOlbUQyADij2hQvQkv0INDwhVuG_ZdP-OU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9mdW5ueS1jYXJ0/b29uLW1hbi13aXRo/LXJlZC1iZWFyZC1t/dXN0YWNoZS12ZWN0/b3ItaWxsdXN0cmF0/aW9uXzk5NDQxOC0x/MDE1MzcuanBnP3Nl/bXQ9YWlzX2luY29t/aW5nJnc9NzQwJnE9/ODA"
                alt="Profile Preview"
                className="w-28 h-28 rounded-full object-cover border-4 border-sky-200 shadow"
              />
            )}
            <span className="absolute bottom-2 right-2 bg-sky-600 text-white rounded-full px-1 py-1 text-xs">
              <Pencil width={15} height={15} />
            </span>
          </label>
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImgChange}
          />
        </div>

        {/* Profile Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-700 transition"
          >
            {mutation.isPending ? "Updating..." : "Update Profile"}
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
