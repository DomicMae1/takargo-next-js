/* eslint-disable @next/next/no-img-element */
"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";

export default function NavbarShipment({
  params,
}: {
  params: { kode_pengiriman: string };
}) {
  const { kode_pengiriman } = params;
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Menggunakan window.location.pathname setelah komponen ter-mount di client
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const steps = [
    { label: "Atur Muatan", path: "/order" },
    {
      label: "Konfirmasi",
      path: `/confirmation/${kode_pengiriman}`,
    },
    {
      label: "Bayar",
      path: `/payment/${kode_pengiriman}`,
    },
  ];

  // Tentukan step aktif berdasarkan path
  const currentStepIndex = steps.findIndex((step) =>
    currentPath.startsWith(step.path)
  );

  const isOnSuccessPage = currentPath.startsWith(`/success`);

  return (
    <nav className="bg-white px-20 py-4 flex items-center justify-between text-sm border border-gray-400">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Link href="/login">
          <img
            src="/takargo-logo.svg"
            alt="Takargo Logo"
            className="max-w-full h-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex || isOnSuccessPage;
          const isActive = index === currentStepIndex && !isOnSuccessPage;

          return (
            <div key={step.path} className="flex items-center space-x-2">
              {/* Icon bulat */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition
                  ${isCompleted ? "bg-[#0891B2] border-[#0891B2]" : ""}
                  ${
                    isActive
                      ? "border-[#0891B2] text-[#0891B2]"
                      : "text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <a
                href={step.path}
                className={`font-medium ${
                  isActive
                    ? "text-[#0891B2]"
                    : isCompleted
                    ? "text-gray-600"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </a>

              {/* Garis penghubung */}
              {index < steps.length - 1 && (
                <ChevronRight
                  className="text-[#0891B2] text-center "
                  size={18}
                  strokeWidth={3}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Tombol Sign Up & Sign In */}
      <div className="flex items-center space-x-3">
        <a
          href="/register"
          className="px-4 py-2 border border-[#0891B2] text-[#0891B2] rounded transition"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="px-4 py-2 bg-[#0891B2]  text-white rounded  transition"
        >
          Sign In
        </a>
      </div>
    </nav>
  );
}
