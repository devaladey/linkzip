'use client'

import { Card } from '@/components/ui/card'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { mockCountryDistribution } from '@/lib/mock-data'

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

export function CountryDistribution() {
  const total = mockCountryDistribution.reduce(
    (sum, item) => sum + item.value,
    0
  )

  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Top Countries
          </h3>
          <p className="text-sm text-muted-foreground">
            Geographic distribution of clicks
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Pie
              data={mockCountryDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {mockCountryDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2">
          {mockCountryDistribution.map((item, index) => {
            const percentage = ((item.value / total) * 100).toFixed(1)
            return (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-lg bg-secondary/20 p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {item.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
