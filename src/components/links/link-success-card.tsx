'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Copy, Share2, X } from 'lucide-react'
import { toast } from 'sonner'
import QRCode from 'react-qr-code'

interface LinkSuccessCardProps {
  shortCode: string
  onClose: () => void
}

export function LinkSuccessCard({ shortCode, onClose }: LinkSuccessCardProps) {
  const [copied, setCopied] = useState(false)
  const shortLink = `linkf.io/${shortCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink)
    setCopied(true)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out my short link',
        text: 'I created a short link using LinkFlow',
        url: shortLink,
      })
    } else {
      handleCopy()
    }
  }

  return (
    <Card className="relative border-accent/30 bg-gradient-to-r from-card to-secondary/20 p-6">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute right-4 top-4 h-8 w-8 active:scale-90 active:brightness-90 transition-transform duration-150"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Success Icon */}
        <div className="rounded-lg bg-green-500/10 p-3 flex-shrink-0">
          <Check className="h-6 w-6 text-green-500" />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Link Created Successfully!
            </h3>
            <p className="text-sm text-muted-foreground">
              Your short link is ready to share
            </p>
          </div>

          {/* Short Link Display */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              SHORT LINK
            </p>
            <div className="flex items-center gap-2 rounded-lg bg-secondary/50 p-3 font-mono text-sm text-accent">
              <span className="flex-1 break-all">{shortLink}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 w-8 p-0 active:scale-90 active:brightness-90 transition-transform duration-150"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button
              onClick={handleCopy}
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 active:scale-95 active:brightness-90 transition-transform duration-150"
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="gap-2 active:scale-95 active:brightness-90 transition-transform duration-150"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* QR Code */}
          <div className="rounded-lg border border-border bg-secondary/20 p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              QR CODE
            </p>
            <div className="aspect-square w-full max-w-[200px] rounded-lg bg-foreground/10 flex items-center justify-center">
              {shortCode && (
                <div className="mt-4 flex justify-center">
                  <QRCode
                    value={`${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`}
                    size={150}
                    fgColor="#1e293b"
                    bgColor="#fff"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
