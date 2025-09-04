"use client";

import { useCart } from "../component/cart-context";
import SideBar from "../component/sidebar";

const products = [
  { id: 1, name: "Laptop", price: 15000000 },
  { id: 2, name: "Mouse", price: 150000 },
  { id: 3, name: "Keyboard", price: 300000 },
];

export default function ItemsPage() {
  const { addToCart } = useCart();

  return (
    <>
      <div className="flex w-full min-h-screen bg-white text-black z-0">
        <SideBar />
        <div>
          <h1 className="text-2xl font-bold mb-4">Daftar Barang</h1>
          <div className="grid grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="border p-4 rounded">
                <h2 className="font-semibold">{p.name}</h2>
                <p>Rp {p.price.toLocaleString()}</p>
                <button
                  onClick={() =>
                    addToCart({
                      ...p,
                      quantity: 1,
                      qty: 0,
                    })
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
