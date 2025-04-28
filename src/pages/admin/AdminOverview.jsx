import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const AdminOverview = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [filter, setFilter] = useState('week');

  useEffect(() => {
    const data = {
      revenue: 120000,
      totalOrders: 3500,
      totalVisitors: 15000,
      recentSales: [
        { id: '1', productName: 'Product A', sellerName: 'Seller X', amount: 150, date: '2025-04-01' },
        { id: '2', productName: 'Product B', sellerName: 'Seller Y', amount: 200, date: '2025-04-02' },
        { id: '3', productName: 'Product C', sellerName: 'Seller Z', amount: 120, date: '2025-04-03' },
      ],
      revenueOverTime: [
        { date: '2025-04-01', revenue: 10000 },
        { date: '2025-04-02', revenue: 15000 },
        { date: '2025-04-03', revenue: 12000 },
        { date: '2025-04-04', revenue: 18000 },
        { date: '2025-04-05', revenue: 25000 },
        { date: '2025-04-06', revenue: 19000 },
        { date: '2025-04-07', revenue: 22000 },
        { date: '2025-04-08', revenue: 27000 },
        { date: '2025-04-09', revenue: 30000 },
        { date: '2025-04-10', revenue: 32000 },
      ],
    };
    setOverviewData(data);
  }, []);

  const filterChartData = () => {
    if (!overviewData) return [];
    const fullData = overviewData.revenueOverTime;
    if (filter === 'week') return fullData.slice(-7);
    if (filter === 'month') return fullData.slice(-10);
    return fullData; // year or all
  };

  if (!overviewData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 md:space-y-10">
      {/* Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-200 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Oveview Revenue</p><h3 className="text-2xl font-bold">${overviewData.revenue.toLocaleString()}</h3></CardContent></Card>
        <Card className="bg-indigo-50 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Orders</p><h3 className="text-2xl font-bold">{overviewData.totalOrders.toLocaleString()}</h3></CardContent></Card>
        <Card className="bg-sky-50 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Total Visitors</p><h3 className="text-2xl font-bold">{overviewData.totalVisitors.toLocaleString()}</h3></CardContent></Card>
        <Card className="bg-pink-50 shadow-sm"><CardContent className="p-4"><p className="text-sm text-muted-foreground">Recent Sales</p><h3 className="text-2xl font-bold">{overviewData.recentSales.length}</h3></CardContent></Card>
      </div>

      {/* Revenue Chart */}
      <Card className="shadow-sm">
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-xl font-semibold">Revenue Over Time</h2>
            <div className="space-x-2">
              {['week', 'month', 'year'].map((range) => (
                <Button
                  key={range}
                  variant={filter === range ? 'default' : 'outline'}
                  onClick={() => setFilter(range)}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filterChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Sales */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
          <div className="space-y-3">
            {overviewData.recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex flex-col md:flex-row justify-between border p-3 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-medium">{sale.productName}</p>
                  <p className="text-sm text-muted-foreground">Sold by {sale.sellerName}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-lg font-semibold">${sale.amount}</p>
                  <p className="text-sm text-muted-foreground">{new Date(sale.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
