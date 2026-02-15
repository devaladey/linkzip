'use client'

import { Card } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { mockClicksTrend } from '@/lib/mock-data'

export function ClicksChart() {
  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Clicks Overview
          </h3>
          <p className="text-sm text-muted-foreground">
            Last 30 days of click activity
          </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockClicksTrend}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => value.split(' ')[1]}
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
              cursor={{ stroke: 'hsl(var(--accent))' }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="hsl(var(--chart-1))"
              dot={false}
              strokeWidth={2}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
