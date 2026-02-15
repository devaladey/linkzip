export interface LinkData {
  id: string
  shortCode: string
  originalUrl: string
  clicks: number
  status: 'active' | 'expired' | 'paused'
  createdAt: Date
  expiresAt?: Date
  qrCode?: string
}

export interface ClicksTrendData {
  date: string
  clicks: number
}

export interface AnalyticsData {
  device: 'mobile' | 'desktop' | 'tablet'
  count: number
}

export interface CountryData {
  name: string
  value: number
}

export interface ReferrerData {
  referrer: string
  clicks: number
}

// Generate mock links
export const mockLinks: LinkData[] = [
  {
    id: '1',
    shortCode: 'abc123',
    originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
    clicks: 2543,
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    shortCode: 'xyz789',
    originalUrl: 'https://github.com/vercel/next.js',
    clicks: 1892,
    status: 'active',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    shortCode: 'doc456',
    originalUrl: 'https://nextjs.org/docs',
    clicks: 945,
    status: 'active',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    shortCode: 'blog789',
    originalUrl: 'https://vercel.com/blog/next-js-13-release',
    clicks: 623,
    status: 'active',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '5',
    shortCode: 'event123',
    originalUrl: 'https://conference.example.com/registration',
    clicks: 412,
    status: 'expired',
    createdAt: new Date('2024-01-10'),
    expiresAt: new Date('2024-02-10'),
  },
]

// Generate mock click trends (last 30 days)
export const mockClicksTrend: ClicksTrendData[] = [
  { date: 'Jan 15', clicks: 120 },
  { date: 'Jan 16', clicks: 155 },
  { date: 'Jan 17', clicks: 142 },
  { date: 'Jan 18', clicks: 198 },
  { date: 'Jan 19', clicks: 175 },
  { date: 'Jan 20', clicks: 210 },
  { date: 'Jan 21', clicks: 189 },
  { date: 'Jan 22', clicks: 245 },
  { date: 'Jan 23', clicks: 287 },
  { date: 'Jan 24', clicks: 264 },
  { date: 'Jan 25', clicks: 312 },
  { date: 'Jan 26', clicks: 289 },
  { date: 'Jan 27', clicks: 356 },
  { date: 'Jan 28', clicks: 334 },
  { date: 'Jan 29', clicks: 389 },
  { date: 'Jan 30', clicks: 412 },
  { date: 'Jan 31', clicks: 445 },
  { date: 'Feb 1', clicks: 478 },
  { date: 'Feb 2', clicks: 521 },
  { date: 'Feb 3', clicks: 498 },
  { date: 'Feb 4', clicks: 567 },
  { date: 'Feb 5', clicks: 623 },
  { date: 'Feb 6', clicks: 589 },
  { date: 'Feb 7', clicks: 645 },
  { date: 'Feb 8', clicks: 712 },
  { date: 'Feb 9', clicks: 756 },
  { date: 'Feb 10', clicks: 823 },
  { date: 'Feb 11', clicks: 891 },
  { date: 'Feb 12', clicks: 945 },
  { date: 'Feb 13', clicks: 1024 },
]

// Mock device breakdown
export const mockDeviceBreakdown: AnalyticsData[] = [
  { device: 'mobile', count: 5240 },
  { device: 'desktop', count: 3850 },
  { device: 'tablet', count: 1920 },
]

// Mock country distribution
export const mockCountryDistribution: CountryData[] = [
  { name: 'United States', value: 4200 },
  { name: 'United Kingdom', value: 1850 },
  { name: 'Canada', value: 1320 },
  { name: 'Germany', value: 945 },
  { name: 'France', value: 695 },
]

// Mock referrer data
export const mockReferrers: ReferrerData[] = [
  { referrer: 'twitter.com', clicks: 3240 },
  { referrer: 'linkedin.com', clicks: 2150 },
  { referrer: 'Direct', clicks: 1980 },
  { referrer: 'reddit.com', clicks: 1240 },
  { referrer: 'hacker-news.com', clicks: 856 },
  { referrer: 'producthunt.com', clicks: 567 },
]

// Calculate dashboard KPIs
export function calculateKPIs() {
  const totalLinks = mockLinks.length
  const totalClicks = mockLinks.reduce((sum, link) => sum + link.clicks, 0)
  
  // Clicks today (simulated - last day's clicks)
  const clicksToday = mockClicksTrend[mockClicksTrend.length - 1]?.clicks || 0
  
  // Active links
  const activeLinks = mockLinks.filter((link) => link.status === 'active').length
  
  // Calculate percentage changes (simulated)
  const linksChange = 12.5 // percentage
  const clicksChange = 23.8 // percentage
  const todayChange = 15.2 // percentage
  const activeChange = 8.3 // percentage

  return {
    totalLinks,
    totalClicks,
    clicksToday,
    activeLinks,
    linksChange,
    clicksChange,
    todayChange,
    activeChange,
  }
}
