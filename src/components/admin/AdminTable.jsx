const AdminTable = ({ columns, rows, emptyMessage = "No records found." }) => (
  <div className="admin-table-wrap">
    <table className="admin-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((row) => (
            <tr key={row._id || row.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key] || "-"}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className="admin-table__empty" colSpan={columns.length}>
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default AdminTable;
