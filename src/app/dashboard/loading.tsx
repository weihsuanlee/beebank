import Skeleton from "@/components/Skeleton/Skeleton";

import classNames from "classnames/bind";
import style from "./page.module.scss";
const cx = classNames.bind(style);

const Loading = () => (
  <>
    <Skeleton variant="text" style={{ marginBottom: "0.5rem" }} />
    <Skeleton variant="text" style={{ marginBottom: "1rem" }} />
    <div className={cx("dashboard-row")}>
      <Skeleton variant="rounded" style={{ borderRadius: "1rem" }} width="calc(50% - 0.5rem)" height="400px" />
      <Skeleton variant="rounded" style={{ borderRadius: "1rem" }} width="calc(50% - 0.5rem)" height="400px" />
    </div>
  </>
);

export default Loading;
