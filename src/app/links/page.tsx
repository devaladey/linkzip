'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { CreateLinkForm } from '@/components/links/create-link-form'
import { LinksTable } from '@/components/links/links-table'
import { LinkSuccessCard } from '@/components/links/link-success-card'
import { Button } from '@/components/ui/button'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from '@/types/link'

export default function LinksPage() {
  const [successLink, setSuccessLink] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const queryClient = useQueryClient();


  const { data: linksData } = useQuery<Link[]>({
    queryKey: ['links'],
    queryFn: async () => {
      return fetch("/api/link").then(res => res.json()).then(data => data.links);
    },
  });

  return (
    <DashboardLayout title="Links">
      <div className="space-y-6">
        {/* Success Card */}
        {successLink && (
          <LinkSuccessCard
            shortCode={successLink}
            onClose={() => setSuccessLink(null)}
          />
        )}

        {/* New Link Button */}
        <div className="flex justify-end">
            <Button onClick={() => setShowForm(!showForm)} className='cursor-pointer'>
              {showForm ? "Hide Form" : "+ New Link"}
            </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Links Table */}
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <LinksTable linksData={linksData} />
          </div>
          {/* Create Link Form */}
          {showForm && (
            <div className="lg:col-span-1">
              <CreateLinkForm
                onSuccess={(code) => {
                  setSuccessLink(code)
                  setShowForm(false) // hide form after success
                  queryClient.invalidateQueries({queryKey: ['links']});
                }}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
