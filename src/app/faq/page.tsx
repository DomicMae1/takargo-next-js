/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Navbar from "../component/navbar";

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* ================= Halaman 1 ================= */}
        <section className="relative min-h-screen bg-white">
          {/* ================== Row 1 ================== */}
          <div className="relative w-full h-[300px] flex items-center px-24">
            {/* Background */}
            <div
              className="absolute top-0 left-0 w-full h-[300px] bg-no-repeat bg-top bg-cover"
              style={{ backgroundImage: "url('/about-background.svg')" }}
            />

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-[300px] bg-[#0891B2] opacity-80" />

            {/* Judul */}
            <div className="relative z-10 text-left text-white">
              <h1 className="text-6xl font-semibold">FAQ</h1>
              <p className="text-3xl mt-2 font-normal">
                Hubungi kami untuk mendapatkan informasi lebih lanjut terkait
                berbagai jasa pengiriman logistik yang disediakan oleh Takargo
              </p>
            </div>
          </div>

          {/* ================== Row 2 ================== */}
          <div className="relative w-full px-24 pt-32 pb-18 space-y-4 text-center">
            <h2 className="text-6xl font-semibold text-gray-900 mb-8">
              How can we help you?
            </h2>
            <p className="text-2xl text-gray-500 mx-auto leading-relaxed max-w-5xl">
              Silakan lihat pertanyaan umum berikut atau hubungi kami untuk info
              lebih lanjut.
            </p>
          </div>

          {/* ================== Row 3 (Accordion Lengkap) ================== */}
          <div className="relative w-full px-24">
            <div className="space-y-4 text-left">
              {/* Pertanyaan 1 */}
              <div className="border border-gray-300 rounded-2xl bg-gray-50">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-2xl font-semibold text-[#334155] hover:bg-gray-100 transition"
                  onClick={() => setOpenQuestion(openQuestion === 1 ? null : 1)}
                >
                  Bagaimana Alur pengiriman di Takargo?
                  <span
                    className={`transition-transform ${
                      openQuestion === 1 ? "rotate-180" : ""
                    }`}
                  >
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </span>
                </button>
                {openQuestion === 1 && (
                  <div className="px-6 pb-4 text-gray-600 text-base">
                    Kami menyediakan alur pengiriman yang mudah dipahami dan
                    transparan, mulai dari pickup barang hingga sampai ke
                    tujuan.
                  </div>
                )}
              </div>

              {/* Pertanyaan 2 */}
              <div className="border border-gray-300 rounded-2xl bg-gray-50">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-2xl font-semibold text-[#334155] hover:bg-gray-100 transition"
                  onClick={() => setOpenQuestion(openQuestion === 2 ? null : 2)}
                >
                  Minimal Pengiriman berapa?
                  <span
                    className={`transition-transform ${
                      openQuestion === 2 ? "rotate-180" : ""
                    }`}
                  >
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </span>
                </button>
                {openQuestion === 2 && (
                  <div className="px-6 pb-4 text-gray-600 text-base">
                    Tidak ada batasan minimum untuk pengiriman LCL, namun untuk
                    layanan tertentu dapat disesuaikan dengan kebutuhan
                    pelanggan.
                  </div>
                )}
              </div>

              {/* Pertanyaan 3 */}
              <div className="border border-gray-300 rounded-2xl bg-gray-50">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-2xl font-semibold text-[#334155] hover:bg-gray-100 transition"
                  onClick={() => setOpenQuestion(openQuestion === 3 ? null : 3)}
                >
                  Apakah Takargo Memiliki Asuransi Pengiriman?
                  <span
                    className={`transition-transform ${
                      openQuestion === 3 ? "rotate-180" : ""
                    }`}
                  >
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </span>
                </button>
                {openQuestion === 3 && (
                  <div className="px-6 pb-4 text-gray-600 text-base">
                    Ya, semua pengiriman dilengkapi asuransi untuk memastikan
                    keamanan barang selama perjalanan.
                  </div>
                )}
              </div>

              {/* Pertanyaan 4 */}
              <div className="border border-gray-300 rounded-2xl bg-gray-50">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-2xl font-semibold text-[#334155] hover:bg-gray-100 transition "
                  onClick={() => setOpenQuestion(openQuestion === 4 ? null : 4)}
                >
                  Bagaimana melakukan pembayaran biaya?
                  <span
                    className={`transition-transform ${
                      openQuestion === 4 ? "rotate-180" : ""
                    }`}
                  >
                    <ArrowUpRight className="w-6 h-6 text-[#0891B2]" />
                  </span>
                </button>
                {openQuestion === 4 && (
                  <div className="px-6 pb-4 text-gray-600 text-base">
                    Pembayaran dapat dilakukan melalui transfer bank, e-wallet,
                    atau metode yang telah disediakan pada saat pemesanan.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col items-center text-center bg-white">
          {/* Row 1: Background Atas */}
          <div className="w-full h-56 relative">
            <img
              src="/keterangan-index.svg"
              className="w-full h-full object-cover opacity-100"
              alt="Keterangan Background"
            />

            {/* Overlay biru + ikon dan teks */}
            <div className="absolute inset-0 bg-[#0891B2]/75 flex items-center justify-center px-12">
              <div className="flex items-center justify-between w-full px-24">
                {/* Truck */}
                <div className="flex flex-col items-center">
                  <img
                    src="/truck.svg"
                    alt="Truck"
                    className="h-16 w-16 mb-2"
                  />
                  <span className="text-white text-lg font-medium text-center">
                    Pengiriman 1 Hari
                    <br /> untuk Pulau Jawa
                  </span>
                </div>

                {/* Phone */}
                <div className="flex flex-col items-center">
                  <img
                    src="/phone.svg"
                    alt="Phone"
                    className="h-16 w-16 mb-2"
                  />
                  <span className="text-white text-lg font-medium text-center">
                    Cek Tracking
                    <br /> 24/7 Online
                  </span>
                </div>

                {/* Security */}
                <div className="flex flex-col items-center">
                  <img
                    src="/security.svg"
                    alt="Security"
                    className="h-16 w-16 mb-2"
                  />
                  <span className="text-white text-lg font-medium text-center">
                    Garansi Kerusakan
                    <br /> Barang
                  </span>
                </div>

                {/* Assurance */}
                <div className="flex flex-col items-center">
                  <img
                    src="/asurance.svg"
                    alt="Assurance"
                    className="h-16 w-16 mb-2"
                  />
                  <span className="text-white text-lg font-medium text-center">
                    Include Asuransi
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Konten Tengah (teks) */}
          <div className="flex-1 w-full flex flex-col justify-end items-center relative mt-12">
            <div className="relative z-10 px-6">
              <h1 className="text-7xl font-semibold text-[#334155] leading-tight mb-8">
                Siap Memperlancar
                <br />
                Pengiriman Anda?
              </h1>
            </div>
          </div>

          {/* Row 3: Konten Tengah (tombol) */}
          <div className="flex-1 w-full flex flex-col justify-start items-center relative mb-12 ">
            <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-center">
              <div className="flex items-center justify-center">
                <button className="px-8 py-3 bg-[#0891B2] text-2xl text-white rounded-full transition flex items-center justify-center gap-2 hover:bg-[#0a6e86]">
                  <span>Pesan Sekarang</span>
                  <CircleArrowRight className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex items-center justify-center">
                <button className="px-8 py-3 bg-white text-2xl text-[#334155] rounded-full transition flex items-center justify-center gap-2 hover:bg-gray-200">
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Background Konten Tengah (opsional) */}
          <div className="absolute inset-0 mt-56">
            <img
              src="/home-index.svg"
              className="w-full h-full object-cover opacity-20"
              alt="Background Home"
            />
          </div>
        </section>

        <footer className="bg-[#0891B2] text-white py-10 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Kiri: Logo + kata + Playstore */}
            <div className="flex flex-col gap-4 items-center md:items-start">
              <img
                src="/takargo-logo-white.svg"
                alt="Logo"
                className="h-12 w-auto"
              />
              <p className="text-sm">
                Libero molestiae convallis rem quam fugiat vivamus deserunt
                neque. Odit pellentesque laboriosam, vivamus sagittis aliquid.
              </p>
              <div className="flex gap-2">
                <img
                  src="/playstore.svg"
                  alt="Playstore"
                  className="h-10 w-auto cursor-pointer hover:opacity-80"
                />
                <img
                  src="/appstore.svg"
                  alt="Appstore"
                  className="h-10 w-auto cursor-pointer hover:opacity-80"
                />
              </div>
            </div>

            {/* Tengah: Produk Layanan */}
            <div className="flex flex-col gap-3 items-start px-12">
              <h3 className="font-semibold text-lg">Produk & Layanan</h3>
              <div className="flex gap-6">
                <ul className="space-y-2 text-sm">
                  <li>Door to Door</li>
                  <li>Door to Port</li>
                  <li>Port to Door</li>
                  <li>Port to Port</li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li>Cek Biaya Kirim</li>
                  <li>Cek Resi Kirim</li>
                </ul>
              </div>
            </div>

            {/* Kanan: Kontak Kami */}
            <div className="flex flex-col gap-3 items-center md:items-start">
              <h3 className="font-semibold text-lg">Kontak Kami</h3>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <p className="text-sm">xyz_company@example.com</p>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/whatsapp-vector.svg"
                  className="w-4 h-4"
                  alt="WhatsApp"
                />
                <p className="text-sm">+62 8128 0578 717</p>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5" />
                <p className="text-sm">
                  Jl. Perak Bar. No.110 Perak Barat, Kec. Krembangan, Surabaya,
                  Jawa Timur 60177
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-4 text-center text-sm text-white/80 border-white/20">
            Copyright © 2025 PT. Takargo. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
