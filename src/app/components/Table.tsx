const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any; // Changed from data: any[] to accept any type of data
}) => {
  // Convert data to array if it's not already one
  const safeData = Array.isArray(data) ? data : [];

  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {safeData.length > 0 ? (
          safeData.map((item) => renderRow(item))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="py-4 text-center text-gray-500"
            >
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;