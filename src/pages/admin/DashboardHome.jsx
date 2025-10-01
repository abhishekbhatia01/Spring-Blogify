import React from "react";
import { motion } from "framer-motion";
import { NotebookTextIcon, User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/userAuthStore";

const DashboardHome = () => {
  const { user } = useAuthStore();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
    hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.15)" },
  };

  const navigate = useNavigate();

  const cards = [
    {
      title: "User Management",
      desc: "Manage users, roles, and permissions.",
      icon: <User2Icon className="w-8 h-8 text-blue-600" />,
      route: "/admin/users",
    },
    {
      title: "Blog Management",
      desc: "View, edit, and publish blog posts.",
      icon: <NotebookTextIcon className="w-8 h-8 text-blue-600" />,
      route: "/admin/blogs",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2 text-slate-800">
          Admin Dashboard
        </h2>
        <p className="text-slate-600">
          Welcome to the admin dashboard. Manage users and blogs.
        </p>
      </motion.div>

      {/* Admin Profile Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl p-6 items-center gap-6 shadow-sm"
      >
        <img
          src={
            user.profileImage
              ? user.profileImage
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name || "Admin User"
                )}&background=random`
          }
          alt="Admin Avatar"
          className="w-[100px] h-[100px] rounded-full border-4 border-blue-500 object-cover"
        />
        <div className="flex flex-col text-slate-700">
          <h1 className="font-semibold text-lg">{user.name}</h1>
          <h2 className="text-sm text-slate-600">{user.email}</h2>
          <span className="text-xs font-medium mt-1 text-blue-600">
            {user.roles && user.roles.includes("ROLE_ADMIN")
              ? "Admin"
              : Array.isArray(user.roles) && user.roles.length > 0
              ? user.roles[0]
              : user.role || "User"}
          </span>
        </div>
      </motion.div>

      {/* Dashboard Cards */}
      <div className="flex flex-wrap gap-6 mt-10">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => navigate(card.route)}
            className="flex flex-col text-center items-center justify-center rounded-xl p-8 border border-slate-200 gap-6 max-w-sm flex-1 cursor-pointer bg-white transition-colors"
            style={{ transition: "box-shadow 0.2s" }}
          >
            <motion.div
              className="p-6 aspect-square bg-blue-100 rounded-full flex items-center justify-center"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {card.icon}
            </motion.div>
            <div className="space-y-2">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.5 }}
                className="text-lg font-semibold text-slate-700"
              >
                {card.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 * i, duration: 0.6 }}
                className="text-sm text-slate-600"
              >
                {card.desc}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
