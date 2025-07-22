import React from "react";
import { Chip } from "@mui/material";
import { OrderStatus } from "@/lib/hooks/useOrders";

const statusLabels: Record<OrderStatus, string> = {
  created: "Creado",
  collected: "Recolectado",
  at_station: "En Estación",
  in_transit: "En Ruta",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const statusColors: Record<OrderStatus, { bg: string; color: string }> = {
  created: { bg: "#9fe0a2ff", color: "#327e3fff" },
  collected: { bg: "#BBDEFB", color: "#0D47A1" },
  at_station: { bg: "#FFF9C4", color: "#F57F17" },
  in_transit: { bg: "#D0F5F2", color: "#20B2AA" },
  delivered: { bg: "#C8E6C9", color: "#2E7D32" },
  cancelled: { bg: "#FFCDD2", color: "#C62828" },
};

interface StatusChipProps {
  status: OrderStatus;
}

const StatusChip = ({ status }: StatusChipProps) => {
  const label = statusLabels[status];
  const { bg, color } = statusColors[status];

  return (
    <Chip label={label} sx={{ backgroundColor: bg, color }} size="small" />
  );
};

export default StatusChip;
