"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthProvider/useAuth";
import LetterAvatar from "@/components/LetterAvatar/LetterAvatar";

import Menu from "@/components/Menu/Menu";
import MenuItem from "@/components/Menu/MenuItem";
import Logout from "@mui/icons-material/Logout";

import classNames from "classnames/bind";
import style from "./Header.module.scss";
const cx = classNames.bind(style);

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <header className={cx("root")}>
      <div className={cx("left")}>
        <Link href="/dashboard" className={cx("logo")}>
          <div className={cx("icon")}>🐝</div>
          <div className={cx("name")}>BeeBank</div>
        </Link>
      </div>
      <div className={cx("avatar")} onClick={handleClick}>
        <LetterAvatar
          name={user?.username}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          alt={user?.username}
        />
      </div>
      <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
        <MenuItem onClick={handleLogout} icon={<Logout fontSize="small" />}>
          Logout
        </MenuItem>
      </Menu>
    </header>
  );
};

export default Header;
