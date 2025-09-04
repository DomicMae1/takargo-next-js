/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Navbar from "../component/navbar";

export default function HomePage() {
  const [activeForm, setActiveForm] = useState("biaya");

  return (
    <>
      <Navbar />
      <div>
        {/* ================= Halaman 1 ================= */}
        <section className="min-h-[70vh] flex items-center justify-center bg-[#ECFEFF]">
          <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-8 items-start w-full">
            {/* Kolom 1 (Teks + Form) */}
            <div className="mt-24 py-8 pl-32 pr-28">
              <h1 className="text-4xl font-bold text-[#334155] leading-snug">
                Kami Mengirimkan Setiap <br />
                Pengiriman dengan Cepat, Aman, dan Terpercaya
              </h1>
              <p className="mt-3 text-lg text-gray-600 mb-6">
                Kami mempermudah pengelolaan pengiriman Cargo LCL Anda secara
                online. Mulai dari mencari biaya, melakukan pemesanan, hingga
                melacak kargo Anda.
              </p>

              {/* Tabs Form */}
              <div className="bg-white border border-gray-300 rounded-xl pt-8 pb-8 pl-8 pr-12">
                <div className="flex gap-3">
                  <button
                    className={`font-semibold ${
                      activeForm === "resi"
                        ? "text-[#0891B2]"
                        : "text-[#334155]"
                    }`}
                    onClick={() => setActiveForm("resi")}
                  >
                    <p
                      className={`inline-block border-b-2 ${
                        activeForm === "resi"
                          ? "border-[#0891B2]"
                          : "border-transparent"
                      }`}
                    >
                      Cek Resi Pengiriman
                    </p>
                  </button>

                  <button
                    className={`font-semibold px-5 ${
                      activeForm === "biaya"
                        ? "text-[#0891B2]"
                        : "text-[#334155]"
                    }`}
                    onClick={() => setActiveForm("biaya")}
                  >
                    <p
                      className={`inline-block border-b-2 ${
                        activeForm === "biaya"
                          ? "border-[#0891B2]"
                          : "border-transparent"
                      }`}
                    >
                      Cek Biaya Pengiriman
                    </p>
                  </button>
                </div>

                {/* Form Resi */}
                {activeForm === "resi" && (
                  <div className="mt-6">
                    <div className="grid grid-cols-[80%_20%] gap-3">
                      <input
                        type="text"
                        placeholder="Masukkan nomor resi"
                        className="w-full rounded-full px-4 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      />
                      <button className="bg-[#0891B2] text-white font-base py-2 rounded-full flex items-center justify-center gap-2">
                        <span>Cek Resi</span>
                        <CircleArrowRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Form Biaya */}
                {activeForm === "biaya" && (
                  <div className="mt-6">
                    <div className="grid grid-cols-[40%_40%_20%] gap-3">
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0891B2]" />
                        <input
                          type="text"
                          placeholder="Alamat Awal"
                          className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                      </div>

                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0891B2]" />
                        <input
                          type="text"
                          placeholder="Alamat Tujuan"
                          className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                      </div>

                      <button className="bg-[#0891B2] text-white font-base py-2 rounded-full flex items-center justify-center gap-2">
                        <span>Cek Biaya</span>
                        <CircleArrowRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Kolom 2 (Gambar) */}
            <div className="flex justify-start items-end">
              <Image
                src="/bg-index.svg"
                alt="Ilustrasi Pengiriman"
                width={400}
                height={400}
                className="w-[90%] max-w-md"
              />
            </div>
          </div>
        </section>

        {/* ================= Halaman 2 ================= */}
        <section className="min-h-screen flex items-center justify-center bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto px-8 md:px-32">
            {/* Kolom 1 */}
            <div>
              <h2 className="text-2xl text-[#334155] mb-4">
                Kenapa Memilih Kami?
              </h2>
              <h3 className="text-4xl md:text-6xl font-semibold text-[#334155] mb-4">
                Your Trusted Partner in Global Shipping
              </h3>
              <p className="text-gray-600 leading-relaxed mt-12 md:mt-48">
                Navigating the complexities of global cargo shipping shouldn’t
                hold your business back. We offer a suite of services designed
                to simplify your shipping experience.
              </p>
            </div>

            {/* Kolom 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Kotak 1 */}
              <div className="bg-[#0891B2] p-6 rounded-xl shadow-sm text-white flex flex-col justify-end min-h-[250px] hover:scale-105 transition-transform duration-300">
                <h4 className="text-lg font-semibold mb-2">Efisiensi</h4>
                <p className="text-sm">
                  Get transparent pricing and access exclusive discounts for
                  frequent shippers.
                </p>
              </div>

              {/* Kotak 2 */}
              <div className="bg-white p-6 rounded-xl shadow-sm text-black flex flex-col justify-end min-h-[250px] border border-gray-200 hover:shadow-lg transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Aman</h4>
                <p className="text-sm">
                  Your shipments are secure with our reliable logistics system.
                </p>
              </div>

              {/* Kotak 3 */}
              <div className="bg-white p-6 rounded-xl shadow-sm text-black flex flex-col justify-end min-h-[250px] border border-gray-200 hover:shadow-lg transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Terjangkau</h4>
                <p className="text-sm">
                  Track your shipments in real time with full visibility.
                </p>
              </div>

              {/* Kotak 4 */}
              <div className="bg-white p-6 rounded-xl shadow-sm text-black flex flex-col justify-end min-h-[250px] border border-gray-200 hover:shadow-lg transition duration-300">
                <h4 className="text-lg font-semibold mb-2">Mudah</h4>
                <p className="text-sm">
                  Get 24/7 customer support whenever you need assistance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Halaman 3 ================= */}
        <section className="relative min-h-screen flex items-center justify-center bg-[#0891B2]">
          {/* Konten */}
          <div className="relative grid grid-rows-1 md:grid-rows-3 px-8 md:px-32 z-10 items-center">
            {/* Kolom 1 (Judul + Deskripsi) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <h2 className="text-4xl md:text-6xl font-bold text-white flex items-center">
                Layanan Kami
              </h2>
              <p className="text-gray-100 text-lg md:text-xl leading-relaxed">
                Libero molestiae convallis rem quam fugiat vivamus deserunt
                neque. Odit pellentesque laboriosam, vivamus sagittis aliquid.
                Libero molestiae convallis rem quam fugiat vivamus deserunt
                neque. Odit pellentesque laboriosam, vivamus sagittis aliquid.
              </p>
            </div>

            {/* Kolom 2 (Kotak 1 & 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Kotak 1 */}
              <div className="bg-[#0891B2] p-6 rounded-xl shadow-md text-white hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-12">
                  <div className="font-semibold text-4xl">01</div>
                  <ArrowUpRight className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-3">
                  Door to Door
                </h3>
                <p className="text-gray-100 text-base leading-relaxed">
                  Jenis layanan oleh jasa pengiriman barang atau layanan
                  logistik yang memungkinkan kurir untuk menjemput barang
                  kiriman di depan pintu rumah customer dan mengantarnya hingga
                  ke depan pintu rumah penerima paket.
                </p>
              </div>

              {/* Kotak 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md text-black border border-gray-200 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-12">
                  <div className="text-[#0891B2] font-semibold text-4xl">
                    02
                  </div>
                  <ArrowUpRight className="w-12 h-12 text-[#0891B2]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-3 text-[#0891B2]">
                  Door to Port
                </h3>
                <p className="text-[#0891B2] text-base leading-relaxed">
                  Layanan Logistik yang memungkinkan kurir untuk menjemput
                  barang di depan pintu rumah customer dan mengantarnya hingga
                  ke kantor logistik di daerah tujuan. Jasa ini memberi
                  kemudahan pada pengirim barang.
                </p>
              </div>
            </div>

            {/* Kolom 3 (Kotak 3 & 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
              {/* Kotak 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md text-black border border-gray-200 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-12">
                  <div className="text-[#0891B2] font-semibold text-4xl">
                    03
                  </div>
                  <ArrowUpRight className="w-12 h-12 text-[#0891B2]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-3 text-[#0891B2]">
                  Port to Door
                </h3>
                <p className="text-[#0891B2] text-base leading-relaxed">
                  Layanan logistik yang memungkinkan kurir untuk menjemput
                  barang kiriman di depan pintu rumah customer dan mengantarnya
                  hingga ke depan pintu rumah penerima paket. Jasa pengiriman
                  barang ini memberi kemudahan pada penerima barang.
                </p>
              </div>

              {/* Kotak 4 */}
              <div className="bg-white p-6 rounded-xl shadow-md text-black border border-gray-200 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-12">
                  <div className="text-[#0891B2] font-semibold text-4xl">
                    04
                  </div>
                  <ArrowUpRight className="w-12 h-12 text-[#0891B2]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-semibold mb-3 text-[#0891B2]">
                  Port to Port
                </h3>
                <p className="text-[#0891B2] text-base leading-relaxed">
                  Layanan logistik dimana kurir tidak menjemput, namun Customer
                  sendiri yang mengantarkannya ke kantor jasa pengiriman atau
                  ekspedisi. Begitu juga dengan penerima barang yang akan
                  menjemput sendiri dari gudang atau pelabuhan logistik.
                </p>
              </div>
            </div>
          </div>

          {/* Background Gambar */}
          <div className="absolute inset-0">
            <img
              src="/bg-layanan.svg"
              alt="Background Layanan"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </section>

        <section className="min-h-screen flex flex-col justify-center bg-white">
          <div className="grid-rows-2">
            {/* Bagian 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 mt-20">
              {/* Kolom Kiri (SVG/Gambar) */}
              <div className="flex items-center justify-center">
                <img
                  src="/mockup.svg"
                  className="w-full max-w-xs h-auto"
                  alt="Mockup"
                />
              </div>

              {/* Kolom Kanan (Teks) */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-semibold text-[#334155] mb-6 leading-snug">
                  You can Track your Package Quickly
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                  By using the{" "}
                  <span className="text-[#64748B] font-semibold">Takargo</span>{" "}
                  mobile application, you can track your package quickly &
                  easily. Whenever and wherever you are.
                </p>
                <div className="flex gap-4 mt-8">
                  <img
                    src="/playstore.svg"
                    className="h-14 w-auto cursor-pointer hover:scale-105 transition"
                    alt="Download on Playstore"
                  />
                  <img
                    src="/appstore.svg"
                    className="h-14 w-auto cursor-pointer hover:scale-105 transition"
                    alt="Download on Appstore"
                  />
                </div>
              </div>
            </div>

            {/* Bagian 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6 mt-20 mb-20">
              {/* Kolom Kanan (Teks) */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl md:text-6xl font-semibold text-[#334155] mb-6 leading-snug">
                  Manage your Delivery Everywhere
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                  You can view, manage, track, all your shipments easily and
                  quickly by using the Takargo Dashboard Management
                </p>
                <div className="flex gap-4 mt-8">
                  <button className="px-6 py-3 bg-[#0891B2] text-white font-semibold rounded-xl shadow-md hover:bg-[#0e7490] transition">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Kolom Kiri (SVG/Gambar) */}
              <div className="flex items-center justify-center">
                <img
                  src="/monitor.svg"
                  className="w-full max-w-md h-auto"
                  alt="Monitor Dashboard"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative min-h-screen flex flex-col items-center text-center bg-white">
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
