import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface OccupancyChartProps {
  occupied: number
  vacant: number
}

const COLORS = ["#4CAF50", "#FFA726"]

export function OccupancyChart({ occupied, vacant }: OccupancyChartProps) {
  const data = [
    { name: "Utleid", value: occupied },
    { name: "Tilgjengelig", value: vacant },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Utleiegrad</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

