export default function EmptyState({ message = "No data found." }) {
  return (
    <tr>
      <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
        {message}
      </td>
    </tr>
  );
}
