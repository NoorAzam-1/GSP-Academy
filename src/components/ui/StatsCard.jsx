import Card from "./Card";

const bgMap = {
  blue: "bg-blue-50/50 border-blue-100 text-blue-600",
  emerald: "bg-emerald-50/50 border-emerald-100 text-emerald-600",
  amber: "bg-amber-50/50 border-amber-100 text-amber-600",
  rose: "bg-rose-50/50 border-rose-100 text-rose-600",
  purple: "bg-purple-50/50 border-purple-100 text-purple-600",
  slate: "bg-slate-50/50 border-slate-100 text-slate-600",
  indigo: "bg-indigo-50/50 border-indigo-100 text-indigo-600",
};

export default function StatsCard({ title, value, color = "blue" }) {
  return (
    <Card className={`p-4 ${bgMap[color] || bgMap.blue}`}>
      <p className="text-sm font-medium mb-1">{title}</p>
      <h3 className="text-xl font-bold text-slate-900">{value}</h3>
    </Card>
  );
}
