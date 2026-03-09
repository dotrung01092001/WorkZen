import DataTableSkeleton from "@/components/commons/DataTableSkeleton";

export default function EmployeeTableSkeleton1({
  columns = 4,
  rows = 5,
}: {
  columns?: number;
  rows?: number;
}) {
  return <DataTableSkeleton columns={columns} rows={rows} />;
}
