"use client";

import { useAuth } from "@/contexts/AuthProvider/useAuth";

import classNames from "classnames/bind";
import style from "./Greeting.module.scss";
const cx = classNames.bind(style);

const Greeting = () => {
  const { user } = useAuth();

  return (
    <div className={cx("root")}>
      <h1>Hello, {user?.username || "User"}!</h1>
    </div>
  );
};

export default Greeting;
