import { Link } from '@/types/link';
import { useState } from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Copy, ExternalLink, Loader2, Pause, Play, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { getLinkStatus } from '@/lib/get-link-status';

const LinksTableRow = ({ link, handleCopy, getStatusColor, formatDate }:
    {
        link: Link;
        handleCopy: (text: string) => void;
        getStatusColor: (status: string) => string;
        formatDate: (date: Date) => string
    }) => {
    const toLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${link.shortCode}`;

    const [isDeleting, setIsDeleting] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    const queryClient = useQueryClient();


    const handleDelete = (linkId: string) => {
        setIsDeleting(true);
        try {
            fetch(`/api/link/${linkId}`, {
                method: 'DELETE',
            }).then(res => res.json()).then(data => {
                if (data.success) {
                    setIsDeleting(false);
                    toast.success('Link deleted')
                    queryClient.invalidateQueries({ queryKey: ['links'] });
                } else {
                    toast.error(data.error || 'Failed to delete link')
                }
            })
        } catch (error) {
            setIsDeleting(false);
            console.error(error)
            toast.error('An error occurred while deleting the link')
        }
    }

    const handleTogglePause = async () => {
        setIsToggling(true);
        try {
            const res = await fetch(`/api/link/${link.shortCode}/pause`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isPaused: !link.isPaused }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to update status");
                return;
            }

            console.log("Updated link:", data.data);

            toast.success(`Link ${link.isPaused ? "resumed" : "paused"} successfully`);
            queryClient.invalidateQueries({ queryKey: ['links'] });
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating status");
        } finally {
            setIsToggling(false);
        }
    };


    const status = getLinkStatus(link);
    const statusColors = getStatusColor(status);


    return (
        <TableRow className="border-border hover:bg-secondary/30">
            <TableCell className="font-mono text-sm opacity-50">
                {process.env.NEXT_PUBLIC_BASE_URL}/{link.shortCode}
            </TableCell>
            <TableCell className="max-w-xs text-sm text-foreground">
                <span className="truncate line-clamp-1">
                    {link.longUrl.replace('https://', '')}
                </span>
            </TableCell>
            <TableCell className="text-center font-semibold text-foreground">
                {link.clicks.toLocaleString()}
            </TableCell>
            <TableCell className="text-center font-semibold text-foreground">
                {link.maxClicks?.toLocaleString() || "-"}
            </TableCell>
            <TableCell className="text-center">
                <Badge className={statusColors}>
                    {status.charAt(0).toUpperCase() +
                        status.slice(1)}
                </Badge>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
                {formatDate(new Date(link.createdAt))}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
                {link.expiresAt ? formatDate(new Date(link.expiresAt)) : "-"}
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
                        disabled={isToggling}
                        onClick={handleTogglePause}
                        className={`h-8 w-8`}
                    >
                        {isToggling ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : link.isPaused ? (
                            <Play className="h-4 w-4" />
                        ) : (
                            <Pause className="h-4 w-4" />
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => handleDelete(link.shortCode)}
                        className="h-8 w-8 hover:text-red-500"
                    >
                        {isDeleting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default LinksTableRow