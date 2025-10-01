import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../config/api";

const UserManagement = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const size = 6;

  // Fetch Users
  const fetchUsers = async ({ queryKey }) => {
    const [_key, page, size] = queryKey;
    const { data } = await api.get(`/users/all?page=${page}&size=${size}`);
    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", page, size],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  // Mutation for deleting user
  const deleteUserMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  if (isLoading) return <p className="p-6">Loading users...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;

  const users = data.content;
  const { first, last, totalPages, number } = data;

  const handleDelete = (user) => {
    const isAdmin = user.roles?.includes("ROLE_ADMIN");

    // Prevent deleting admins
    if (isAdmin) {
      alert("Admins cannot be deleted!");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUserMutation.mutate(user.id);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-2 text-slate-800">
        User Management
      </h2>
      <p className="text-slate-600 mb-6">
        Manage, view, and delete users from your application below.
      </p>

      <button
        className="mb-8 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        onClick={() => navigate("/admin")}
      >
        Back to Dashboard
      </button>

      {/* User Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user, i) => {
          const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=random`;

          const isAdmin = user.roles?.includes("ROLE_ADMIN");

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
              }}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center border border-slate-100"
            >
              {/* Avatar */}
              <img
                src={user.avatar?.length > 0 ? user.avatar : defaultAvatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-indigo-400"
              />

              {/* Name */}
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                {user.name}
              </h3>

              {/* Role */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                  isAdmin
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {isAdmin ? "Admin" : "User"}
              </span>

              {/* Email */}
              <p className="flex items-center text-sm text-gray-600 gap-2 mb-2">
                <Mail size={16} className="text-gray-500" />
                {user.email}
              </p>

              {/* Bio */}
              {user.bio && (
                <p className="text-xs text-slate-500 italic mb-4">
                  "{user.bio}"
                </p>
              )}

              {/* Delete Button */}
              <button
                disabled={isAdmin}
                onClick={() => handleDelete(user)}
                className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                  isAdmin
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={first}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className={`px-4 py-2 rounded ${
            first
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Previous
        </button>

        <span className="text-slate-600">
          Page {number + 1} of {totalPages}
        </span>

        <button
          disabled={last}
          onClick={() => setPage((prev) => prev + 1)}
          className={`px-4 py-2 rounded ${
            last
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
