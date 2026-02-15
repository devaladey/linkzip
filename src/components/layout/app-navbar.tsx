'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bell, Plus, Search } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface AppNavbarProps {
  title: string
}

export function AppNavbar({ title }: AppNavbarProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <SidebarTrigger />
          
          <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden items-center gap-2 lg:flex">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-input"
              />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            onClick={() => router.push('/links')}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
