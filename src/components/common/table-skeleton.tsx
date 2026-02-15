import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function TableSkeleton() {
  return (
    <Card className="border-border bg-card">
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="space-y-4 px-6 pb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-12 w-20" />
          </div>
        ))}
      </div>
    </Card>
  )
}
