"use client";
import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#20B2AA",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#20B2AA",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#20B2AA",
          },
        },
      },
    },
  },
});
