import EmptyState from "./EmptyState";

export default function Table({ headers, children, emptyMessage }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className={`px-6 py-4 ${header.align === "right" ? "text-right" : ""}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}
