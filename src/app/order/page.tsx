/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CircleAlert,
  MapPin,
  Navigation,
  ChevronDown,
  ChevronUp,
  MapPinCheck,
  CircleX,
  Trash2,
  CopyPlus,
  CirclePlus,
} from "lucide-react";
import Link from "next/link";
import SideBar from "../component/sidebar";
import NavbarShipment from "../component/navbar-shipment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, isSameDay } from "date-fns";
import axios from "axios";

// --- letakkan di atas component (atau di dalam component sebelum return) ---
const dataMuatan = [
  {
    nama: "Barang A",
    tipe: "Elektronik",
    berat: 10,
    koli: 10,
    volume: 200,
    layanan: "Reguler",
    total: 25000000,
  },
  {
    nama: "Barang B",
    tipe: "Kain",
    berat: 5,
    koli: 2,
    volume: 80,
    layanan: "Express",
    total: 100000,
  },
];

// contoh data dummy (bisa dari props / state / API)
const orderDetail = {
  alamatPenjemputan: "Jakarta",
  jadwalPengiriman: "Surabaya",
  totalHarga: 3200000000,
};

interface Pelabuhan {
  id: number;
  nama: string;
  berangkat: string;
  tanggal: string; // format "yyyy-MM-dd"
  waktu: string; // format "HH:mm:ss"
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

export default function ShipmentPage() {
  const router = useRouter();
  const [namaBarang, setNamaBarang] = useState("");
  const [tipeBarang, setTipeBarang] = useState("");
  const [berat, setBerat] = useState("");
  const [koli, setKoli] = useState("");
  const [panjang, setPanjang] = useState("");
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [volume, setVolume] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [awalSelect, setAwalSelect] = useState<string>("pickup");
  const [tujuanSelect, setTujuanSelect] = useState<string>("sampai");
  const [layananChecked, setLayananChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [awalOption, setAwalOption] = useState("");
  const [tujuanOption, setTujuanOption] = useState("");
  const [jadwalOption, setJadwalOption] = useState<Date | null>(null);
  const [pengirimanId, setPengirimanId] = useState<string | null>(null);

  const [awal, setAwal] = useState<string[]>([]);
  const [tujuan, setTujuan] = useState<string[]>([]);
  const [jadwal, setJadwal] = useState<Date[]>([]);
  const availableDates = jadwal;

  const [selectedPelabuhan, setSelectedPelabuhan] = useState<number | null>(
    null
  );
  const [pelabuhanList, setPelabuhanList] = useState<Pelabuhan[]>([]);

  const isDateAvailable = (date: Date) => {
    return availableDates.some((d) => isSameDay(d, date));
  };

  // Awal suggestion
  const [filteredAwal, setFilteredAwal] = useState<string[]>([]);
  const [showAwalSuggestions, setShowAwalSuggestions] = useState(false);

  // Tujuan suggestion
  const [filteredTujuan, setFilteredTujuan] = useState<string[]>([]);
  const [showTujuanSuggestions, setShowTujuanSuggestions] = useState(false);

  const handlePesan = (muatanList?: Muatan[], totalHarga?: number) => {
    // Bisa tambahkan logic simpan pesanan ke backend di sini
    router.push("/confirmation");
  };

  // Handler Awal
  const handleChangeAwal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAwalOption(value);

    if (value.length > 0) {
      const filtered = awal.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredAwal(filtered);
      setShowAwalSuggestions(true);
    } else {
      setFilteredAwal([]);
      setShowAwalSuggestions(false);
    }
  };

  const handleSelectAwal = (option: string) => {
    setAwalOption(option);
    setFilteredAwal([]);
    setShowAwalSuggestions(false);
  };

  // Handler Tujuan
  const handleChangeTujuan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTujuanOption(value);

    if (value.length > 0) {
      const filtered = tujuan.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTujuan(filtered);
      setShowTujuanSuggestions(true);
    } else {
      setFilteredTujuan([]);
      setShowTujuanSuggestions(false);
    }
  };

  const handleSelectTujuan = (option: string) => {
    setTujuanOption(option);
    setFilteredTujuan([]);
    setShowTujuanSuggestions(false);
  };

  const [muatanList, setMuatanList] = useState<Muatan[]>([
    {
      namaBarang: "",
      tipeBarang: "",
      berat: 0,
      koli: 0,
      panjang: 0,
      lebar: 0,
      tinggi: 0,
      volume: 0,
      harga: 0,
      layananChecked: false,
      isOpen: true,
    },
  ]);

  const totalHarga = muatanList.reduce((sum, item) => sum + item.harga, 0);

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
        volume: 0,
        harga: 0, // wajib ada
        layananChecked: false, // wajib ada
        isOpen: true,
      },
    ]);
  };

  // Duplikat Muatan (copy isi dari index tertentu)
  const handleDuplikatMuatan = (index: number) => {
    setMuatanList((prev) => [
      ...prev.slice(0, index + 1), // taruh setelah muatan yg di-copy
      { ...prev[index], isOpen: true }, // copy field
      ...prev.slice(index + 1),
    ]);
  };

  useEffect(() => {
    fetch("http://api-takargo.test/api/shipping-options")
      .then((res) => res.json())
      .then((data) => {
        setAwal(data.awal);
        setTujuan(data.tujuan);
        setJadwal(data.jadwal);
      });

    fetch("http://api-takargo.test/api/pelabuhan")
      .then((res) => res.json())
      .then((data) => {
        setPelabuhanList(data);
      })
      .catch((err) => {
        console.error("Gagal fetch data:", err);
      });
  }, []);

  const handleSubmitPengiriman = async () => {
    const payload = {
      asal: awalOption,
      tujuan: tujuanOption,
      tanggal_berangkat: jadwalOption
        ? jadwalOption.toISOString().split("T")[0]
        : null,
      status: "pending",
      muatan: muatanList.map((item) => ({
        nama_barang: item.namaBarang,
        tipe_barang: item.tipeBarang,
        layanan: item.layananChecked,
        koli: item.koli,
        panjang: item.panjang,
        lebar: item.lebar,
        tinggi: item.tinggi,
        volume: item.volume,
        berat: item.berat,
      })),
    };

    try {
      const res = await axios.post(
        "http://api-takargo.test/api/pengiriman",
        payload
      );

      if (res.data.success) {
        router.push(res.data.redirect_url);
      } else {
        alert("Pengiriman berhasil dibuat!");
      }

      // reset form
      setNamaBarang("");
      setTipeBarang("");
      setBerat("");
      setKoli("");
      setPanjang("");
      setLebar("");
      setTinggi("");
      setVolume("");
      setLayananChecked(false);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-white">
        <NavbarShipment params={{ kode_pengiriman: "" }} />

        <div className="flex min-h-screen bg-[#FAFAFA] text-black">
          <div className="space-y-6 px-20 py-8 w-full">
            {/* Judul */}
            <div className="text-left">
              <h2 className="text-2xl font-semibold">Kirim Barang LCL</h2>
              <p className="text-gray-600">
                Cari rute & harga ekstensif kami yang sesuai dengan rantai
                pasokan Anda.
              </p>
            </div>

            <div className="grid grid-cols-[22%_68%] gap-6 ">
              <div className="flex space-y-4 border border-gray-200 rounded-lg shadow bg-white w-full p-6 ">
                {/* Judul dan Deskripsi */}
                {/* Kolom 1 - Form Alamat */}
                <div className="">
                  <div className="space-y-4 mb-4">
                    {/* Form Alamat Awal */}
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Alamat Awal (Kota, Negara)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={awalOption}
                          onChange={handleChangeAwal}
                          className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891B2] text-sm"
                          placeholder="Pilih Alamat Awal"
                        />
                        <MapPin
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={18}
                        />

                        {showAwalSuggestions && filteredAwal.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                            {filteredAwal.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => handleSelectAwal(item)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Jika tidak ada hasil */}
                        {showAwalSuggestions &&
                          awalOption &&
                          filteredAwal.length === 0 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 px-3 py-2 text-gray-500">
                              Lokasi tidak ditemukan, coba lokasi lain.
                            </div>
                          )}
                      </div>
                      {/* Radio Button */}
                      <div className="mt-3 space-y-2">
                        {/* Pick-Up */}
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="deliveryOption"
                            value="pickup"
                            checked={awalSelect === "pickup"}
                            onChange={(e) => setAwalSelect(e.target.value)}
                            className="text-[#0891B2] focus:ring-[#0891B2]"
                          />
                          <span className="text-sm">
                            Pick-Up ke Alamat Tujuan
                          </span>
                        </label>

                        {/* Drop-Off */}
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="deliveryOption"
                            value="dropoff"
                            checked={awalSelect === "dropoff"}
                            onChange={(e) => setAwalSelect(e.target.value)}
                            className="text-[#0891B2] focus:ring-[#0891B2]"
                          />
                          <span className="text-sm">
                            Drop-Off di Cabang Takargo
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Form Alamat Tujuan */}
                    <div>
                      <label className="block mb-1 text-sm font-medium">
                        Alamat Tujuan (Kota, Negara)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={tujuanOption}
                          onChange={handleChangeTujuan}
                          className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891B2] text-sm"
                          placeholder="Pilih Alamat Tujuan"
                        />
                        <MapPinCheck
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={18}
                        />

                        {showTujuanSuggestions && filteredTujuan.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                            {filteredTujuan.map((item, index) => (
                              <li
                                key={index}
                                onClick={() => handleSelectTujuan(item)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {showTujuanSuggestions &&
                          tujuanOption &&
                          filteredTujuan.length === 0 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 px-3 py-2 text-gray-500">
                              Lokasi tidak ditemukan, coba lokasi lain.
                            </div>
                          )}
                      </div>
                      {/* Radio Button */}
                      <div className="mt-3 space-y-2">
                        {/* Antar Sampai Alamat Tujuan (default terpilih) */}
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="tujuanOption"
                            value="sampai"
                            checked={tujuanSelect === "sampai"}
                            onChange={(e) => setTujuanSelect(e.target.value)}
                            className="text-[#0891B2] focus:ring-[#0891B2]"
                          />
                          <span className="text-sm">
                            Antar Sampai Alamat Tujuan
                          </span>
                        </label>

                        {/* Ambil di Cabang Takargo */}
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="tujuanOption"
                            value="tujuan"
                            checked={tujuanSelect === "tujuan"}
                            onChange={(e) => setTujuanSelect(e.target.value)}
                            className="text-[#0891B2] focus:ring-[#0891B2]"
                          />
                          <span className="text-sm">
                            Ambil di Cabang Takargo
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Form Alamat Tujuan */}
                    <div>
                      <label className="mb-1 text-sm font-bold flex items-center gap-1">
                        Jadwal Ambil / Antar
                        <div className="relative inline-block">
                          <button
                            type="button"
                            onClick={() => setShowInfo(!showInfo)}
                            className="p-1 rounded-full hover:bg-gray-200 transition"
                          >
                            <CircleAlert className="text-black" size={18} />
                          </button>

                          {showInfo && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-[#06B6D4] text-white text-xs rounded-lg shadow w-[250px] z-50">
                              Jadwal dapat berubah sewaktu waktu, Anda akan
                              dihubungi oleh admin untuk memastikan.
                            </div>
                          )}
                        </div>
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={
                          jadwalOption
                            ? jadwalOption.toLocaleDateString("id-ID")
                            : ""
                        }
                        placeholder="Pilih Jadwal"
                        className="border rounded-lg px-3 py-2 w-full mb-4 border-gray-400 cursor-pointer"
                        onClick={() => setShowCalendar(!showCalendar)}
                      />

                      {/* Kalender muncul kalau klik input */}
                      {showCalendar && (
                        <DatePicker
                          inline
                          selected={jadwalOption}
                          onChange={(date) => {
                            setJadwalOption(date);
                            setShowCalendar(false); // tutup setelah pilih
                          }}
                          dayClassName={
                            (date) =>
                              isDateAvailable(date)
                                ? "bg-white text-black" // tanggal tersedia → putih
                                : "bg-gray-200 text-gray-400 cursor-not-allowed" // tidak tersedia → abu
                          }
                          filterDate={isDateAvailable} // hanya bisa klik tanggal yg ada
                        />
                      )}

                      {/* Daftar Pelabuhan berdasarkan tanggal yang dipilih */}
                      {jadwalOption && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {pelabuhanList
                            .filter((p) => {
                              if (!p.tanggal || !jadwalOption) return false;

                              // Format jadwalOption ke yyyy-MM-dd
                              const selectedDate = format(
                                jadwalOption,
                                "yyyy-MM-dd"
                              );

                              // Pastikan tanggal dari database juga diformat agar konsisten
                              const pelabuhanDate = format(
                                parseISO(p.tanggal),
                                "yyyy-MM-dd"
                              );

                              return pelabuhanDate === selectedDate;
                            })
                            .map((p) => {
                              const isSelected = selectedPelabuhan === p.id;

                              return (
                                <div
                                  key={p.id}
                                  onClick={() => setSelectedPelabuhan(p.id)}
                                  className={`cursor-pointer border rounded-lg shadow p-2 space-y-1 transition
                                    ${
                                      isSelected
                                        ? "bg-white border-blue-500"
                                        : "bg-gray-100 border-gray-300"
                                    }`}
                                >
                                  <p className="font-semibold text-sm truncate">
                                    {p.nama}
                                  </p>
                                  <p className="text-xs">{p.berangkat}</p>
                                  <p className="text-xs">Berangkat</p>
                                  <p className="text-xs">
                                    {new Date(p.tanggal).toLocaleDateString(
                                      "id-ID",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      }
                                    )}
                                  </p>
                                  <p className="text-xs">
                                    {p.waktu.slice(0, 5)} WIB
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      )}

                      {jadwalOption && (
                        <p className="text-sm mt-4">
                          Estimasi barang diterima pada{" "}
                          <strong>
                            {jadwalOption.toLocaleDateString("id-ID")}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end relative text-sm">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-[#0891B2] text-white px-5 py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Navigation className="text-white" size={18} />
                      Dapatkan Harga
                    </button>
                  </div>

                  {/* Modal Popout */}
                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                      <div className="relative bg-white rounded-2xl shadow-lg w-[90%] max-w-3xl p-6 animate-fadeIn">
                        {/* Tombol Close */}
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="absolute top-3 right-3 rounded-full p-1 hover:bg-gray-100"
                        >
                          <CircleX size={26} className="text-red-500" />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-left">
                          Rincian Pengiriman
                        </h2>

                        {/* Detail Pengiriman */}
                        <div className="relative space-y-8 text-sm mb-8">
                          <div className="absolute left-[9px] pl-0.5 top-5 bottom-24 w-px bg-[#0891B2]"></div>

                          {/* Alamat Awal */}
                          <div className="relative flex items-start gap-2">
                            <div className="z-10">
                              <MapPin className="text-blue-500" size={20} />
                            </div>
                            <div>
                              <span className="font-normal">
                                Alamat Penjemputan:
                              </span>
                              <input
                                type="text"
                                value={awalOption}
                                onChange={(e) => setAwalOption(e.target.value)}
                                readOnly
                                className="text-lg font-semibold w-full "
                              />
                            </div>
                          </div>

                          {/* Alamat Tujuan */}
                          <div className="relative flex items-start gap-2">
                            <div className="z-10">
                              <MapPinCheck
                                className="text-green-500"
                                size={20}
                              />
                            </div>
                            <div>
                              <span className="font-normal">
                                Alamat Tujuan:
                              </span>
                              <input
                                type="text"
                                value={tujuanOption}
                                readOnly
                                onChange={(e) =>
                                  setTujuanOption(e.target.value)
                                }
                                className="text-lg font-semibold w-full"
                              />
                            </div>
                          </div>

                          {/* Jadwal Ambil */}
                          <div className="relative flex items-start gap-2">
                            <div>
                              <span className="font-normal">
                                Jadwal Pengiriman:
                              </span>
                              <input
                                type="date"
                                value={
                                  jadwalOption
                                    ? jadwalOption.toISOString().split("T")[0]
                                    : ""
                                }
                                readOnly
                                onChange={(e) =>
                                  setJadwalOption(new Date(e.target.value))
                                }
                                className="text-lg font-semibold w-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Total Muatan */}
                        <p className="text-sm mb-2">
                          <span className="font-semibold">Total Muatan</span>
                        </p>

                        <div className="overflow-x-auto mb-4 rounded-lg border border-gray-400 px-4 py-1">
                          <table className="w-full text-sm font-normal table-auto">
                            <thead>
                              <tr className="text-left ">
                                <th className="px-3 py-2 w-1/5">Muatan</th>
                                <th className="px-3 py-2 w-1/5 text-center">
                                  Ukuran/Koli
                                </th>
                                <th className="px-3 py-2 w-1/5 text-center">
                                  Layanan
                                </th>
                                <th className="px-3 py-2 w-1/5 text-center">
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {muatanList.map((item, i) => (
                                <tr key={i} className="">
                                  {/* Kolom Muatan */}
                                  <td className="px-3 py-2">
                                    <div className="flex flex-col">
                                      <input
                                        type="text"
                                        value={item.namaBarang}
                                        readOnly
                                        className="text-base font-bold"
                                      />
                                      <input
                                        type="text"
                                        value={item.tipeBarang}
                                        readOnly
                                        className="text-xs text-gray-500"
                                      />
                                    </div>
                                  </td>

                                  {/* Kolom Ukuran/Koli */}
                                  <td className="px-3 py-2 text-center">
                                    <div className="flex flex-col items-center">
                                      {item.berat} Kg / {item.koli} Koli
                                      <span className="text-xs text-gray-500">
                                        Volume: {item.volume} cbm
                                      </span>
                                    </div>
                                  </td>

                                  {/* Kolom Layanan */}
                                  <td className="px-3 py-2 text-center">
                                    <input
                                      type="checkbox"
                                      checked={item.layananChecked}
                                      disabled
                                    />
                                  </td>

                                  {/* Kolom Total */}
                                  <td className="px-3 py-2 text-center">
                                    Rp {100000000}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Total Harga */}
                        <p className="text-sm font-bold text-black">
                          Total Harga Pesanan
                        </p>
                        <p className="text-2xl font-bold text-[#0891B2] mt-1">
                          Rp. {100000000}
                        </p>

                        <div className="flex items-center justify-between ">
                          <p className="text-xs text-black">
                            <span className="text-red-500">*</span>Harga Minimal
                            1.000 kg berlaku
                          </p>

                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsModalOpen(false)}
                              className="border border-gray-300 text-gray-700 rounded px-3 py-1 text-sm"
                            >
                              Kembali
                            </button>
                            <button
                              onClick={() => alert("Link dibagikan!")}
                              className="border border-gray-300 text-gray-700 rounded px-3 py-1 text-sm"
                            >
                              Bagikan
                            </button>
                            <button
                              onClick={() => {
                                handleSubmitPengiriman();
                              }}
                              className="bg-[#0891B2] text-white rounded px-3 py-1 text-sm"
                            >
                              Kirim
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Kolom 2 & 3 - Form Barang */}
              <div className="space-y-6">
                {/* Header */}
                {muatanList.map((muatan, index) => (
                  <div key={index} className="md:col-span-2">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-gray-200 bg-white rounded-lg hover:bg-gray-100 gap-3"
                      onClick={() => handleToggle(index)}
                    >
                      <span className="text-2xl font-semibold text-left text-black">
                        Detail Muatan {index + 1}
                      </span>
                      {muatan.isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
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
                                  newList[index].namaBarang = e.target.value;
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
                                  newList[index].tipeBarang = e.target.value;
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
                          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-start mb-4">
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
                                Harga min. 1000 kg akan berlaku{" "}
                                <span className="text-red-500">*</span>
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
                          <div className="grid grid-cols-4">
                            {/* Label */}
                            <div className="col-span-4">
                              <label className="block mb-1 text-sm font-medium">
                                Ukuran
                              </label>
                            </div>
                            <div className="col-span-4 grid grid-cols-4 gap-4 mb-4">
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

                              {/* Volume */}
                              <div className="flex">
                                <input
                                  type="number"
                                  placeholder="Volume"
                                  className="w-full border border-gray-300 px-3 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                  value={muatan.volume}
                                  onChange={(e) => {
                                    const newList = [...muatanList];
                                    newList[index].volume =
                                      parseFloat(e.target.value) || 0;
                                    setMuatanList(newList);
                                  }}
                                  required
                                />
                                <span className="px-3 py-2 bg-[#0891B2] text-white text-sm font-medium rounded-r">
                                  cbm
                                </span>
                              </div>
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
                              <CopyPlus size={20} className="text-[#0891B2]" />
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
                      className="flex items-center justify-center gap-2 text-sm text-gray-500 px-4 py-2 rounded transition w-full"
                    >
                      <CirclePlus size={20} className="text-[#0891B2]" />
                      Tambah Muatan Lain
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
