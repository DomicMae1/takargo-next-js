"use client";

import { Card, CardContent } from "../../component/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Dashboard() {
  // Dummy data (nanti ganti dari API Laravel)
  const kpiData = {
    totalOrder: 120,
    totalSJ: 95,
    hutang: 50000000,
    piutang: 75000000,
    bayarHutang: 20000000,
    bayarPiutang: 30000000,
  };

  const cashflow = [
    { bulan: "Jan", masuk: 50000000, keluar: 30000000 },
    { bulan: "Feb", masuk: 45000000, keluar: 35000000 },
    { bulan: "Mar", masuk: 60000000, keluar: 40000000 },
  ];

  const trend = [
    { bulan: "Jan", order: 30, sj: 25, hutang: 20000000, piutang: 30000000 },
    { bulan: "Feb", order: 40, sj: 35, hutang: 25000000, piutang: 35000000 },
    { bulan: "Mar", order: 50, sj: 40, hutang: 30000000, piutang: 40000000 },
  ];

  const donutHutang = [
    { name: "Belum Lunas", value: 60 },
    { name: "Lunas", value: 40 },
  ];

  const donutPiutang = [
    { name: "Belum Bayar", value: 70 },
    { name: "Sudah Bayar", value: 30 },
  ];

  const agingPiutang = [
    { umur: "0-30 hari", nilai: 20000000 },
    { umur: "31-60 hari", nilai: 15000000 },
    { umur: "61-90 hari", nilai: 10000000 },
    { umur: ">90 hari", nilai: 5000000 },
  ];

  const hutangSupplier = [
    { kategori: "Barang", nilai: 30000000 },
    { kategori: "Ekspedisi", nilai: 20000000 },
  ];

  const topCustomer = [
    { nama: "PT ABC", nilai: 40000000 },
    { nama: "CV XYZ", nilai: 25000000 },
  ];

  const topSupplier = [
    { nama: "Supplier A", nilai: 30000000 },
    { nama: "Supplier B", nilai: 15000000 },
  ];

  const COLORS = ["#0891B2", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p>Total Order</p>
            <h2 className="text-xl font-bold">{kpiData.totalOrder}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p>Total Surat Jalan</p>
            <h2 className="text-xl font-bold">{kpiData.totalSJ}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p>Hutang Aktif</p>
            <h2 className="text-xl font-bold">
              Rp {kpiData.hutang.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p>Piutang Aktif</p>
            <h2 className="text-xl font-bold">
              Rp {kpiData.piutang.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p>Pelunasan Hutang</p>
            <h2 className="text-xl font-bold">
              Rp {kpiData.bayarHutang.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p>Pelunasan Piutang</p>
            <h2 className="text-xl font-bold">
              Rp {kpiData.bayarPiutang.toLocaleString()}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Cashflow Trend */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Cashflow Masuk & Keluar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cashflow}>
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="masuk" stroke="#10B981" />
              <Line type="monotone" dataKey="keluar" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trend Order/SJ/Hutang/Piutang */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">
            Trend Order, SJ, Hutang, Piutang
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trend}>
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="order" stroke="#0891B2" />
              <Line dataKey="sj" stroke="#10B981" />
              <Line dataKey="hutang" stroke="#EF4444" />
              <Line dataKey="piutang" stroke="#F59E0B" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donut Hutang & Piutang */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Status Hutang</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={donutHutang}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {donutHutang.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Status Piutang</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={donutPiutang}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                >
                  {donutPiutang.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Aging Piutang + Hutang Supplier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Aging Piutang</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={agingPiutang}>
                <XAxis dataKey="umur" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nilai" fill="#0891B2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Hutang Supplier</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hutangSupplier}>
                <XAxis dataKey="kategori" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nilai" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Customer & Supplier */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Top Customer</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topCustomer}>
                <XAxis dataKey="nama" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nilai" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Top Supplier</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topSupplier}>
                <XAxis dataKey="nama" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="nilai" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
