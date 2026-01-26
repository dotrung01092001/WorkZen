interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
}: Props<T>) {
  return (
    <table className="w-full border bg-white dark:bg-black">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} className="p-2 text-left">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-t">
            {columns.map((col) => (
              <td key={String(col.key)} className="p-2">
                {col.render ? col.render(row) : String(row[col.key as keyof T])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
