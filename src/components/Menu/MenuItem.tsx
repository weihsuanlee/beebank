"use client";

import { MenuItem as MuiMenuItem, ListItemIcon } from "@mui/material";
import { ReactNode } from "react";

interface CustomMenuItemProps {
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

const MenuItem = ({ icon, children, onClick }: CustomMenuItemProps) => (
  <MuiMenuItem onClick={onClick}>
    {icon && <ListItemIcon>{icon}</ListItemIcon>}
    {children}
  </MuiMenuItem>
);

export default MenuItem;
