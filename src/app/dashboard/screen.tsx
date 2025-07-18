"use client";

import Navbar from "@/components/shared/Navbar/Navbar";

export default function DashboardScreen() {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="p-6 text-lg font-semibold">Dashboard</div>
    </div>
  );
}
