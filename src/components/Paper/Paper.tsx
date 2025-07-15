import classNames from "classnames/bind";
import style from "./Paper.module.scss";
const cx = classNames.bind(style);

interface PaperProps {
  children: React.ReactNode;
  className?: string;
  sx?: React.CSSProperties;
}

const Paper = ({ children, className, sx }: PaperProps) => {
  return (
    <div className={cx("root", className)} style={sx}>
      {children}
    </div>
  );
};

export default Paper;
