'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Copy,
  ExternalLink,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@/types/link'

export function LinksTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const itemsPerPage = 10

  const { data: linksData } = useQuery<Link[]>({
    queryKey: ['links'],
    queryFn: async () => {
      return fetch("/api/link").then(res => res.json()).then(data => data.links);
    },
  });

  console.log("Fetched links:", linksData) // Log the fetched data;

  // Filter links
  const filteredLinks = linksData?.filter((link) => {
    const matchesSearch =
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.longUrl.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || link.status === statusFilter

    return matchesSearch && matchesStatus
  }) ?? [];

  // Pagination
  const totalPages = Math.ceil(filteredLinks.length / itemsPerPage)
  const paginatedLinks = filteredLinks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const handleDelete = (linkId: string) => {
    setLoadingDelete(true);
    try {
      fetch(`/api/link/${linkId}`, {
        method: 'DELETE',
      }).then(res => res.json()).then(data => {
        if (data.success) {
          toast.success('Link deleted')
        } else {
          toast.error(data.error || 'Failed to delete link')
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('An error occurred while deleting the link')
    } finally {
      setLoadingDelete(false);
    }
  }

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
            {['all', 'active', 'expired', 'paused'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === (status === 'all' ? null : status) ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  setStatusFilter(status === 'all' ? null : status)
                }
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
                  <TableHead className="text-muted-foreground">
                    Short Link
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Original URL
                  </TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Clicks
                  </TableHead>
                  <TableHead className="text-center text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Created
                  </TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLinks.map((link) => {

                  const toLink = `${window.location.origin}/${link.shortCode}`;

                  return (
                    <TableRow key={link._id} className="border-border hover:bg-secondary/30">
                      <TableCell className="font-mono text-sm opacity-50">
                        linkf.io/{link.shortCode}
                      </TableCell>
                      <TableCell className="max-w-xs text-sm text-foreground">
                        <span className="truncate line-clamp-1">
                          {link.longUrl.replace('https://', '')}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        {link.clicks.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(link.status)}>
                          {link.status.charAt(0).toUpperCase() +
                            link.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(new Date(link.createdAt))}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleCopy(toLink)
                            }
                            className="h-8 w-8"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(toLink, '_blank')}
                            className="h-8 w-8"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(link.shortCode)}
                            className="h-8 w-8 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
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
