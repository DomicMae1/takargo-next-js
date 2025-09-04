/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

const paymentOptions = [
  {
    id: "bca_va",
    name: "BCA Virtual Account",
    logo: "https://midtrans.com/assets/img/logo/payment-channel/bca_va.png",
  },
  {
    id: "bni_va",
    name: "BNI Virtual Account",
    logo: "https://midtrans.com/assets/img/logo/payment-channel/bni_va.png",
  },
  {
    id: "gopay",
    name: "GoPay",
    logo: "https://midtrans.com/assets/img/logo/payment-channel/gopay.png",
  },
  {
    id: "credit_card",
    name: "Kartu Kredit/Debit",
    logo: "https://midtrans.com/assets/img/logo/payment-channel/visa.png",
  },
];

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handlePaySelect = async () => {
    if (!selectedPayment) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      // PERUBAHAN KUNCI: URL API kini dinamis berdasarkan metode pembayaran yang dipilih
      const apiUrl = `http://api-takargo.test/api/midtrans/token/${selectedPayment}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          productName: "Produk Tes",
          price: 50000,
          quantity: 1,
          // 'enabled_payments' sudah dihapus dari sini karena di-handle oleh backend
        }),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Server error" }));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result: unknown) => {
            console.log("Success:", result);
            alert("Pembayaran Berhasil!");
          },
          onPending: (result: unknown) => {
            console.log("Pending:", result);
            alert("Menunggu Pembayaran...");
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
        throw new Error(data.error || "Gagal mendapatkan token pembayaran.");
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

  const handlePay = async () => {
    setLoading(true);
    setPaymentUrl("");
    try {
      const res = await fetch("http://api-takargo.test/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(),
          productName: "Produk Tes",
          price: 50000,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Server error" }));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: (result: unknown) => {
            console.log("Success:", result);
          },
          onPending: (result: unknown) => {
            console.log("Pending:", result);
          },
          onError: (result: unknown) => {
            console.log("Error:", result);
          },
          onClose: () => {
            console.log("Customer closed the popup");
          },
        });
      } else {
        throw new Error(data.error || "Gagal mendapatkan token pembayaran.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      // PERBAIKAN: Lakukan pengecekan tipe sebelum mengakses .message
      let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`Terjadi kesalahan: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkPayment = async () => {
    setLoading(true);
    setPaymentUrl("");

    try {
      const res = await fetch(
        "http://api-takargo.test/api/midtrans/payment-link",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: "ORDER-" + Date.now().toString(),
            name: "Produk Tes", // Endpoint ini butuh 'name'
            price: 50000,
            quantity: 1,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ error: "Server error" }));
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.payment_url) {
        setPaymentUrl(data.payment_url);
      } else {
        throw new Error(
          data.error || "Gagal membuat link pembayaran. Respons tidak valid."
        );
      }
    } catch (error) {
      console.error("Payment link error:", error);
      // PERBAIKAN: Lakukan pengecekan tipe sebelum mengakses .message
      let errorMessage = "Terjadi kesalahan yang tidak diketahui.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(`Terjadi kesalahan: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="p-6 max-w-md mx-auto space-y-4 font-sans bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Checkout Produk
        </h1>
        <div className="p-4 border rounded-md bg-gray-50 text-black">
          <p>
            <span className="font-semibold">Nama Produk:</span> Produk Tes
          </p>
          <p>
            <span className="font-semibold">Harga:</span> Rp 50.000
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Pilih Metode Pembayaran
          </h2>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPayment(option.id)}
                className={`w-full flex items-center p-3 border-2 rounded-lg transition-all ${
                  selectedPayment === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={option.logo}
                  alt={option.name}
                  className="h-6 w-auto mr-4"
                />
                <span
                  className={`font-medium ${
                    selectedPayment === option.id
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        <button
          disabled={loading || !selectedPayment}
          onClick={handlePaySelect}
          className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Bayar Sekarang"}
        </button>
        <button
          disabled={loading}
          onClick={handlePay}
          className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {" "}
          {loading ? "Loading..." : "Pilih dari Midtrans"}{" "}
        </button>{" "}
        <button
          disabled={loading}
          onClick={handleLinkPayment}
          className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Membuat Link..." : "Buat Link Pembayaran"}
        </button>
        {/* Tampilkan link jika sudah berhasil dibuat */}
        {paymentUrl && (
          <div className="p-4 border-l-4 border-green-500 rounded-md bg-green-50 text-center animate-fade-in">
            <p className="font-semibold text-green-800">
              Link Pembayaran Berhasil Dibuat:
            </p>
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {paymentUrl}
            </a>
            <p className="text-sm text-gray-600 mt-2">
              Klik link di atas untuk melanjutkan ke halaman pembayaran.
            </p>
          </div>
        )}
      </div>{" "}
    </div>
  );
}
