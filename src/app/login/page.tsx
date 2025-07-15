import LoginForm from "@/features/login/LoginForm";

import classNames from "classnames/bind";
import style from "./page.module.scss";
const cx = classNames.bind(style);

const LoginPage = () => (
  <div className={cx("root")}>
    <LoginForm />
  </div>
);

export default LoginPage;
