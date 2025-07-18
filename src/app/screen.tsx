"use client";

import Navbar from "@/components/shared/Navbar/Navbar";
import Image from "next/image";

export default function HomeScreen() {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="p-6 text-lg font-semibold">
        <Image src="/test.png" alt="Test Image" width={400} height={200} />
      </div>
    </div>
  );
}
