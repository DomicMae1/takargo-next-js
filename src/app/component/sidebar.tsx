"use client";

import { useState } from "react";
import Link from "next/link";

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`bg-white transition-all duration-300 ${
        sidebarOpen ? "w-48" : "w-24"
      } min-h-screen`}
    >
      {/* Header Sidebar */}

      {/* Menu List */}
      <ul className="p-4 space-y-2">
        <div className="flex items-center justify-between p-2">
          <li className="hover:bg-gray-100 rounded ">
            <Link href="/dashboard" className="block">
              {sidebarOpen ? "Dashboard" : "🏠"}
            </Link>
          </li>
          <div className="pl-2 ">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded hover:bg-gray-200 flex items-center justify-center"
            >
              {sidebarOpen ? "«" : "»"}
            </button>
          </div>
        </div>

        <li className="hover:bg-gray-100 rounded p-2">
          <Link href="/profile" className="block">
            {sidebarOpen ? "Profil" : "👤"}
          </Link>
        </li>
        <li className="hover:bg-gray-100 rounded p-2">
          <Link href="/settings" className="block">
            {sidebarOpen ? "Pengaturan" : "⚙️"}
          </Link>
        </li>
        <li className="hover:bg-gray-100 rounded p-2">
          <Link href="/items" className="block">
            {sidebarOpen ? "Barang" : "📦"}
          </Link>
        </li>
        <li className="hover:bg-gray-100 rounded p-2">
          <Link href="/cart" className="block">
            {sidebarOpen ? "Keranjang" : "🛒"}
          </Link>
        </li>
        <li className="hover:bg-gray-100 rounded p-2">
          <Link href="/shipment" className="block">
            {sidebarOpen ? "Shipment" : "📦"}
          </Link>
        </li>
      </ul>
    </div>
  );
}
