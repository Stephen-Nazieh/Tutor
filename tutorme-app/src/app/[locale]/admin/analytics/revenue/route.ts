// Get platform revenue analytics
import { NextResponse } from 'next/server';

function getDateRange(period: string) {
  const end = new Date();
  const start = new Date();
  const days = parseInt(period) || 30;
  start.setDate(end.getDate() - days);
  return { start, end };
}

// Stub implementations
async function getPlatformRevenue(start: Date, end: Date) {
  return { total: 15000, count: 150 };
}

async function getRevenueByMonth(start: Date, end: Date, type: string) {
  return Array.from({ length: 6 }, (_, i) => ({
    month: `Month ${i + 1}`,
    amount: Math.floor(Math.random() * 5000) + 1000
  }));
}

async function getRevenueGrowth(start: Date, end: Date, type: string) {
  return 0.15; // 15% growth
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const period = searchParams.get('period') || '30d';
  const { start, end } = getDateRange(period);
  
  const [platformRevenue, commissionByMonth, revenueGrowth] = await Promise.all([
    getPlatformRevenue(start, end),
    getRevenueByMonth(start, end, 'commission'),
    getRevenueGrowth(start, end, 'commission')
  ]);
  
  return NextResponse.json({
    periodRevenue: platformRevenue,
    revenueByMonth: commissionByMonth,
    growth: revenueGrowth,
    totalPlatformRevenue: await getPlatformRevenue(new Date(0), new Date())
  });
}
