import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <section className="p-8">
      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
      >
        &larr; Back to Home
      </button>

      {/* Nested Routes */}
      <Outlet />
    </section>
  );
};

export default Dashboard;
