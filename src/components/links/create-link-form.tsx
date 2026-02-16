'use client'

import { useState, useEffect } from 'react'
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

  // New fields
  const [expiresAt, setExpiresAt] = useState<string>('') // YYYY-MM-DD
  const [maxClicks, setMaxClicks] = useState<number | ''>('')

  // Debounce alias check
  useEffect(() => {
    if (!customAlias) {
      setAliasAvailable(null)
      return
    }

    const timer = setTimeout(() => {
      checkAlias(customAlias)
    }, 500)

    return () => clearTimeout(timer)
  }, [customAlias])

  const checkAlias = async (alias: string) => {
    setIsChecking(true)
    try {
      const res = await fetch(`/api/check-alias?alias=${encodeURIComponent(alias)}`)
      const data = await res.json()

      if (res.ok) {
        setAliasAvailable(data.available)
      } else {
        toast.error(data.error || 'Failed to check alias')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error checking alias')
    } finally {
      setIsChecking(false)
    }
  }

  const handleGenerate = async () => {
    if (!longUrl) {
      toast.error('Please enter a URL')
      return
    }

    try {
      new URL(longUrl)
    } catch {
      toast.error('Please enter a valid URL')
      return
    }

    if (customAlias && aliasAvailable === false) {
      toast.error('Alias is taken. Choose another one.')
      return
    }

    setIsGenerating(true)
    try {
      const res = await fetch('/api/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          longUrl,
          customAlias,
          enableQR,
          expiresAt: expiresAt || null,
          maxClicks: maxClicks || null,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Link created successfully!')
        onSuccess?.(data.shortCode)
        // Reset form
        setLongUrl('')
        setCustomAlias('')
        setAliasAvailable(null)
        setExpiresAt('')
        setMaxClicks('')
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
          <h3 className="text-lg font-semibold text-foreground">Create New Link</h3>
          <p className="text-sm text-muted-foreground">
            Generate a short, memorable link for your content
          </p>
        </div>

        {/* Long URL */}
        <div className="space-y-2">
          <Label htmlFor="longUrl">Long URL</Label>
          <Input
            id="longUrl"
            placeholder="https://example.com/very-long-url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </div>

        {/* Custom Alias */}
        <div className="space-y-2">
          <Label htmlFor="alias">Custom Alias (Optional)</Label>
          <div className="flex gap-2 items-center">
            <Input
              id="alias"
              placeholder="mycustom"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
            />
            {customAlias && (
              <>
                {isChecking ? (
                  <Badge variant="outline">Checking...</Badge>
                ) : aliasAvailable ? (
                  <Badge className="bg-green-500/10 text-green-500 flex items-center">
                    <Check className="h-3 w-3 mr-1" /> Available
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/10 text-red-500">Taken</Badge>
                )}
              </>
            )}
          </div>
        </div>

        {/* Expiration Date */}
        <div className="space-y-2">
          <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
          <Input
            id="expiresAt"
            type="date"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          <p className="text-xs text-muted-foreground">
            The link will stop working after this date
          </p>
        </div>

        {/* Maximum Clicks */}
        <div className="space-y-2">
          <Label htmlFor="maxClicks">Maximum Clicks (Optional)</Label>
          <Input
            id="maxClicks"
            type="number"
            min={1}
            placeholder="Enter max number of clicks"
            value={maxClicks}
            onChange={(e) => setMaxClicks(e.target.value ? parseInt(e.target.value) : '')}
          />
          <p className="text-xs text-muted-foreground">
            The link will stop working after this many clicks
          </p>
        </div>

        {/* QR Code Toggle */}
        <div className="flex items-center gap-3 border border-border rounded-lg p-4 bg-secondary/20">
          <Checkbox
            id="qr"
            checked={enableQR}
            onCheckedChange={(checked) => setEnableQR(!!checked)}
          />
          <div className="flex-1">
            <Label htmlFor="qr" className="cursor-pointer font-medium">
              Generate QR Code
            </Label>
          </div>
          <QrCode className="h-5 w-5 text-accent" />
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
