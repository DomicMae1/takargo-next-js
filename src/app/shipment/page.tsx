"use client";

import React from "react";
import ConfirmationPage from "../confirmation/[kode_pengiriman]/page";

export default function ShipmentDetail({
  params,
}: {
  params: Promise<{ kode_pengiriman: string }>;
}) {
  // ✅ unwrap promise params dengan React.use()
  const { kode_pengiriman } = React.use(params);

  return <ConfirmationPage params={{ kode_pengiriman }} />;
}
