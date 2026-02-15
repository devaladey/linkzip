'use client'

import { AppSidebar } from './app-sidebar'
import { AppNavbar } from './app-navbar'
import { SidebarProvider } from '@/components/ui/sidebar'

interface DashboardLayoutProps {
  title: string
  children: React.ReactNode
}

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppNavbar title={title} />
        <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
