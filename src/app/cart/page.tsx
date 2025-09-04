"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../component/cart-context";
import SideBar from "../component/sidebar";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="flex w-full min-h-screen bg-white text-black z-0">
        <SideBar />
        <div>
          <h1 className="text-2xl font-bold mb-4">Keranjang</h1>
          {cart.length === 0 ? (
            <p>Keranjang kosong</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-2"
                >
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <div className="mt-4 font-bold">
                Total: Rp {total.toLocaleString()}
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
