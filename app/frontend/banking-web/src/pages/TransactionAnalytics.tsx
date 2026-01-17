


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { bffApi } from "@/mocks/bffApi";
import { ArrowDownRight, ArrowUpRight, DollarSign, Filter, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from "recharts";

interface TransactionTrend { date: string; income: number; expenses: number; }
interface CategoryBreakdown { category: string; amount: number; percentage: number; trend: string; color: string; }
interface CashFlow { month: string; inflow: number; outflow: number; }
interface RecentAnalytics { metric: string; value: string; positive: boolean | null; change: string; }

export default function TransactionAnalytics() {
  const [transactionTrends, setTransactionTrends] = useState<TransactionTrend[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown[]>([]);
  const [cashFlowData, setCashFlowData] = useState<CashFlow[]>([]);
  const [recentAnalytics, setRecentAnalytics] = useState<RecentAnalytics[]>([]);
  const [timeRange, setTimeRange] = useState('30d');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    bffApi.getTransactionTrends().then(setTransactionTrends);
    bffApi.getCategoryBreakdown().then(setCategoryBreakdown);
    bffApi.getCashFlowData().then(setCashFlowData);
    bffApi.getRecentAnalytics().then(setRecentAnalytics);
  }, []);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">거래 분석</h1>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7일</SelectItem>
              <SelectItem value="30d">30일</SelectItem>
              <SelectItem value="90d">90일</SelectItem>
              <SelectItem value="1y">1년</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 카테고리</SelectItem>
              <SelectItem value="operations">운영비</SelectItem>
              <SelectItem value="utilities">공과금</SelectItem>
              <SelectItem value="equipment">장비</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            필터
          </Button>
        </div>
      </div>

      {/* Key Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {recentAnalytics.map((metric, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.metric}</CardTitle>
              {metric.positive === true && <TrendingUp className="h-4 w-4 text-green-500" />}
              {metric.positive === false && <TrendingDown className="h-4 w-4 text-red-500" />}
              {metric.positive === null && <DollarSign className="h-4 w-4 text-primary" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <p className={`text-xs flex items-center ${metric.positive === true ? 'text-green-500' :
                metric.positive === false ? 'text-red-500' : 'text-muted-foreground'
                }`}>
                {metric.positive === true && <ArrowUpRight className="h-3 w-3 mr-1" />}
                {metric.positive === false && <ArrowDownRight className="h-3 w-3 mr-1" />}
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Trends */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">거래 트렌드</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={transactionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => value.toLocaleString()} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name === 'income' ? '수입' : '지출']}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="2"
                  stroke="#f43f5e"
                  fill="#f43f5e"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cash Flow Analysis */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">월별 현금 흐름</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => value.toLocaleString()} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name === 'inflow' ? '유입' : '유출']}
                />
                <Bar dataKey="inflow" fill="#10b981" />
                <Bar dataKey="outflow" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="bg-card/50 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">지출 카테고리 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categoryBreakdown.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-foreground">{category.category}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant="outline"
                      className={category.trend.startsWith('+') ? 'text-green-500 border-green-500/50' : 'text-red-500 border-red-500/50'}
                    >
                      {category.trend}
                    </Badge>
                    <span className="font-semibold text-foreground">${category.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>총 지출의 {category.percentage}%</span>
                  <span>최근 30일</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
