'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { BarChart3, Link2, Settings, LayoutDashboard } from 'lucide-react'
import { UserCard } from './user-card'
import { ThemeToggle } from './theme-toggle'

export function AppSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: '/links', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/links', icon: Link2, label: 'Links' },
    { href: '/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <Link2 className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="font-bold text-sidebar-foreground">LinkFlow</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.href+index}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={`rounded-lg ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                  }`}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="space-y-4 p-4">
          <ThemeToggle />
          <UserCard />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
