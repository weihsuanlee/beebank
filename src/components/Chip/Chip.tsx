import classNames from "classnames/bind";
import styles from "./Chip.module.scss";
const cx = classNames.bind(styles);

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}
const Chip = ({ children, className }: ChipProps) => {
  return <span className={cx("root", className)}>{children}</span>;
};

export default Chip;
