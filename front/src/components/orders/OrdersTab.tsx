"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import {
  LocalShipping,
  LocationOn,
  ShoppingBasket,
  AllInbox,
  Edit,
} from "@mui/icons-material";
import { OrderData } from "@/types/order";
import StatusChip from "./StatusChip";
import EditStatusDialog from "./EditStatusDialog";
import { OrderStatus } from "@/lib/hooks/useOrders";

export default function OrdersTab({
  orders,
  updateOrderStatus,
}: {
  orders: OrderData[];
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>("created");

  const handleOpenDialog = (orderId: string, currentStatus: OrderStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(currentStatus);
    setDialogOpen(true);
  };

  const handleSaveStatus = (newStatus: OrderStatus) => {
    if (selectedOrderId) {
      updateOrderStatus(selectedOrderId, newStatus);
    }
  };

  if (orders && orders.length === 0) {
    return (
      <Typography variant="body1" textAlign="center" py={4}>
        No hay órdenes registradas.
      </Typography>
    );
  }

  const role = localStorage.getItem("role");

  return (
    <Grid container spacing={3}>
      {orders &&
        orders.map((order, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#20B2AA" }}
                    fontWeight="bold"
                  >
                    Orden #{index + 1}
                  </Typography>
                  <Box>
                    {role === "admin" && (
                      <IconButton
                        aria-label="Editar estado"
                        onClick={() =>
                          handleOpenDialog(
                            order._id,
                            order.status as OrderStatus
                          )
                        }
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    )}

                    <StatusChip
                      status={(order.status as OrderStatus) || "created"}
                    />
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <LocationOn sx={{ color: "#20B2AA", fontSize: 20 }} />
                  <Typography>
                    <strong>Origen:</strong> {order.origin.address.address}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <LocalShipping sx={{ color: "#20B2AA", fontSize: 20 }} />
                  <Typography>
                    <strong>Destino:</strong>{" "}
                    {order.destination.address.address}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2, borderColor: "#20B2AA" }} />

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <ShoppingBasket sx={{ color: "#20B2AA", fontSize: 20 }} />
                  <Typography>
                    <strong>Productos:</strong> {order.productCount}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <AllInbox sx={{ color: "#20B2AA", fontSize: 20 }} />
                  <Typography>
                    <strong>Peso total:</strong> {order.totalWeightKg} kg
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      <EditStatusDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        currentStatus={selectedStatus}
        onSave={handleSaveStatus}
      />
    </Grid>
  );
}
