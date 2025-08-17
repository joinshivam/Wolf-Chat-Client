"use client";

import { useState } from "react";
import { FaUserCircle, FaBoxOpen, FaCog, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import Navbar from "../components/navbar";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUserCircle /> },
    { id: "orders", label: "Orders", icon: <FaBoxOpen /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const user = {
    name: "John Doe",
    email: "john@example.com",
    joined: "12 Jan 2024",
    avatar: "/default-avatar.png",
  };

  const orders = [
    { id: "ORD123", date: "10 Aug 2025", total: "$45.99", status: "Delivered" },
    { id: "ORD124", date: "05 Aug 2025", total: "$29.49", status: "Processing" },
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <button
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => alert("Logging out...")}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4 mb-6">
          <Image
            src={user.avatar}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Joined: {user.joined}</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${activeTab === tab.id
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Profile Information</h3>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Member Since: {user.joined}</p>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex justify-between border-b py-2"
                >
                  <span>{order.id}</span>
                  <span>{order.date}</span>
                  <span>{order.total}</span>
                  <span
                    className={`${order.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

