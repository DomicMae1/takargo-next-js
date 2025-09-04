/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, CircleArrowRight } from "lucide-react";
import Image from "next/image";
import Navbar from "../component/navbar";

export default function HomePage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen text-black">
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
              <h1 className="text-6xl font-semibold">Contact Us</h1>
              <p className="text-3xl mt-2 font-normal">
                Hubungi kami untuk mendapatkan informasi lebih lanjut terkait
                berbagai jasa pengiriman logistik yang disediakan oleh Takargo
              </p>
            </div>
          </div>

          {/* ================== Row Kontak & Form ================== */}
          <div className="relative w-full px-24 py-32 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Kolom 1: Informasi Kontak */}
            <div className="space-y-6">
              <h2 className="text-4xl font-semibold text-gray-900 mb-4">
                How can we help you?
              </h2>
              <p className="text-lg text-gray-500">
                Silakan hubungi kami melalui email, WhatsApp, atau datang
                langsung ke kantor kami.
              </p>

              <div className="flex items-start gap-3">
                <img src="/mail.svg" alt="mail" className="w-12 h-12" />
                <p className="text-sm">
                  <strong>Email Support</strong>
                  <br />
                  Email us and we’ll get back to you within 24 hours
                  <br />
                  hi@takargo.com
                </p>
              </div>

              <div className="flex items-center gap-3">
                <img src="/whatsapp.svg" alt="whatsapp" className="w-12 h-12" />
                <p className="text-sm">
                  <strong>Whatsapp Support</strong>
                  <br />
                  Chat on Whatsapp and we’ll get back to you within 24 hours
                  <br />
                  +62 81 280 578 717
                </p>
              </div>

              <div className="flex gap-3">
                <img src="/maps.svg" alt="maps" className="w-12 h-12" />
                <p className="text-sm">
                  <strong>Visit Us</strong>
                  <br />
                  Visit our office Mon - Fri, 09:00 - 16.00 WIB
                  <br />
                  Jl. Perak Bar. No.69, RT.002/RW.12, Perak Bar., Kec.
                  Krembangan, Surabaya, Jawa Timur 60177
                </p>
              </div>
            </div>

            {/* Kolom 2: Form Kontak */}
            <div className="bg-[#F1F5F9] p-8 rounded-lg">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                Contact our team
              </h2>
              <form className="space-y-4">
                {/* Nama & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kolom Nama */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium mb-1 text-gray-700"
                    >
                      Nama
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Masukkan Nama"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                    />
                  </div>

                  {/* Kolom Email */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium mb-1 text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Masukkan Email"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium mb-1 text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Masukkan Subject"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium mb-1 text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Masukkan Message"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2] resize-none h-32"
                  />
                </div>

                {/* Tombol */}
                <button
                  type="submit"
                  className="bg-[#0891B2] w-full text-white px-6 py-3 rounded-md hover:bg-[#067A9C] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
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
