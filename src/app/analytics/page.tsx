'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AnalyticsHeader } from '@/components/analytics/analytics-header'
import { ClicksChart } from '@/components/dashboard/clicks-chart'
import { DeviceBreakdown } from '@/components/analytics/device-breakdown'
import { CountryDistribution } from '@/components/analytics/country-distribution'
import { ReferrerTable } from '@/components/analytics/referrer-table'
import { mockLinks } from '@/lib/mock-data'

export default function AnalyticsPage() {
  // Get first link as demo (or you could get from URL params)
  const link = mockLinks[0]

  return (
    <DashboardLayout title={`Analytics - ${link.shortCode}`}>
      <div className="space-y-6">
        {/* Header with link info */}
        <AnalyticsHeader
          shortCode={link.shortCode}
          originalUrl={link.originalUrl}
          totalClicks={link.clicks}
        />

        {/* Charts Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ClicksChart />
          </div>
          <div className="lg:col-span-1">
            <DeviceBreakdown />
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <CountryDistribution />
          <ReferrerTable />
        </div>
      </div>
    </DashboardLayout>
  )
}
