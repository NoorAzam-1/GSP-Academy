"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import Card from "@/components/ui/Card";
import { COURSE_DISTRIBUTION, CHART_COLORS } from "@/constants";

export default function EnrollmentChart() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">
        Enrollment by Category
      </h3>
      <div className="h-72 w-full" style={{ minHeight: "288px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={COURSE_DISTRIBUTION}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {COURSE_DISTRIBUTION.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {COURSE_DISTRIBUTION.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center text-xs text-slate-600"
          >
            <span
              className="w-3 h-3 rounded-full mr-2 shrink-0"
              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </Card>
  );
}
