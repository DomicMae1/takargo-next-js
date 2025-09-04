/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, User, Lock, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Navbar from "../component/navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk toggle password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validasi password dan konfirmasi password
    if (password !== confirmPassword) {
      alert("Password dan Konfirmasi Password tidak sama!");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://api-takargo.test/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: no_telp,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.access_token);
      router.push("/dashboard"); // redirect setelah login
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan, silakan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <div className="pl-12 pr-12">
          <Navbar />
        </div>
        <div className="flex items-center justify-center min-h-screen w-full bg-[#FAFAFA] text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl overflow-hidden">
            <div className="flex items-center justify-center">
              <img
                src="/background-login.svg"
                alt=""
                className="max-w-full h-auto object-contain"
              />
            </div>
            <div className="p-8">
              <div className="w-full ">
                {/* Judul */}
                <h2 className="text-2xl font-semibold mb-2 text-center text-gray-600 mt-6">
                  Sign Up TAKARGO
                </h2>
                <p className="text-center text-sm mb-8 text-gray-600">
                  Masukkan Email Anda di bawah ini untuk membuat akun
                </p>

                {/* Form Login */}
                <form onSubmit={handleLogin}>
                  {error && (
                    <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                      {error}
                    </div>
                  )}

                  {/* Nama Lengkap & Email dalam 2 kolom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Input Nama Lengkap */}
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium">
                        Nama Lengkap
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="relative bg-white">
                        <input
                          type="text"
                          placeholder="Nama Lengkap"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border-gray-300 border px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                          required
                        />
                      </div>
                    </div>

                    {/* Input Email */}
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium">
                        Email
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="relative bg-white">
                        <input
                          type="email"
                          placeholder="Alamat Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border-gray-300 border px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nomor Telepon & Tombol Centang */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Input Nomor Telepon */}
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium">
                        Nomor Telepon
                        <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <PhoneInput
                          defaultCountry="id"
                          value={no_telp}
                          onChange={(value) => setNoTelp(value || "")}
                          placeholder="Nomor Telepon"
                          className="w-fulltext-sm"
                        />
                      </div>
                    </div>

                    {/* Checkbox dengan teks tambahan */}
                    <div className="flex ">
                      <div className="mt-3 flex items-center justify-center">
                        <input
                          id="terms"
                          type="checkbox"
                          className="w-4 h-4  border-gray-300 rounded focus:ring-white"
                          required
                        />
                      </div>

                      <div className="flex items-center justify-center mt-4">
                        <label
                          htmlFor="terms"
                          className="ml-2 text-sm text-gray-700 flex items-center"
                        >
                          Nomor Tersedia di{" "}
                          <a className="mx-1">
                            <img
                              src="/whatsapp-logo.svg"
                              alt="WhatsApp"
                              width={24}
                              height={24}
                              className="inline-block"
                            />
                          </a>
                          WhatsApp
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Input Password */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Kata Sandi
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="relative bg-white">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan Kata Sandi Anda"
                        className="w-full border-gray-300 border px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
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

                  {/* Input Confirmation Password */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium">
                      Konfirmasi Kata Sandi
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="relative bg-white">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Masukkan Ulang Kata Sandi Anda"
                        className="w-full border border-gray-300 px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white text-sm"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
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
                    disabled={loading}
                    className="mb-4 flex items-center justify-center gap-2 w-full bg-[#0891B2] text-white py-2 rounded"
                  >
                    <Mail />
                    {loading ? "Mendaftarkan..." : "Konfirmasi Buat Akun"}
                  </button>

                  {/* Checkbox dengan teks tambahan */}
                  <div className="flex items-center mt-8 mb-4">
                    <label
                      htmlFor="terms"
                      className="text-sm text-center text-gray-700"
                    >
                      Dengan memilih tombol ini, Anda menyetujui{" "}
                      <a href="/syarat" className="text-[#0891B2] underline">
                        Syarat dan Ketentuan
                      </a>{" "}
                      serta{" "}
                      <a href="/kebijakan" className="text-[#0891B2] underline">
                        Kebijakan Privasi
                      </a>{" "}
                      Takargo
                    </label>
                  </div>

                  {/* Link tambahan */}
                  <div className="flex justify-center text-sm mt-4">
                    <Link
                      href="/login"
                      className="text-gray-500 underline text-center"
                    >
                      Sudah mempunyai akun?
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
