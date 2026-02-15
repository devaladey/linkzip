'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Copy, Zap } from 'lucide-react'
import { toast } from 'sonner'

export default function SettingsPage() {
  const apiKey = 'sk_live_abc123def456ghi789jkl'

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast.success('API key copied')
  }

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-8">
        {/* Account Settings */}
        <Card className="border-border bg-card p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Account Settings
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your account information
              </p>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  className="mt-2 bg-input border-border"
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  defaultValue="John Doe"
                  className="mt-2 bg-input border-border"
                />
              </div>

              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Save Changes
              </Button>
            </div>
          </div>
        </Card>

        {/* Plan Information */}
        <Card className="border-border bg-card p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Current Plan
                </h2>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription
                </p>
              </div>
              <Badge className="bg-accent text-accent-foreground">
                <Zap className="mr-1 h-3 w-3" />
                Pro Plan
              </Badge>
            </div>

            <Separator className="bg-border" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg bg-secondary/20 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Links Per Month
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  Unlimited
                </p>
              </div>
              <div className="rounded-lg bg-secondary/20 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Analytics
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  Advanced
                </p>
              </div>
              <div className="rounded-lg bg-secondary/20 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  Support
                </p>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  24/7
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Upgrade Plan
            </Button>
          </div>
        </Card>

        {/* API Keys */}
        <Card className="border-border bg-card p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                API Keys
              </h2>
              <p className="text-sm text-muted-foreground">
                Manage your API credentials
              </p>
            </div>

            <Separator className="bg-border" />

            <div className="space-y-3">
              <Label className="text-foreground">Live API Key</Label>
              <div className="flex items-center gap-2 rounded-lg bg-input p-3">
                <code className="flex-1 font-mono text-sm text-muted-foreground">
                  {apiKey}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyApiKey}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this key to authenticate API requests. Keep it secret!
              </p>
            </div>

            <Button variant="outline">
              Generate New Key
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-500/30 bg-red-500/5 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-red-500">
                Danger Zone
              </h2>
              <p className="text-sm text-muted-foreground">
                Irreversible actions
              </p>
            </div>

            <Separator className="bg-red-500/20" />

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-3">
                  Delete Account
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data
                </p>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
