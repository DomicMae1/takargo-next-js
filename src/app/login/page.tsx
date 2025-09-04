/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, User, Lock, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import Navbar from "../component/navbar";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://api-takargo.test/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.access_token);
      router.push("/dashboard"); // redirect setelah login
    } catch (err) {
      setError("Terjadi kesalahan, silakan coba lagi");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div className="pl-12 pr-12">
          <Navbar />
        </div>

        <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA] text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl overflow-hidden">
            <div className="flex items-center justify-center">
              <img
                src="/background-login.svg"
                alt=""
                className="max-w-full h-auto object-contain"
              />
            </div>
            <div className="p-8 flex items-center justify-center">
              <div className="w-full ">
                {/* Judul */}
                <h2 className="text-2xl font-semibold mb-2 text-center">
                  Sign In TAKARGO
                </h2>
                <p className="text-center text-sm mb-6 text-gray-600">
                  Masukkan Email & Kata Sandi Anda di bawah untuk masuk
                </p>

                {/* Form Login */}
                <form onSubmit={handleLogin}>
                  {error && <div className="mb-4 text-red-500">{error}</div>}

                  {/* Input Email/No HP */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Email atau Alamat Telepon
                      <span className="text-red-600">*</span>
                    </label>

                    <div className="relative bg-white">
                      {/* Ikon di sebelah kiri */}
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />

                      {/* Input */}
                      <input
                        type="text"
                        placeholder="Masukkan Email atau Alamat Telepon Anda"
                        className="w-full border border-gray-400 px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Input Password */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Kata Sandi
                      <span className="text-red-600">*</span>
                    </label>

                    <div className="relative bg-white">
                      {/* Ikon di sebelah kiri */}
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />

                      {/* Input */}
                      <input
                        type={showPassword ? "text" : "password"} // Toggle tipe input
                        placeholder="Masukkan Kata Sandi Anda"
                        className="w-full border border-gray-400 px-10 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      {/* Tombol toggle password */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeClosed size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Tombol Submit */}
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full bg-[#0891B2] text-white py-2 rounded"
                  >
                    <Mail />
                    Konfirmasi Masuk
                  </button>

                  {/* Link tambahan */}
                  <div className="flex justify-between text-sm mt-8">
                    <Link href="/register" className="text-gray-500 underline">
                      Belum mempunyai akun?
                    </Link>
                    <Link
                      href="/forgot-password"
                      className="text-[#0891B2] underline"
                    >
                      Lupa Kata Sandi?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
