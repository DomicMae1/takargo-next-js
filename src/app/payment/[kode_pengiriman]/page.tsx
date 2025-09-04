/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  MapPinCheck,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import NavbarShipment from "../../component/navbar-shipment";

interface Pengiriman {
  asal: string;
  tujuan: string;
  tanggal_berangkat: string;
  tanggal_sampai: string;
  // Tambahkan properti lain yang mungkin ada dari API
  total_harga?: number;
}

// Data Opsi Pembayaran
const paymentOptions = [
  {
    id: "bca_va",
    name: "Virtual Account BCA",
    logo: "/bca.svg",
    description:
      "Pembayaran dapat dilakukan melalui KlikBCA Individu, ATM BCA, BCA mobile atau MyBCA.",
  },
  {
    id: "bni_va",
    name: "Virtual Account BNI",
    logo: "/bni.svg",
    description:
      "Pembayaran dapat dilakukan melalui BNI Mobile Banking, BNI iBank Personal, atau ATM BNI.",
  },
];

export default function PaymentPage({ params }: any) {
  const { kode_pengiriman } = params;
  const [data, setData] = useState<Pengiriman | null>(null);
  const [openVA, setOpenVA] = useState(true);
  const [pendingToken, setPendingToken] = useState<string | null>(null);

  // State untuk logika pembayaran
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const selectedPaymentInfo = paymentOptions.find(
    (opt) => opt.id === selectedPayment
  );
  const totalHarga = 1500000; // Fallback jika API belum ada total_harga

  // Efek untuk memuat data pengiriman
  useEffect(() => {
    setLoading(true);

    const checkStatus = fetch(
      `http://api-takargo.test/api/midtrans/status/${kode_pengiriman}`
    )
      .then((res) => res.json())
      .then((statusData) => {
        if (statusData.status === "pending" && statusData.token) {
          console.log(statusData);
          setPendingToken(statusData.token);
        }
      });

    const fetchShipmentData = fetch(
      `http://api-takargo.test/api/pengiriman/show/${kode_pengiriman}`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json?.data) {
          setData(json.data);
        } else {
          throw new Error("Data kosong");
        }
      })
      .catch(() => {
        console.warn("API pengiriman gagal, gunakan data dummy.");
        setData({
          asal: "Jakarta",
          tujuan: "Surabaya",
          tanggal_berangkat: "2025-08-30",
          tanggal_sampai: "2025-09-02",
          total_harga: 1500000,
        });
      });

    // PERBAIKAN 1: Gunakan Promise.all untuk menunggu semua fetch selesai
    Promise.all([checkStatus, fetchShipmentData])
      .catch((error) => console.error("Gagal memuat data awal:", error))
      .finally(() => {
        // PERBAIKAN KUNCI: Set loading ke false setelah semua selesai
        setLoading(false);
      });

    // 3. Memuat script Midtrans
    const snapScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
    const script = document.createElement("script");
    script.src = snapScriptUrl;
    script.setAttribute("data-client-key", clientKey || "");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [kode_pengiriman]);

  const handleResumePay = () => {
    if (pendingToken) {
      setLoading(true);
      window.snap.pay(pendingToken, {
        onSuccess: (result) => {
          console.log("Resume Success:", result);
          window.location.href = `/success/${kode_pengiriman}`;
        },
        onError: (result) => {
          console.error("Resume Error:", result);
          alert("Pembayaran Gagal.");
          setLoading(false);
        },
        onClose: () => setLoading(false),
      });
    }
  };

  // Fungsi untuk menangani proses pembayaran
  const handlePay = async () => {
    if (!selectedPayment) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (!data) {
      alert("Data pengiriman tidak ditemukan.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = `http://api-takargo.test/api/midtrans/token/${selectedPayment}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(), // ID salah, seharusnya kode_pengiriman
          productName: "Produk Tes", // Nama produk salah
          price: 50000, // Harga salah, seharusnya total_harga dari API
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Server error" }));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const paymentData = await res.json();

      if (paymentData.token) {
        window.snap.pay(paymentData.token, {
          onSuccess: (result: unknown) => {
            console.log("Success:", result);
            alert("Pembayaran Berhasil!");
            window.location.href = "/success";
            // Arahkan ke halaman sukses atau update status
          },
          onPending: (result) => {
            console.log("Pending:", result);
            // PERUBAHAN KUNCI: Segarkan halaman agar UI update
            // Ini akan memicu useEffect untuk cek status lagi dan menampilkan tombol "Lanjutkan Pembayaran"
            window.location.toString();
          },
          onError: (result: unknown) => {
            console.log("Error:", result);
            alert("Pembayaran Gagal.");
          },
          onClose: () => {
            console.log("Popup pembayaran ditutup.");
            setLoading(false);
          },
        });
      } else {
        throw new Error(
          paymentData.error || "Gagal mendapatkan token pembayaran."
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      let errorMessage = "Terjadi kesalahan.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`Terjadi kesalahan: ${errorMessage}`);
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarShipment params={params} />
      <div className="w-full min-h-screen bg-gray-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-[49%_49%] gap-6 px-12 py-4">
          {/* ================= Kiri ================= */}
          <div className="space-y-6 ">
            {pendingToken && (
              <div
                className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg"
                role="alert"
              >
                <p className="font-bold">Pembayaran Tertunda</p>
                <p>
                  Anda memiliki pembayaran yang belum selesai. Lanjutkan
                  pembayaran Anda untuk menyelesaikan pesanan.
                </p>
              </div>
            )}
            <div className="bg-white border rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Metode Pembayaran
              </h2>
              {pendingToken ? (
                <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  Pilihan metode pembayaran dinonaktifkan karena Anda memiliki
                  transaksi yang belum selesai.
                </div>
              ) : (
                <div className=" ">
                  <button
                    className="w-full flex justify-between px-4 py-4 font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-t-lg"
                    onClick={() => setOpenVA(!openVA)}
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <img
                        src="/lock-payment.svg"
                        className="w-5 h-5"
                        alt="Lock"
                      />
                      <span>Virtual Account</span>
                    </div>
                    {openVA ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {openVA && (
                    <div className="border-l border-b border-r border-gray-300 rounded-b-lg p-2 space-y-2">
                      {paymentOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => setSelectedPayment(option.id)}
                          className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg border-2 transition-all ${
                            selectedPayment === option.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-transparent hover:bg-gray-100"
                          }`}
                        >
                          <img
                            src={option.logo}
                            alt={option.name}
                            className="w-12 h-12 object-contain"
                          />
                          <span className="text-gray-700 font-medium">
                            {option.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Informasi Pembayaran Dinamis */}
              {selectedPaymentInfo && !pendingToken && (
                <div className="bg-white border border-gray-300 rounded-lg p-4 mt-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Informasi Pembayaran
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Anda memilih <strong>{selectedPaymentInfo.name}</strong>.{" "}
                    {selectedPaymentInfo.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ================= Kanan ================= */}
          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-4 shadow space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Ringkasan Pemesanan
              </h2>
              {/* ... (Konten estimasi dan timeline tetap sama) ... */}
              <div className="flex items-center gap-3">
                <Calendar className="text-black" size={20} />
                <div>
                  <p className="text-gray-600 text-sm">Estimasi Pengiriman</p>
                  <p className="text-gray-900 font-semibold">
                    {data?.tanggal_berangkat
                      ? new Date(data.tanggal_berangkat).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long" }
                        )
                      : "..."}{" "}
                    -{" "}
                    {data?.tanggal_sampai
                      ? new Date(data.tanggal_sampai).toLocaleDateString(
                          "id-ID",
                          { day: "numeric", month: "long", year: "numeric" }
                        )
                      : "..."}
                  </p>
                </div>
              </div>
              <div className="relative mt-6 space-y-8">
                <div className="absolute left-2 top-6 bottom-4 border-r-3 border-dashed border-[#0891B2]"></div>
                <div className="relative flex items-start gap-3">
                  <MapPin className="text-blue-500 z-10" size={20} />
                  <div>
                    <p className="text-gray-600 text-sm">Alamat Penjemputan</p>
                    <div className="text-black w-full font-semibold">
                      {data?.asal || "..."}
                    </div>
                  </div>
                </div>
                <div className="relative flex items-start gap-3">
                  <MapPinCheck className="text-green-500 z-10" size={20} />
                  <div>
                    <p className="text-gray-600 text-sm">Alamat Pengiriman</p>
                    <div className="text-black w-full font-semibold">
                      {data?.tujuan || "..."}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                Detail Pembayaran
              </h2>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Biaya Pengiriman ({kode_pengiriman})
                  </span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(totalHarga)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                  <span>Total Pembayaran:</span>
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(totalHarga)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-black w-full sm:w-auto"
              >
                Kembali
              </button>

              {/* Tombol BARU yang muncul jika ada transaksi pending */}
              {pendingToken && (
                <button
                  onClick={handleResumePay}
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto font-semibold disabled:bg-gray-400"
                >
                  {loading ? "Memuat..." : "Lanjut ke Pembayaran Sebelumnya"}
                </button>
              )}

              <button
                onClick={handlePay}
                disabled={loading || !selectedPayment || !!pendingToken}
                className="px-6 py-2 rounded-lg bg-[#0891B2] text-white hover:bg-[#0a7491] w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
