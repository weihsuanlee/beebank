"use client";

import { Menu as MuiMenu, MenuProps } from "@mui/material";
import { ReactNode } from "react";

interface CustomMenuProps extends MenuProps {
  children: ReactNode;
}

const Menu = ({ children, ...props }: CustomMenuProps) => {
  return (
    <MuiMenu
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.05))",
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      {...props}
    >
      {children}
    </MuiMenu>
  );
};

export default Menu;
