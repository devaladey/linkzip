export interface Link {
  _id: string;           // MongoDB ObjectId as string
  longUrl: string;
  shortCode: string;
  clicks: number;
  maxClicks?: number;
  expiresAt?: string;    // ISO string from DB
  createdAt: string;
  status: 'active' | 'inactive';
  isPaused: boolean;
}
