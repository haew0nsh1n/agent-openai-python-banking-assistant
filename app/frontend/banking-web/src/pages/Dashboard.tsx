import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bffApi } from "@/mocks/bffApi";
import { DashboardSummary } from "@/models/Dashboard";
import { ArrowDownRight, ArrowUpRight, CreditCard, DollarSign, PieChart as PieChartIcon, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function Dashboard() {
	const [dashboardSummary, setDashboardSummary] = useState<DashboardSummary | null>(null);
	type RecentTransaction = {
		id: string;
		description: string;
		date: string;
		amount: number;
		type: 'income' | 'utility' | 'supplies' | 'other';
	};
	type AccountData = { month: string; balance: number };
	type ExpenseCategory = { name: string; value: number; color: string };
	const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
	const [accountData, setAccountData] = useState<AccountData[]>([]);
	const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>([]);

	useEffect(() => {
		bffApi.getDashboardSummary().then(setDashboardSummary);
		// Mock recent transactions
		setRecentTransactions([
			{ id: '1', description: '입금 확인', date: '2025-06-25', amount: 1500, type: 'income' },
			{ id: '2', description: '사무용품', date: '2025-06-28', amount: -342.5, type: 'supplies' },
			{ id: '3', description: '공과금 청구서', date: '2025-06-27', amount: -120, type: 'utility' },
			{ id: '4', description: '소프트웨어 구독', date: '2025-06-26', amount: -299.99, type: 'other' },
		]);
		// Mock account balance trend
		setAccountData([
			{ month: '1월', balance: 25000 },
			{ month: '2월', balance: 27000 },
			{ month: '3월', balance: 22000 },
			{ month: '4월', balance: 30000 },
			{ month: '5월', balance: 26000 },
			{ month: '6월', balance: 28000 },
		]);
		// Mock expense categories
		setExpenseCategories([
			{ name: '공과금', value: 1200, color: '#3b82f6' },
			{ name: '사무용품', value: 800, color: '#f59e0b' },
			{ name: '소프트웨어', value: 600, color: '#10b981' },
			{ name: '기타', value: 400, color: '#8b5cf6' },
		]);
	}, []);

	return (
		<div className="p-6 space-y-6 animate-fade-in">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold text-foreground">대시보드 개요</h1>
				<div className="text-sm text-muted-foreground">
					마지막 업데이트: {new Date().toLocaleDateString('ko-KR')}
				</div>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">총 잔액</CardTitle>
						<DollarSign className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							${dashboardSummary?.totalBalance?.toLocaleString() ?? '--'}
						</div>
						<p className="text-xs text-green-500 flex items-center">
							<ArrowUpRight className="h-3 w-3 mr-1" />
							지난달 대비 +12.5%
						</p>
					</CardContent>
				</Card>
				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">총 신용 한도</CardTitle>
						<CreditCard className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							${dashboardSummary?.totalCreditLimit?.toLocaleString() ?? '--'}
						</div>
						<p className="text-xs text-red-500 flex items-center">
							<ArrowDownRight className="h-3 w-3 mr-1" />
							지난달 대비 +8.2%
						</p>
					</CardContent>
				</Card>
				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">이용률</CardTitle>
						<TrendingUp className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">
							{dashboardSummary?.utilizationRate?.toFixed(1) ?? '--'}%
						</div>
						<p className="text-xs text-green-500">안정적인 성장 추세</p>
					</CardContent>
				</Card>
			</div>

			{/* New Features Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">신용 카드</CardTitle>
						<Wallet className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$3,651</div>
						<p className="text-xs text-muted-foreground">3개 카드의 총 잔액</p>
						<div className="mt-2 text-xs text-blue-600 hover:text-blue-800">
							<Link to="/credit-cards" className="flex items-center">
								카드 보기 <ArrowUpRight className="h-3 w-3 ml-1" />
							</Link>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all duration-200">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">투자 포트폴리오</CardTitle>
						<PieChartIcon className="h-4 w-4 text-primary" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-foreground">$68,425</div>
						<p className="text-xs text-green-500 flex items-center">
							<ArrowUpRight className="h-3 w-3 mr-1" />
							+15.3% 포트폴리오 수익
						</p>
						<div className="mt-2 text-xs text-blue-600 hover:text-blue-800">
							<Link to="/portfolio" className="flex items-center">
								포트폴리오 보기<ArrowUpRight className="h-3 w-3 ml-1" />
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Row */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="bg-card/50 backdrop-blur border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">계좌 잔액 추이</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={accountData}>
								<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
								<XAxis dataKey="month" stroke="#9ca3af" />
								<YAxis stroke="#9ca3af" tickFormatter={(value) => value.toLocaleString()} />
								<Tooltip
									contentStyle={{
										backgroundColor: 'hsl(var(--card))',
										border: '1px solid hsl(var(--border))',
										borderRadius: '8px'
									}}
									formatter={(value: number) => [`$${value.toLocaleString()}`, '잔액']}
								/>
								<Line
									type="monotone"
									dataKey="balance"
									stroke="hsl(var(--primary))"
									strokeWidth={3}
									dot={{ fill: 'hsl(var(--primary))' }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card className="bg-card/50 backdrop-blur border-border/50">
					<CardHeader>
						<CardTitle className="text-foreground">지출 카테고리</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={expenseCategories}
									cx="50%"
									cy="50%"
									outerRadius={100}
									fill="#8884d8"
									dataKey="value"
									label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
								>
									{expenseCategories.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.color} />
									))}
								</Pie>
								<Tooltip
									contentStyle={{
										backgroundColor: 'hsl(var(--card))',
										border: '1px solid hsl(var(--border))',
										borderRadius: '8px'
									}}
									formatter={(value: number) => [`$${value.toLocaleString()}`, '금액']}
								/>
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Recent Transactions */}
			<Card className="bg-card/50 backdrop-blur border-border/50">
				<CardHeader>
					<CardTitle className="text-foreground">최근 거래 내역</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{recentTransactions.map((transaction) => (
							<div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
								<div className="flex items-center space-x-3">
									<div className={`w-2 h-2 rounded-full ${transaction.type === 'income' ? 'bg-green-500' :
										transaction.type === 'utility' ? 'bg-blue-500' :
											transaction.type === 'supplies' ? 'bg-yellow-500' : 'bg-purple-500'
										}`} />
									<div>
										<p className="font-medium text-foreground">{transaction.description}</p>
										<p className="text-sm text-muted-foreground">{transaction.date}</p>
									</div>
								</div>
								<div className={`text-right font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
									}`}>
									{transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
