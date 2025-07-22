import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Logout from "./LogOut";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "calc(100% - 240px)",
          minHeight: "100vh",
          backgroundColor: "#778899",
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <Logout />
        </Box>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
