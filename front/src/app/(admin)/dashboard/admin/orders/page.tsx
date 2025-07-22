"use client";

import React from "react";
import OrderManagement from "@/components/orders/OrderManagement";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <OrderManagement />
    </DashboardLayout>
  );
}
