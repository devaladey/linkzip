'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { QrCode, Check } from 'lucide-react'
import { toast } from 'sonner'

interface CreateLinkFormProps {
  onSuccess?: (shortCode: string) => void
}

export function CreateLinkForm({ onSuccess }: CreateLinkFormProps) {
  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [enableQR, setEnableQR] = useState(true)
  const [isChecking, setIsChecking] = useState(false)
  const [aliasAvailable, setAliasAvailable] = useState<boolean | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleCheckAlias = async (alias: string) => {
    if (!alias) {
      setAliasAvailable(null)
      return
    }

    setIsChecking(true);

    try {
      const response = await fetch(`/api/check-alias?alias=${encodeURIComponent(alias)}`)
      const data = await response.json()

      if (response.ok) {
        setAliasAvailable(data.available)
        if (!data.available) {
          toast.error('This alias is already taken')
        }
      } else {
        toast.error(data.error || 'Failed to check alias')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while checking the alias')
    } finally {
      setIsChecking(false)
    }

  }

  const handleGenerate = async () => {
    if (!longUrl) {
      toast.error('Please enter a URL')
      return
    }

    // Simple URL validation
    try {
      new URL(longUrl)
    } catch {
      toast.error('Please enter a valid URL')
      return
    }

    if (customAlias && !aliasAvailable) {
      toast.error('Please choose a different alias')
      return
    }

    setIsGenerating(true)

    try {      const response = await fetch('/api/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl, customAlias }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Link created successfully!')
        onSuccess?.(data.shortCode)

        // Reset form
        setLongUrl('')
        setCustomAlias('')
        setAliasAvailable(null)
      } else {
        toast.error(data.error || 'Failed to create link')
      }
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while creating the link')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card className="border-border bg-card p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Create New Link
          </h3>
          <p className="text-sm text-muted-foreground">
            Generate a short, memorable link for your content
          </p>
        </div>

        <div className="space-y-4">
          {/* Long URL Input */}
          <div className="space-y-2">
            <Label htmlFor="longUrl" className="text-foreground">
              Long URL
            </Label>
            <Input
              id="longUrl"
              placeholder="https://example.com/very-long-url-that-needs-shortening"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="border-border bg-input"
            />
            <p className="text-xs text-muted-foreground">
              The original URL you want to shorten
            </p>
          </div>

          {/* Custom Alias Input */}
          <div className="space-y-2">
            <Label htmlFor="alias" className="text-foreground">
              Custom Alias (Optional)
            </Label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="alias"
                  placeholder="mycustom"
                  value={customAlias}
                  onChange={(e) => {
                    setCustomAlias(e.target.value)
                    if (e.target.value) {
                      handleCheckAlias(e.target.value)
                    } else {
                      setAliasAvailable(null)
                    }
                  }}
                  className="border-border bg-input"
                />
              </div>
              {customAlias && (
                <div className="flex items-center">
                  {isChecking ? (
                    <Badge variant="outline">Checking...</Badge>
                  ) : aliasAvailable ? (
                    <Badge className="bg-green-500/10 text-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Available
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500/10 text-red-500">
                      Taken
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              linkf.io/<span className="text-accent">{customAlias || 'your-alias'}</span>
            </p>
          </div>

          {/* QR Code Toggle */}
          <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/20 p-4">
            <Checkbox
              id="qr"
              checked={enableQR}
              onCheckedChange={(checked) => setEnableQR(!!checked)}
            />
            <div className="flex-1">
              <Label
                htmlFor="qr"
                className="text-foreground cursor-pointer font-medium"
              >
                Generate QR Code
              </Label>
              <p className="text-xs text-muted-foreground">
                Create a QR code for easy sharing
              </p>
            </div>
            <QrCode className="h-5 w-5 text-accent" />
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !longUrl}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {isGenerating ? 'Creating...' : 'Create Link'}
        </Button>
      </div>
    </Card>
  )
}
