/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import NavbarShipment from "../../component/navbar-shipment";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  MapPin,
  MapPinCheck,
  ChevronDown,
  ChevronUp,
  CircleAlert,
  Trash2,
  CopyPlus,
  CirclePlus,
  ChevronsUpDown,
  CircleX,
} from "lucide-react";

const useShipmentStore = () => {
  const [step, setStep] = useState("kontak");
  const [pengirim, _setPengirim] = useState({
    nama: "John Doe",
    telepon: "08123456789",
    alamat: "Jl. Jenderal Sudirman No. 1, Jakarta",
  });
  const [penerima, _setPenerima] = useState({
    nama: "Jane Smith",
    telepon: "08987654321",
    alamat: "Jl. Gatot Subroto No. 2, Bandung",
  });

  const setPengirim = (newVal: Partial<typeof pengirim>) =>
    _setPengirim((prev) => ({ ...prev, ...newVal }));
  const setPenerima = (newVal: Partial<typeof penerima>) =>
    _setPenerima((prev) => ({ ...prev, ...newVal }));

  const nextStep = () => {
    if (step === "kontak") setStep("muatan");
    if (step === "muatan") setStep("konfirmasi");
  };
  const prevStep = () => {
    if (step === "muatan") setStep("kontak");
    if (step === "konfirmasi") setStep("muatan");
  };

  return {
    step,
    setStep,
    nextStep,
    prevStep,
    pengirim,
    penerima,
    setPengirim,
    setPenerima,
  };
};

interface Pengiriman {
  asal: string;
  tujuan: string;
}

interface Muatan {
  namaBarang: string;
  tipeBarang: string;
  berat: number;
  koli: number;
  panjang: number;
  lebar: number;
  tinggi: number;
  volume: number;
  harga: number;
  layananChecked: boolean;
  isOpen?: boolean;
}

// PERBAIKAN KUNCI 1: Definisikan tipe untuk props halaman sesuai standar Next.js
type ConfirmationPageProps = {
  params: {
    kode_pengiriman: string;
  };
};

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { kode_pengiriman } = params;
  const router = useRouter();

  const [layananChecked, setLayananChecked] = useState(false);
  const [showAlertPT, setShowAlertPT] = useState(false);
  const [showAlertPK, setShowAlertPK] = useState(false);
  const [showAlertTPT, setShowAlertTPT] = useState(false);
  const [showAlertTPT_POD, setShowAlertTPT_POD] = useState(false);
  const [showAlertWTTT, setShowAlertWTTT] = useState(false);
  const [showAlertWTTT_POD, setShowAlertWTTT_POD] = useState(false);
  const [showAlertBF, setShowAlertBF] = useState(false);
  const [showAlertBI, setShowAlertBI] = useState(false);
  const [data, setData] = useState<Pengiriman | null>(null);
  const {
    step,
    setStep,
    nextStep,
    prevStep,
    pengirim,
    penerima,
    setPengirim,
    setPenerima,
  } = useShipmentStore();

  const [muatanList, setMuatanList] = useState<Muatan[]>([
    {
      namaBarang: "",
      tipeBarang: "",
      berat: 0,
      koli: 0,
      panjang: 0,
      lebar: 0,
      tinggi: 0,
      volume: 200,
      harga: 0,
      layananChecked: false,
      isOpen: true,
    },
  ]);

  const handleSubmitMuatan = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(muatanList);
    // bisa ditambahkan logika submit ke API
  };

  const handleToggle = (index: number) => {
    setMuatanList((prev) =>
      prev.map((muatan, i) =>
        i === index ? { ...muatan, isOpen: !muatan.isOpen } : muatan
      )
    );
  };

  const handleHapusMuatan = (index: number) => {
    if (muatanList.length > 1) {
      setMuatanList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Tambah Muatan Baru (benar-benar kosong)
  const handleTambahMuatan = () => {
    setMuatanList((prev) => [
      ...prev,
      {
        namaBarang: "",
        tipeBarang: "",
        berat: 0, // angka
        koli: 0, // angka
        panjang: 0,
        lebar: 0,
        tinggi: 0,
        volume: 200,
        harga: 0, // wajib ada
        layananChecked: false, // wajib ada
        isOpen: true,
      },
    ]);
  };

  const handleDuplikatMuatan = (index: number) => {
    setMuatanList((prev) => [
      ...prev.slice(0, index + 1), // taruh setelah muatan yg di-copy
      { ...prev[index], isOpen: true }, // copy field
      ...prev.slice(index + 1),
    ]);
  };

  const handleConfirmAndPay = () => {
    console.log("Data siap dikirim:", { pengirim, penerima, muatanList });
    // Menggunakan API browser standar untuk navigasi
    window.location.href = `/payment/${kode_pengiriman}`;
  };

  useEffect(() => {
    fetch(`http://api-takargo.test/api/pengiriman/show/${kode_pengiriman}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [kode_pengiriman]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavbarShipment params={params} />
      <div className="w-full min-h-screen bg-white">
        <div className=" bg-gray-50">
          <div className="grid grid-cols-[35%_65%] bg-white">
            {/* Kolom 1–2: Data Pesanan */}
            <div className=" bg-white p-6 h-screen overflow-y-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center text-[#0891B2] mb-6 text-xs">
                <ol className="flex space-x-2">
                  <li>
                    <button
                      onClick={() => setStep("kontak")}
                      className={`hover:underline ${
                        step === "kontak"
                          ? "text-[#0891B2] font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      Kontak Pengiriman
                    </button>
                  </li>
                  <li className="text-gray-500">/</li>
                  <li>
                    <button
                      onClick={() => setStep("muatan")}
                      className={`hover:underline ${
                        step === "muatan"
                          ? "text-[#0891B2] font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      Detail Muatan
                    </button>
                  </li>
                  <li className="text-gray-500">/</li>
                  <li>
                    <button
                      onClick={() => setStep("konfirmasi")}
                      className={`hover:underline ${
                        step === "konfirmasi"
                          ? "text-[#0891B2] font-bold"
                          : "text-gray-500"
                      }`}
                    >
                      Rincian Pesanan
                    </button>
                  </li>
                </ol>
              </nav>
              {/* Konten Dinamis Berdasarkan Step */}
              {step === "kontak" && (
                <>
                  <h2 className="text-base font-bold text-gray-800 mb-4">
                    Rute Pengambilan - Pengiriman Barang
                  </h2>

                  {/* Rute */}
                  <div className="relative space-y-4 text-sm mb-4">
                    {/* Garis Timeline */}
                    <div className="absolute left-[14px] top-[30px] bottom-[14px] border-l-2 border-dashed border-[#0891B2]"></div>

                    {/* Alamat Awal */}
                    <div className="relative flex items-center gap-2">
                      <div className="z-10 flex items-center justify-center w-8 h-8 relative">
                        <MapPin className="text-blue-500" size={20} />
                      </div>
                      <div className="text-black w-full">
                        <input
                          type="text"
                          value={data?.asal || ""}
                          readOnly
                          className="w-full text-sm border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Port Surabaya */}
                    <div className="relative flex items-center gap-2">
                      <div className="z-10 flex items-center justify-center w-8 h-8 relative">
                        <div className="w-3 h-3 rounded-full bg-[#0891B2]"></div>
                      </div>
                      <div className="text-black w-full">
                        <span className="block text-sm">Port Surabaya</span>
                        <span className="text-[#64748B] text-xs">Surabaya</span>
                      </div>
                    </div>

                    {/* Port Singapore */}
                    <div className="relative flex items-center gap-2">
                      <div className="z-10 flex items-center justify-center w-8 h-8 relative">
                        <div className="w-3 h-3 rounded-full bg-[#0891B2]"></div>
                      </div>
                      <div className="text-black w-full">
                        <span className="block text-sm">Port Singapore</span>
                        <span className="text-[#64748B] text-xs">
                          Singapore
                        </span>
                      </div>
                    </div>

                    {/* Alamat Tujuan */}
                    <div className="relative flex items-center gap-2">
                      <div className="z-10 flex items-center justify-center w-8 h-8 relative">
                        <MapPinCheck className="text-green-500" size={20} />
                      </div>
                      <div className="text-black w-full">
                        <input
                          type="text"
                          value={data?.tujuan || ""}
                          readOnly
                          className="w-full text-sm border rounded-lg px-3 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Kontak Pengirim */}
                  <div className="mb-6">
                    <h3 className="text-base font-semibold text-gray-700 mb-2">
                      Pengirim
                    </h3>

                    <div className="space-y-4 text-black">
                      {/* Nama & Nomor Telepon dalam 1 baris */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Pengirim
                          </label>
                          <input
                            type="text"
                            value={pengirim.nama}
                            onChange={(e) =>
                              setPengirim({ nama: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#0891B2]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nomor Telepon Pengirim
                          </label>
                          <input
                            type="text"
                            value={pengirim.telepon}
                            onChange={(e) =>
                              setPengirim({ telepon: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#0891B2]"
                          />
                        </div>
                      </div>

                      {/* Detail Alamat di bawah */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Detail Alamat Pengirim
                        </label>
                        <textarea
                          value={pengirim.alamat}
                          onChange={(e) =>
                            setPengirim({ alamat: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#0891B2]"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* Kontak Penerima */}
                  <div className="text-black">
                    <h3 className="text-base font-semibold text-gray-700 mb-2">
                      Penerima
                    </h3>

                    <div className="space-y-4">
                      {/* Nama & Nomor Telepon Penerima dalam 1 baris */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Penerima
                          </label>
                          <input
                            type="text"
                            value={penerima.nama}
                            onChange={(e) =>
                              setPenerima({ nama: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#0891B2]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nomor Telepon Penerima
                          </label>
                          <input
                            type="text"
                            value={penerima.telepon}
                            onChange={(e) =>
                              setPenerima({ telepon: e.target.value })
                            }
                            className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#0891B2]"
                          />
                        </div>
                      </div>

                      {/* Detail Alamat di bawah */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Detail Alamat Penerima
                        </label>
                        <textarea
                          value={penerima.alamat}
                          onChange={(e) =>
                            setPenerima({ alamat: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#0891B2]"
                        ></textarea>
                      </div>
                      {/* Tombol Aksi */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => router.push("/shipment")}
                          className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-400 transition"
                        >
                          Kembali
                        </button>

                        <button
                          onClick={nextStep}
                          className="px-4 py-2 rounded-lg bg-[#0891B2] text-white hover:bg-[#0a7491] transition"
                        >
                          Lanjut
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {step === "muatan" && (
                <>
                  {/* Kolom 2 & 3 - Form Barang */}
                  <div className="md:col-span-2 space-y-6 text-black">
                    {/* Header */}
                    {muatanList.map((muatan, index) => (
                      <div key={index} className="md:col-span-2">
                        <button
                          type="button"
                          className="flex items-center justify-between w-full p-3 font-medium text-gray-500 border border-gray-200 bg-[#0891B2] rounded-lg gap-3"
                          onClick={() => handleToggle(index)}
                        >
                          <span className="text-base font-semibold text-left text-white">
                            Detail Muatan {index + 1}
                          </span>
                          {muatan.isOpen ? (
                            <ChevronUp className="w-5 h-5 text-white" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-white" />
                          )}
                        </button>

                        {/* Body */}
                        {muatan.isOpen && (
                          <div className="md:col-span-2 border border-t-0 border-gray-200 rounded-b-lg shadow bg-white">
                            <div className="p-5">
                              {/* Baris 1: Nama Barang & Tipe Barang */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                {/* Nama Barang */}
                                <div>
                                  <label className="block mb-1 text-sm font-medium">
                                    Nama Barang
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Contoh: Besi, Kayu, dll."
                                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    value={muatan.namaBarang}
                                    onChange={(e) => {
                                      const newList = [...muatanList];
                                      newList[index].namaBarang =
                                        e.target.value;
                                      setMuatanList(newList);
                                    }}
                                    required
                                  />
                                </div>

                                {/* Tipe Barang */}
                                <div>
                                  <label className="block mb-1 text-sm font-medium">
                                    Tipe Barang
                                  </label>
                                  <select
                                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm text-gray-400"
                                    value={muatan.tipeBarang}
                                    onChange={(e) => {
                                      const newList = [...muatanList];
                                      newList[index].tipeBarang =
                                        e.target.value;
                                      setMuatanList(newList);
                                    }}
                                    required
                                  >
                                    <option value="" disabled>
                                      Pilih Tipe Barang
                                    </option>
                                    <option value="LCL">LCL</option>
                                    <option value="FCL">FCL</option>
                                    <option value="Cair">Cair</option>
                                    <option value="Padat">Padat</option>
                                    <option value="Gas">Gas</option>
                                  </select>
                                </div>
                              </div>

                              {/* Baris 2: Layanan, Berat, Koli */}
                              <div className="grid grid-cols-2 gap-4 items-start mb-4">
                                {/* Berat */}
                                <div>
                                  <label className="block mb-1 text-sm font-medium">
                                    Berat (Kg)
                                  </label>
                                  <div className="flex">
                                    <input
                                      type="number"
                                      placeholder="Masukkan Berat"
                                      className="w-full border border-gray-300 px-3 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                      value={muatan.berat}
                                      onChange={(e) => {
                                        const newList = [...muatanList];
                                        newList[index].berat =
                                          parseFloat(e.target.value) || 0;
                                        setMuatanList(newList);
                                      }}
                                      required
                                    />
                                    <span className="px-3 py-2 bg-[#0891B2] text-white text-sm font-medium rounded-r">
                                      Kg
                                    </span>
                                  </div>
                                  <p className="text-gray-400 text-xs mt-2">
                                    <span className="text-red-500">*</span>{" "}
                                    Harga min. 1000 kg akan berlaku
                                  </p>
                                </div>

                                {/* Koli */}
                                <div>
                                  <label className="block mb-1 text-sm font-medium">
                                    Koli
                                  </label>
                                  <div className="flex">
                                    <input
                                      type="number"
                                      placeholder="Jumlah Koli"
                                      className="w-full border border-gray-300 px-3 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                      value={muatan.koli}
                                      onChange={(e) => {
                                        const newList = [...muatanList];
                                        newList[index].koli =
                                          parseInt(e.target.value) || 0;
                                        setMuatanList(newList);
                                      }}
                                      required
                                    />
                                    <span className="px-3 py-2 bg-[#0891B2] text-white text-sm font-medium rounded-r">
                                      Unit
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Baris 3: Panjang, Lebar, Tinggi, Volume */}
                              <div className="grid grid-cols-3">
                                {/* Label */}
                                <div className="col-span-4">
                                  <label className="block mb-1 text-sm font-medium">
                                    Ukuran
                                  </label>
                                </div>
                                <div className="col-span-3 grid grid-cols-3 gap-4 mb-4">
                                  {/* Panjang */}
                                  <div className="flex">
                                    <input
                                      type="number"
                                      placeholder="Panjang"
                                      className="w-full border border-gray-300 px-3 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                      value={muatan.panjang}
                                      onChange={(e) => {
                                        const newList = [...muatanList];
                                        newList[index].panjang =
                                          parseFloat(e.target.value) || 0;
                                        setMuatanList(newList);
                                      }}
                                      required
                                    />
                                    <span className="px-3 py-2 bg-[#0891B2] text-white text-sm font-medium rounded-r">
                                      cm
                                    </span>
                                  </div>

                                  {/* Lebar */}
                                  <div className="flex">
                                    <input
                                      type="number"
                                      placeholder="Lebar"
                                      className="w-full border border-gray-300 px-3 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                      value={muatan.lebar}
                                      onChange={(e) => {
                                        const newList = [...muatanList];
                                        newList[index].lebar =
                                          parseFloat(e.target.value) || 0;
                                        setMuatanList(newList);
                                      }}
                                      required
                                    />
                                    <span className="px-3 py-2 bg-[#0891B2] text-white text-sm font-medium rounded-r">
                                      cm
                                    </span>
                                  </div>

                                  {/* Tinggi */}
                                  <div className="flex">
                                    <input
                                      type="number"
                                      placeholder="Tinggi"
                                      className="w-full border border-gray-300 px-3 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                      value={muatan.tinggi}
                                      onChange={(e) => {
                                        const newList = [...muatanList];
                                        newList[index].tinggi =
                                          parseFloat(e.target.value) || 0;
                                        setMuatanList(newList);
                                      }}
                                      required
                                    />
                                    <span className="px-3 py-2 bg-[#0891B2] text-white text-sm font-medium rounded-r">
                                      cm
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Volume */}
                              <div className="flex text-xs mb-4 text-gray-400">
                                Volume : {muatan.volume} cbm
                              </div>

                              {/* Layanan */}
                              <div>
                                <label className="block mb-1 text-sm font-medium">
                                  Layanan
                                </label>

                                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                                  <div className="pr-2">
                                    <p className="text-sm font-medium">
                                      Special Handling
                                    </p>
                                    <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                                      Barang-barang yang memerlukan special
                                      handling adalah barang Elektronik, Kaca,
                                      Keramik, dll.
                                    </p>
                                  </div>

                                  {/* Toggle Switch */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newList = [...muatanList];
                                      newList[index].layananChecked =
                                        !newList[index].layananChecked;
                                      setMuatanList(newList);
                                    }}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                      muatan.layananChecked
                                        ? "bg-[#0891B2]"
                                        : "bg-gray-300"
                                    }`}
                                  >
                                    <span
                                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                        muatan.layananChecked
                                          ? "translate-x-6"
                                          : "translate-x-1"
                                      }`}
                                    />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mt-4">
                                {/* Tombol Hapus */}
                                <button
                                  type="button"
                                  onClick={() => handleHapusMuatan(index)}
                                  className="flex items-center justify-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition w-full"
                                >
                                  <Trash2 size={20} />
                                  Hapus Muatan
                                </button>

                                {/* Tombol Duplikat */}
                                <button
                                  type="button"
                                  onClick={() => handleDuplikatMuatan(index)}
                                  className="flex items-center justify-center gap-2 border border-gray-400 text-sm text-gray-500 px-4 py-2 rounded hover:bg-red-50 transition w-full"
                                >
                                  <CopyPlus
                                    size={20}
                                    className="text-[#0891B2]"
                                  />
                                  Duplikat Muatan
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {muatanList.length > 0 && (
                      <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow ">
                        <button
                          type="button"
                          onClick={handleTambahMuatan}
                          className="flex items-center justify-center gap-2 text-sm text-gray-500 px-4 py-3 rounded transition w-full"
                        >
                          <CirclePlus size={24} className="text-[#0891B2]" />
                          Tambah Muatan Lain
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-black">
                    <button
                      onClick={prevStep}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-400 transition"
                    >
                      Kembali
                    </button>

                    <button
                      onClick={nextStep}
                      className="px-4 py-2 rounded-lg bg-[#0891B2] text-white hover:bg-[#0a7491] transition"
                    >
                      Lanjut
                    </button>
                  </div>
                </>
              )}
              {step === "konfirmasi" && (
                <div>
                  <h2 className="text-base font-bold text-gray-800 mb-4">
                    Rincian Harga
                  </h2>

                  <div className="overflow-x-auto mb-4 rounded-lg border border-gray-400 text-gray-500">
                    <table className="w-full text-sm font-normal">
                      <thead className="">
                        <tr className="text-left text-base ">
                          <th className="px-3 py-2">Muatan</th>
                          <th className="px-3 py-2 text-center">Ukuran/Koli</th>
                          <th className="px-3 py-2 text-center">Layanan</th>
                          <th className="px-3 py-2 text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <div className="flex flex-col px-3 py-2">
                            <span className="text-base text-black font-bold">
                              Barang A
                            </span>
                            <span className="text-xs text-gray-500">
                              Elektronik
                            </span>
                          </div>
                          <td className="px-3 py-2 text-center">
                            <div className="flex flex-col">
                              <span>10 Kg / 10 Koli</span>
                              <span className="text-xs text-gray-500">
                                Volume : 200 cbm
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-center">Reguler</td>
                          <td className="px-3 py-2 text-center">
                            Rp 25.000.000
                          </td>
                        </tr>
                        <tr>
                          <div className="flex flex-col px-3 py-2">
                            <span className="text-base text-black font-bold">
                              Barang B
                            </span>
                            <span className="text-xs text-gray-500">Kain</span>
                          </div>
                          <td className="px-3 py-2 text-center">
                            <div className="flex flex-col">
                              <span>5 Kg / 2 Koli</span>
                              <span className="text-xs text-gray-500">
                                Volume : 80 cbm
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-2 text-center">Express</td>
                          <td className="px-3 py-2 text-center">Rp 100.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-base font-bold text-gray-800 mb-4">
                    Asuransi Barang
                  </h2>

                  <div className="">
                    <select
                      id="asuransi"
                      name="asuransi"
                      className="w-full rounded-lg border border-gray-300 text-sm p-2 text-black"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Pilih Asuransi
                      </option>
                      <option value="dasar">Dasar</option>
                      <option value="cepat">Cepat</option>
                      <option value="kargo">Kargo</option>
                    </select>
                  </div>

                  <div className="flex items-center mt-4 mb-8">
                    <label className="flex items-center gap-2 text-sm font-medium text-black">
                      <input
                        type="checkbox"
                        checked={layananChecked}
                        onChange={(e) => setLayananChecked(e.target.checked)}
                        className="w-4 h-4 text-[#0891B2] border-gray-300 rounded "
                      />
                      Saya Setuju dengan Kebijakan Asuransi Takargo
                    </label>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-300 text-sm bg-[#CFFAFE]">
                    <div className="flex items-center gap-2 mb-1">
                      <CircleAlert className="text-black" size={16} />
                      <p className="font-semibold text-gray-700">Note</p>
                    </div>
                    <p className="text-gray-700">
                      Barang Anda akan diukur dan ditimbang ulang oleh Takargo,
                      apabila hasilnya berbeda, harga akan diperbarui.
                    </p>
                  </div>

                  <h2 className="text-base font-bold text-gray-800 mb-4 mt-8">
                    Info Tambahan
                  </h2>

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertPT(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Pembatalan Truk (POL)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertPT && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertPT(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Pembatalan Truk (POL)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertPK(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Pembatalan Kontainer (POL)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertPK && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertPK(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Pembatalan Kontainer (POL)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertTPT(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Tol & Parkir Truk (POL)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertTPT && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertTPT(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Tol & Parkir Truk (POL)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertTPT_POD(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Tol & Parkir Truk (POD)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertTPT_POD && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertTPT_POD(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Tol & Parkir Truk (POD)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertWTTT(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Waktu Tunggu Tambahan Truk (POL)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertWTTT && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertWTTT(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Waktu Tunggu Tambahan Truk (POL)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertWTTT_POD(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Waktu Tunggu Tambahan Truk (POD)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertWTTT_POD && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertWTTT_POD(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Waktu Tunggu Tambahan Truk (POD)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertBF(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Biaya Forklift (POL & POD)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertBF && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertBF(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Biaya Forklift (POL & POD)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  {/* Kotak Biaya Tambahan */}
                  <div
                    onClick={() => setShowAlertBI(true)}
                    className="p-3 mt-4 rounded-lg border border-gray-300 bg-white text-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  >
                    <p className="font-normal text-gray-700">
                      Biaya Insidental (POL & POD)
                    </p>
                    <ChevronsUpDown size={20} className="text-black" />
                  </div>

                  {/* Alert pojok kiri atas */}
                  {showAlertBI && (
                    <div className="fixed top-4 left-4 bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg w-[500px] border border-gray-200">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-2xl font-semibold text-[#0891B2]">
                          Informasi Tambahan
                        </h2>
                        <button
                          onClick={() => setShowAlertBI(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>
                      </div>

                      {/* Subjudul */}
                      <h3 className="text-base font-semibold mb-1 text-[#0891B2]">
                        Biaya Insidental (POL & POD)
                      </h3>

                      {/* Isi */}
                      <p className="text-base leading-relaxed text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse auctor sed lectus ac ultricies.
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-black">
                    <button
                      onClick={prevStep}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-400 transition"
                    >
                      Kembali
                    </button>

                    <button
                      onClick={handleConfirmAndPay}
                      className="px-4 py-2 rounded-lg bg-[#0891B2] text-white hover:bg-[#0a7491] transition"
                    >
                      Konfirmasi & Lanjut Bayar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Kolom 3–4: Peta */}
            <div className="bg-white">
              {/* Bisa ganti pakai Google Maps iframe atau Leaflet */}
              <img
                src="/map.svg"
                alt="Map Placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
