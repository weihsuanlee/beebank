import { default as MuiSkeleton } from "@mui/material/Skeleton";

interface SkeletonProps {
  variant?: "text" | "rounded";
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}

const Skeleton = (props: SkeletonProps) => {
  return <MuiSkeleton {...props} />;
};

export default Skeleton;
