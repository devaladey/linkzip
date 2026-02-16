'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TableHead as Th } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from '@/types/link'
import LinksTableRow from './links-table-row'

interface LinksTableProps {
  linksData?: Link[]
}

export function LinksTable({ linksData }: LinksTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Compute effective status for each link
  const getLinkEffectiveStatus = (link: Link): 'active' | 'paused' | 'expired' => {
    const now = new Date()
    if (link.isPaused) return 'paused'
    if (
      (link.expiresAt && new Date(link.expiresAt) < now) ||
      (link.maxClicks && link.clicks >= link.maxClicks)
    ) {
      return 'expired'
    }
    return 'active'
  }

  // Filter links based on search and status
  const filteredLinks = linksData?.filter((link) => {
    const matchesSearch =
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.longUrl.toLowerCase().includes(searchTerm.toLowerCase())

    const effectiveStatus = getLinkEffectiveStatus(link)
    const matchesStatus = !statusFilter || effectiveStatus === statusFilter

    return matchesSearch && matchesStatus
  }) ?? []

  // Pagination logic
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage)
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Clipboard copy handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  // Map status to colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500'
      case 'expired':
        return 'bg-red-500/10 text-red-500'
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <Card className="border-border bg-card">
      <div className="space-y-4 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Your Links
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage and track all your shortened links
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by link or URL..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 bg-input border-border"
            />
          </div>

          <div className="flex gap-2">
            {['all', 'active', 'paused', 'expired'].map((status) => (
              <Button
                key={status}
                size="sm"
                variant={statusFilter === (status === 'all' ? null : status) ? 'default' : 'outline'}
                onClick={() => setStatusFilter(status === 'all' ? null : status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {paginatedLinks.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <Th className="text-muted-foreground">Short Link</Th>
                  <Th className="text-muted-foreground">Original URL</Th>
                  <Th className="text-right text-muted-foreground">Clicks</Th>
                  <Th className="text-right text-muted-foreground">Max Clicks</Th>
                  <Th className="text-center text-muted-foreground">Status</Th>
                  <Th className="text-muted-foreground">Created</Th>
                  <Th className="text-muted-foreground">Expires At</Th>
                  <Th className="text-right text-muted-foreground">Actions</Th>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLinks.map((link) => (
                  <LinksTableRow
                    key={link._id}
                    link={link}
                    handleCopy={handleCopy}
                    getStatusColor={getStatusColor}
                    formatDate={formatDate}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground">No links found</p>
        </div>
      )}
    </Card>
  )
}
