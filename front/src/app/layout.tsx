import type { Metadata } from "next";
import "./globals.css";
import { customTheme } from "@/theme/theme";
import { ThemeProvider } from "@mui/material";

export const metadata: Metadata = {
  title: "Módulo de órdenes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
