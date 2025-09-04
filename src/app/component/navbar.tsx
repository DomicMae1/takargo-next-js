/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // Tutup dropdown ketika route berubah
  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <nav className="bg-white px-6 py-4 flex items-center justify-between text-sm">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img
          src="/takargo-logo.svg"
          alt="Takargo Logo"
          className="max-w-full h-auto object-contain"
        />
      </div>

      {/* Menu Tengah */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        {/* Beranda */}
        <Link
          href="/homepage"
          className={`px-3 py-2 rounded-md ${
            pathname === "/homepage" && !showDropdown
              ? "bg-[#0891B2] text-white"
              : "hover:text-[#0891B2]"
          }`}
        >
          Beranda
        </Link>

        {/* Tentang Kami */}
        <Link
          href="/about"
          className={`px-3 py-2 rounded-md ${
            pathname === "/about" && !showDropdown
              ? "bg-[#0891B2] text-white"
              : "hover:text-[#0891B2]"
          }`}
        >
          Tentang Kami
        </Link>

        {/* Layanan */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`px-3 py-2 rounded-md ${
              pathname === "/layanan" || showDropdown
                ? "bg-[#0891B2] text-white"
                : "hover:text-[#0891B2]"
            }`}
          >
            Layanan
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 grid grid-cols-[25%_32%_32%] gap-8 bg-white border border-gray-200 p-4 rounded-2xl shadow-xl z-50 w-[800px]">
              {/* Kolom 1 */}
              <div className="space-y-6 text-white">
                <div className="bg-[#0891B2] rounded-2xl p-4 pt-20">
                  <img
                    src="/logo-layanan.svg"
                    alt="Mission"
                    className="h-8 w-8 mb-4"
                  />
                  <h3 className="text-xl font-bold mb-4">Takargo</h3>
                  <p className="text-xs">
                    Kami mempermudah pengelolaan pengiriman Cargo LCL Anda
                    secara online
                  </p>
                </div>
              </div>

              {/* Kolom 2 */}
              <div className="space-y-12">
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <Link
                      href="/door-to-door"
                      className="text-xl font-bold text-[#334155] hover:text-[#0891B2] transition"
                    >
                      Door to Door
                    </Link>
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Menjemput barang dari pengirim langsung dan mengantarnya
                    langsung ke penerima.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between">
                    <Link
                      href="/port-to-port"
                      className="text-xl font-bold text-[#334155] hover:text-[#0891B2] transition"
                    >
                      Port to Port
                    </Link>
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Menjemput barang dari pengirim langsung dan mengantarnya
                    langsung ke penerima.
                  </p>
                </div>
              </div>

              {/* Kolom 3 */}
              <div>
                <div className="mb-8">
                  <div className="flex justify-between">
                    <Link
                      href="/door-to-port"
                      className="text-xl font-bold text-[#334155] hover:text-[#0891B2] transition"
                    >
                      Door to Port
                    </Link>
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Menjemput barang dari pengirim langsung dan mengantarnya
                    langsung ke penerima.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between">
                    <Link
                      href="/port-to-door"
                      className="text-xl font-bold text-[#334155] hover:text-[#0891B2] transition"
                    >
                      Port to Door
                    </Link>
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <p className="text-sm text-gray-600">
                    Menjemput barang dari pengirim langsung dan mengantarnya
                    langsung ke penerima.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FAQ */}
        <Link
          href="/faq"
          className={`px-3 py-2 rounded-md ${
            pathname === "/faq" && !showDropdown
              ? "bg-[#0891B2] text-white"
              : "hover:text-[#0891B2]"
          }`}
        >
          FAQ
        </Link>

        {/* Contact */}
        <Link
          href="/contact"
          className={`px-3 py-2 rounded-md ${
            pathname === "/contact" && !showDropdown
              ? "bg-[#0891B2] text-white"
              : "hover:text-[#0891B2]"
          }`}
        >
          Contact Us
        </Link>
      </div>

      {/* Tombol Sign Up & Sign In */}
      <div className="flex items-center space-x-3">
        <Link
          href="/register"
          className="px-4 py-2 border border-[#0891B2] text-[#0891B2] rounded transition"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 bg-[#0891B2] text-white rounded transition"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
