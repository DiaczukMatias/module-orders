"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import useToken from "@/lib/hooks/useToken";
import { LocalShipping } from "@mui/icons-material";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const router = useRouter();
  const { saveToken } = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      saveToken(data.token);
      localStorage.setItem("role", data.user.role);
      setLoading(false);

      if (data.user.role === "admin") {
        router.push("/dashboard/admin/orders");
      } else {
        router.push("/dashboard/client/orders");
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(
        error.response?.data?.message ||
          "Error al iniciar sesión, intentalo de nuevo."
      );
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" fontWeight="600" textAlign="center" mb={3}>
          Iniciar sesión
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <FormControl fullWidth required margin="normal" variant="outlined">
          <InputLabel htmlFor="email" shrink>
            Correo electrónico
          </InputLabel>
          <OutlinedInput
            id="email"
            type="email"
            autoComplete="email"
            label="Correo electrónico"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #fff inset",
                WebkitTextFillColor: "#000",
                caretColor: "#000",
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth required margin="normal" variant="outlined">
          <InputLabel htmlFor="password" shrink>
            Contraseña
          </InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            autoComplete="current-password"
            label="Contraseña"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& input:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #fff inset",
                WebkitTextFillColor: "#000",
                caretColor: "#000",
              },
            }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          startIcon={!loading && <LocalShipping sx={{ fontSize: 20 }} />}
          sx={{
            mt: 3,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            letterSpacing: "0.5px",
            backgroundColor: "#20B2AA",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            },
            "& .MuiButton-startIcon": {
              marginRight: "8px",
            },
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Ingresar"
          )}
        </Button>
      </Paper>
    </Box>
  );
}
