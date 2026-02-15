'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, ExternalLink, Edit2 } from 'lucide-react'
import { toast } from 'sonner'

interface AnalyticsHeaderProps {
  shortCode: string
  originalUrl: string
  totalClicks: number
}

export function AnalyticsHeader({
  shortCode,
  originalUrl,
  totalClicks,
}: AnalyticsHeaderProps) {
  const shortLink = `linkf.io/${shortCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink)
    toast.success('Copied to clipboard')
  }

  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              SHORT LINK
            </p>
            <div className="flex items-center gap-3">
              <code className="font-mono text-lg text-accent font-semibold">
                {shortLink}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            ORIGINAL URL
          </p>
          <div className="flex items-center gap-2">
            <a
              href={originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 truncate text-sm text-accent hover:underline"
            >
              {originalUrl}
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-secondary/20 p-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Clicks</p>
            <p className="text-2xl font-bold text-foreground">
              {totalClicks.toLocaleString()}
            </p>
          </div>
          <Badge className="bg-green-500/10 text-green-500">
            Active
          </Badge>
        </div>
      </div>
    </Card>
  )
}
