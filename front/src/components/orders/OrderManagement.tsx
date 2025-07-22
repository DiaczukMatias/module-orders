"use client";

import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { LocalShipping, AddCircle } from "@mui/icons-material";
import OrdersTab from "./OrdersTab";
import CreateOrderTab from "./CreateOrderTab";
import useOrders from "@/lib/hooks/useOrders";

export default function OrderManagement() {
  const [tabValue, setTabValue] = useState(0);
  const { orders, loading, updateOrderStatus } = useOrders();
  const role = localStorage.getItem("role");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        marginLeft: "5rem",
        marginRight: "5rem",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Módulo de órdenes
      </Typography>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#20B2AA",
            height: 3,
          },
        }}
      >
        <Tab
          label="Órdenes"
          icon={<LocalShipping />}
          iconPosition="start"
          sx={{
            color: "slategrey",
            "&.Mui-selected": {
              color: "#20B2AA",
            },
            "& .MuiTab-iconWrapper": {
              color: "inherit",
            },
          }}
        />
        {role === "client" && (
          <Tab
            label="Crear Orden"
            icon={<AddCircle />}
            iconPosition="start"
            sx={{
              color: "slategrey",
              "&.Mui-selected": {
                color: "#20B2AA",
              },
              "& .MuiTab-iconWrapper": {
                color: "inherit",
              },
            }}
          />
        )}
      </Tabs>
      <Box sx={{ pt: 3 }}>
        {tabValue === 0 && (
          <OrdersTab updateOrderStatus={updateOrderStatus} orders={orders} />
        )}
        {tabValue === 1 && <CreateOrderTab />}
      </Box>
    </Paper>
  );
}
