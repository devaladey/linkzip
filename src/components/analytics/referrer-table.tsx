'use client'

import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockReferrers } from '@/lib/mock-data'

export function ReferrerTable() {
  const total = mockReferrers.reduce((sum, item) => sum + item.clicks, 0)

  return (
    <Card className="border-border bg-card">
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Top Referrers
          </h3>
          <p className="text-sm text-muted-foreground">
            Where your clicks are coming from
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Referrer</TableHead>
              <TableHead className="text-right text-muted-foreground hidden sm:table-cell">
                Clicks
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Percentage
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReferrers.map((item) => {
              const percentage = ((item.clicks / total) * 100).toFixed(1)
              return (
                <TableRow key={item.referrer} className="border-border hover:bg-secondary/30">
                  <TableCell className="text-sm text-foreground">
                    {item.referrer === 'Direct' ? (
                      <span className="font-medium">{item.referrer}</span>
                    ) : (
                      <a
                        href={`https://${item.referrer}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline truncate"
                      >
                        {item.referrer}
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground hidden sm:table-cell">
                    {item.clicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="hidden sm:block w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-accent/50"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-accent w-12 text-right">
                        {percentage}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
