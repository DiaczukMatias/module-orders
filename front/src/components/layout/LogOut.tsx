"use client";

import useToken from "@/lib/hooks/useToken";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { removeToken } = useToken();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/");
  };

  return (
    <Tooltip title="Cerrar sesión">
      <IconButton onClick={handleLogout} color="inherit">
        <LogoutIcon sx={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
};

export default Logout;
