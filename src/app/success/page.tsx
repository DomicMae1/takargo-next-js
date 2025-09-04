/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import NavbarShipment from "../component/navbar-shipment";

// Interface untuk data pengiriman, sesuaikan dengan respons API Anda
interface ItemDetail {
  nama: string;
  deskripsi: string;
  harga: number;
}

interface PengirimanData {
  email_pelanggan: string;
  metode_pembayaran: string;
  status_pembayaran: string;
  kode_invoice: string;
  nomor_va: string;
  items: ItemDetail[];
  total_keseluruhan: number;
}

export default function PaymentPage({ params }: any) {
  const { kode_pengiriman } = params;
  const [data, setData] = useState<PengirimanData | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Efek untuk memuat data pengiriman/transaksi yang sudah berhasil
  useEffect(() => {
    fetch(`http://api-takargo.test/api/transaksi/show/${kode_pengiriman}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((err) => console.error("Gagal memuat data transaksi:", err));
  }, [kode_pengiriman]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatCurrency = (amount: number) => {
    if (typeof amount !== "number") return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {/* PERBAIKAN: Memberikan objek 'params' yang benar */}
      <NavbarShipment params={params} />

      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl border border-gray-200 p-8 space-y-6">
          {/* --- Header --- */}
          <div className="text-center space-y-4">
            <div className="mx-auto bg-yellow-400 rounded-lg w-20 h-14 flex items-center justify-center relative">
              <div className="w-16 h-1 bg-gray-700 rounded-full absolute top-4"></div>
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center absolute -bottom-3 border-4 border-white">
                <Check size={20} strokeWidth={3} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Terima kasih, Pembayaran Anda telah kami terima
            </h1>
            <p className="text-gray-600">
              Kami telah mengirimkan invoice pemesanan anda melalui email <br />
              <span className="font-semibold text-blue-600">
                {data?.email_pelanggan || "..."}
              </span>
              , silahkan periksa kotak masuk anda untuk mendapatkan rinciannya.
            </p>
          </div>

          {/* --- Detail Transaksi --- */}
          <div className="border border-gray-200 rounded-lg p-5 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <h3 className="font-semibold text-gray-700">
                {data?.metode_pembayaran || "Virtual Account BCA"}
              </h3>
              <img src="/bca.svg" alt="BCA" className="h-5" />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Status Payment</span>
                <span className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {data?.status_pembayaran || "PAID"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Kode Invoice Order</span>
                <span className="font-semibold text-gray-800">
                  {data?.kode_invoice || "#TAKARGO1234567890"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Nomor Virtual Account</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">
                    {data?.nomor_va || "72116596370788700165375"}
                  </span>
                  <button
                    onClick={() => handleCopy(data?.nomor_va || "")}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {isCopied ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t text-sm">
              {data?.items?.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{item.nama}</p>
                    <p className="text-gray-500 text-xs">{item.deskripsi}</p>
                  </div>
                  <span className="text-gray-800">
                    {formatCurrency(item.harga)}
                  </span>
                </div>
              ))}
              {!data && (
                <div className="flex justify-between animate-pulse">
                  <div className="w-1/2 bg-gray-200 h-5 rounded"></div>
                  <div className="w-1/4 bg-gray-200 h-5 rounded"></div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4 border-t font-bold">
              <span className="text-gray-800">Total Keseluruhan</span>
              <span className="text-xl text-blue-600">
                {formatCurrency(data?.total_keseluruhan || 0)}
              </span>
            </div>
          </div>

          {/* --- Tombol Aksi --- */}
          <div className="flex gap-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="w-full text-center py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors border"
            >
              Kembali ke laman awal
            </button>
            <button
              onClick={() =>
                (window.location.href = `/tracking/${kode_pengiriman}`)
              }
              className="w-full text-center py-3 rounded-lg bg-[#0891B2] text-white font-semibold hover:bg-[#0a7491] transition-colors"
            >
              Lihat Pesanan Saya
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
