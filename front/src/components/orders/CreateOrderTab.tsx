"use client";

import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  InputAdornment,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

import useCreateOrder from "@/lib/hooks/useCreateOrder";
import {
  AddCircle,
  Apartment,
  LocalShipping,
  LocationOn,
} from "@mui/icons-material";

export default function CreateOrderTab() {
  const {
    origin,
    destination,
    orderDetails,
    loading,
    setError,
    error,
    handleOriginChange,
    handleDestinationChange,
    handleOrderDetailsChange,
    submitOrder,
    isOversizedPackage,
  } = useCreateOrder();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitOrder();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Box
        display="flex"
        gap={3}
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <Box flex={1}>
          <Paper elevation={2} sx={{ p: 3, mb: 3, border: "1px solid #eee" }}>
            <Box display="flex" alignItems="center">
              <LocationOn sx={{ color: "#20B2AA", fontSize: 20 }} />
              <Typography variant="h6" ml={1}>
                Origen
              </Typography>
            </Box>
            <Typography
              variant="body1"
              mb={2}
              color="text.secondary"
              gutterBottom
            >
              Detalles del lugar de recogida
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Calle "
                  fullWidth
                  value={origin.address}
                  onChange={(e) =>
                    handleOriginChange("address", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Número Externo "
                  fullWidth
                  value={origin.ext_num}
                  onChange={(e) =>
                    handleOriginChange("ext_num", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Número Interno"
                  fullWidth
                  value={origin.int_num}
                  onChange={(e) =>
                    handleOriginChange("int_num", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Código Postal "
                  fullWidth
                  value={origin.zipcode}
                  onChange={(e) =>
                    handleOriginChange("zipcode", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Provincia "
                  fullWidth
                  value={origin.state}
                  onChange={(e) => handleOriginChange("state", e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Latitud"
                  fullWidth
                  type="number"
                  value={origin.lat}
                  onChange={(e) => handleOriginChange("lat", e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">°</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Longitud"
                  fullWidth
                  type="number"
                  value={origin.lng}
                  onChange={(e) => handleOriginChange("lng", e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">°</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box flex={1}>
          <Paper elevation={2} sx={{ p: 3, mb: 3, border: "1px solid #eee" }}>
            <Box display="flex" alignItems="center">
              <LocalShipping sx={{ color: "#20B2AA", fontSize: 20 }} />

              <Typography variant="h6" ml={1}>
                Destino
              </Typography>
            </Box>
            <Typography
              variant="body1"
              mb={2}
              color="text.secondary"
              gutterBottom
            >
              Detalles del lugar de entrega
            </Typography>
            <Grid container spacing={2}>
              <Grid item component="div" xs={12}>
                <TextField
                  label="Calle "
                  fullWidth
                  value={destination.address}
                  onChange={(e) =>
                    handleDestinationChange("address", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Número Externo "
                  fullWidth
                  value={destination.ext_num}
                  onChange={(e) =>
                    handleDestinationChange("ext_num", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Número Interno"
                  fullWidth
                  value={destination.int_num}
                  onChange={(e) =>
                    handleDestinationChange("int_num", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Código Postal"
                  fullWidth
                  value={destination.zipcode}
                  onChange={(e) =>
                    handleDestinationChange("zipcode", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Provincia "
                  fullWidth
                  value={destination.state}
                  onChange={(e) =>
                    handleDestinationChange("state", e.target.value)
                  }
                  required
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Latitud"
                  fullWidth
                  type="number"
                  value={destination.lat}
                  onChange={(e) =>
                    handleDestinationChange("lat", e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">°</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  label="Longitud"
                  fullWidth
                  type="number"
                  value={destination.lng}
                  onChange={(e) =>
                    handleDestinationChange("lng", e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">°</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />

      <Paper
        elevation={3}
        sx={{ p: 3, mb: 3, border: "1px solid #eee", position: "relative" }}
      >
        <Box display="flex" alignItems="center">
          <Apartment sx={{ color: "#20B2AA", fontSize: 20 }} />

          <Typography variant="h6" ml={1}>
            Detalles del envío
          </Typography>
        </Box>

        <Typography variant="body1" mb={2} color="text.secondary" gutterBottom>
          Especificar productos y peso
        </Typography>

        {isOversizedPackage() && (
          <Alert
            severity="warning"
            sx={{
              mb: 2,
              backgroundColor: "#fff8e1",
              borderLeft: "4px solid #ffa000",
            }}
          >
            <Typography variant="body2" fontWeight="bold">
              Paquete demasiado grande
            </Typography>
            <Typography variant="body2">
              Peso: {orderDetails.totalWeightKg}kg - Tamaño: Personalizado (XXL)
            </Typography>
            <Typography variant="body2">
              No hay servicio estándar disponible. Por favor contacte a nuestro
              equipo de soporte para arreglos de envío personalizados.
            </Typography>
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <TextField
              label="Número de Productos "
              type="number"
              fullWidth
              value={orderDetails.productCount}
              onChange={(e) =>
                handleOrderDetailsChange("productCount", e.target.value)
              }
              required
              disabled={isOversizedPackage()}
            />
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              label="Peso Total (kg) "
              type="number"
              fullWidth
              value={orderDetails.totalWeightKg}
              onChange={(e) => {
                handleOrderDetailsChange("totalWeightKg", e.target.value);
                // Validación en tiempo real
                if (parseFloat(e.target.value) > 25) {
                  setError("");
                }
              }}
              required
              error={isOversizedPackage()}
              helperText={
                isOversizedPackage() ? "Peso máximo permitido: 25kg" : ""
              }
            />
          </Grid>
        </Grid>
      </Paper>

      <Box display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<AddCircle />}
          sx={{
            textTransform: "none",
            backgroundColor: "#20B2AA",
            "&:hover": {
              backgroundColor: "#1a9c95",
            },
            "&:disabled": {
              backgroundColor: "#e0e0e0",
            },
          }}
          disabled={loading || isOversizedPackage()}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Crear Orden"
          )}
        </Button>
      </Box>
    </Box>
  );
}
