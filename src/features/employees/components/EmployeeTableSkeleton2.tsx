import DataTableSkeleton from "@/components/commons/DataTableSkeleton";

export default function EmployeeTableSkeleton2({
  columns = 5,
  rows = 5,
}: {
  columns?: number;
  rows?: number;
}) {
  return <DataTableSkeleton columns={columns} rows={rows} />;
}
