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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink } from 'lucide-react'
import { mockLinks } from '@/lib/mock-data'
import { toast } from 'sonner'

export function TopLinksTable() {
  const topLinks = [...mockLinks].sort((a, b) => b.clicks - a.clicks).slice(0, 5)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500'
      case 'expired':
        return 'bg-red-500/10 text-red-500'
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <Card className="border-border bg-card">
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Top Performing Links
            </h3>
            <p className="text-sm text-muted-foreground">
              Your most popular links this month
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Short Link</TableHead>
              <TableHead className="text-muted-foreground">Original URL</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Clicks
              </TableHead>
              <TableHead className="text-center text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-right text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topLinks.map((link) => (
              <TableRow key={link.id} className="border-border hover:bg-secondary/30">
                <TableCell className="font-mono text-sm text-accent">
                  linkf.io/{link.shortCode}
                </TableCell>
                <TableCell className="max-w-xs text-sm text-foreground">
                  <span className="truncate">
                    {link.originalUrl.replace('https://', '')}
                  </span>
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground">
                  {link.clicks.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={`${getStatusColor(link.status)}`}>
                    {link.status.charAt(0).toUpperCase() + link.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(`linkf.io/${link.shortCode}`)}
                      className="h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
