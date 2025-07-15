import Skeleton from "@/components/Skeleton/Skeleton";

const TransactionsSkeleton = () => {
  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="40%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="40%" />
    </div>
  );
};

export default TransactionsSkeleton;
