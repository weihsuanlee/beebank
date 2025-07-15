"use client";

import Header from "@/components/Header/Header";

import classNames from "classnames/bind";
import style from "./layout.module.scss";
const cx = classNames.bind(style);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className={cx("main-content")}>{children}</main>
  </>
);

export default DashboardLayout;
