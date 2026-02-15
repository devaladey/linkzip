'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'

export function UserCard() {
  const handleLogout = () => {
    toast.success('Logged out successfully')
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-sidebar-accent/50 p-3">
        <div className="text-xs font-semibold text-sidebar-foreground">
          john@example.com
        </div>
        <div className="text-xs text-sidebar-foreground/60">Pro Plan</div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="w-full justify-start gap-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/30"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  )
}
