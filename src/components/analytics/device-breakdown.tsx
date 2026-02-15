'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { mockDeviceBreakdown } from '@/lib/mock-data'

export function DeviceBreakdown() {
  const data = mockDeviceBreakdown.map((item) => ({
    name:
      item.device.charAt(0).toUpperCase() + item.device.slice(1),
    value: item.count,
  }))

  const total = mockDeviceBreakdown.reduce((sum, item) => sum + item.count, 0)

  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Device Breakdown
          </h3>
          <p className="text-sm text-muted-foreground">
            Clicks by device type
          </p>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              cursor={{ fill: 'hsl(var(--secondary))' }}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--chart-2))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4">
          {data.map((item) => {
            const percentage = ((item.value / total) * 100).toFixed(1)
            return (
              <div key={item.name} className="rounded-lg bg-secondary/20 p-3">
                <p className="text-xs text-muted-foreground">{item.name}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {item.value.toLocaleString()}
                </p>
                <p className="text-xs text-accent">{percentage}%</p>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
