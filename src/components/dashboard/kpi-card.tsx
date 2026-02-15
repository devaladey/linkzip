import { Card } from '@/components/ui/card'
import { ArrowDown, ArrowUp, LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: number | string
  icon: LucideIcon
  change?: number
  unit?: string
}

export function KPICard({
  title,
  value,
  icon: Icon,
  change,
  unit,
}: KPICardProps) {
  const isPositive = change && change > 0

  return (
    <Card className="border-border bg-card p-6 hover:bg-card/80 transition-colors animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && (
              <span className="text-sm text-muted-foreground">{unit}</span>
            )}
          </div>
          {change !== undefined && (
            <div className="flex items-center gap-1 text-xs">
              {isPositive ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
              <span
                className={isPositive ? 'text-green-500' : 'text-red-500'}
              >
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </div>
        <div className="rounded-lg bg-secondary/50 p-3">
          <Icon className="h-6 w-6 text-accent" />
        </div>
      </div>
    </Card>
  )
}
