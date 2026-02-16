import { Link } from "@/types/link";

export type LinkStatus = "active" | "expired" | "paused";

export function getLinkStatus(link: Link): LinkStatus {
  if (link.isPaused) return "paused";

  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return "expired";
  }

  if (link.maxClicks && link.clicks >= link.maxClicks) {
    return "expired";
  }

  return "active";
}
