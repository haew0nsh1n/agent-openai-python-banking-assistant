import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bffApi } from "@/mocks/bffApi";
import type { MarketTrend } from "@/models/MarketTrend";
import type { Stock } from "@/models/Stock";
import type { Transaction } from "@/models/Transaction";
import { Activity, DollarSign, Minus, PieChart, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";



const InvestmentPortfolio = () => {
  const [selectedStock, setSelectedStock] = useState("");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [shares, setShares] = useState("");
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false);

  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);


  useEffect(() => {
    bffApi.getPortfolioStocks().then(setPortfolio);
    bffApi.getPortfolioTransactions().then((data) => {
      // Ensure type is correct for Transaction[]
      setTransactions(data.map((t) => ({
        ...t,
        type: t.type as "buy" | "sell"
      })));
    });
    bffApi.getMarketTrends().then(setMarketTrends);
  }, []);

  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, stock) => total + (stock.shares * stock.currentPrice), 0);
  };

  const calculateTotalGainLoss = () => {
    return portfolio.reduce((total, stock) => {
      const currentValue = stock.shares * stock.currentPrice;
      const purchaseValue = stock.shares * stock.purchasePrice;
      return total + (currentValue - purchaseValue);
    }, 0);
  };

  const calculateGainLossPercent = () => {
    const totalPurchaseValue = portfolio.reduce((total, stock) =>
      total + (stock.shares * stock.purchasePrice), 0);
    const gainLoss = calculateTotalGainLoss();
    return totalPurchaseValue > 0 ? (gainLoss / totalPurchaseValue) * 100 : 0;
  };

  const getStockGainLoss = (stock: Stock) => {
    const currentValue = stock.shares * stock.currentPrice;
    const purchaseValue = stock.shares * stock.purchasePrice;
    return currentValue - purchaseValue;
  };

  const getStockGainLossPercent = (stock: Stock) => {
    return ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
  };

  const handleTrade = () => {
    if (selectedStock && shares) {
      const stock = portfolio.find(s => s.symbol === selectedStock);
      if (stock) {
        console.log(`${tradeType === 'buy' ? 'Buying' : 'Selling'} ${shares} shares of ${selectedStock}`);
        setIsTradeDialogOpen(false);
        setSelectedStock("");
        setShares("");
      }
    }
  };

  const portfolioValue = calculatePortfolioValue();
  const totalGainLoss = calculateTotalGainLoss();
  const gainLossPercent = calculateGainLossPercent();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">투자 포트폴리오</h1>
          <p className="text-muted-foreground">
            투자를 모니터링하고, 시장 동향을 추적하고, 포트폴리오를 관리하세요
          </p>
        </div>
        <Dialog open={isTradeDialogOpen} onOpenChange={setIsTradeDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              주식 거래
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>주식 거래</DialogTitle>
              <DialogDescription>
                포트폴리오에서 주식을 매수 또는 매도하세요
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>거래 유형</Label>
                <Select value={tradeType} onValueChange={(value: "buy" | "sell") => setTradeType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">매수</SelectItem>
                    <SelectItem value="sell">매도</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>주식 심볼</Label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger>
                    <SelectValue placeholder="주식을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {portfolio.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shares">주식 수</Label>
                <Input
                  id="shares"
                  type="number"
                  placeholder="0"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                />
              </div>
              {selectedStock && shares && (
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">거래 요약</h4>
                  {(() => {
                    const stock = portfolio.find(s => s.symbol === selectedStock);
                    const shareCount = parseInt(shares) || 0;
                    const total = shareCount * (stock?.currentPrice || 0);

                    return (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>주식:</span>
                          <span>{stock?.symbol} - ${stock?.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>주식 수:</span>
                          <span>{shareCount.toLocaleString()}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-medium">
                          <span>총액:</span>
                          <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        {tradeType === 'sell' && stock && shareCount > stock.shares && (
                          <p className="text-red-600 text-xs">
                            경고: 보유 주식 수는 {stock.shares}주입니다
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
            <Button
              onClick={handleTrade}
              disabled={!selectedStock || !shares}
              className="w-full"
            >
              {tradeType === 'buy' ? '매수' : '매도'}하기
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">포트폴리오 가치</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              총 시장 가치
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 손익</CardTitle>
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? '+' : ''}${Math.abs(totalGainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">
              {gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">보유 종목</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portfolio.length}</div>
            <p className="text-xs text-muted-foreground">
              개별 주식 수
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">최고 수익 종목</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {portfolio.length > 0 ? (() => {
              const bestStock = portfolio.reduce((best, stock) =>
                getStockGainLossPercent(stock) > getStockGainLossPercent(best) ? stock : best
              );
              return (
                <>
                  <div className="text-2xl font-bold">{bestStock.symbol}</div>
                  <p className="text-xs text-green-600">
                    +{getStockGainLossPercent(bestStock).toFixed(2)}%
                  </p>
                </>
              );
            })() : (
              <div className="text-muted-foreground">N/A</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">내 포트폴리오</TabsTrigger>
          <TabsTrigger value="market">시장 동향</TabsTrigger>
          <TabsTrigger value="transactions">최근 거래</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>주식 보유 현황</CardTitle>
              <CardDescription>현재 보유 주식 및 성과</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>심볼</TableHead>
                    <TableHead>회사명</TableHead>
                    <TableHead>주식 수</TableHead>
                    <TableHead>현재가</TableHead>
                    <TableHead>시장 가치</TableHead>
                    <TableHead>손익</TableHead>
                    <TableHead>%</TableHead>
                    <TableHead>섹터</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolio.map((stock) => {
                    const gainLoss = getStockGainLoss(stock);
                    const gainLossPercent = getStockGainLossPercent(stock);
                    const marketValue = stock.shares * stock.currentPrice;

                    return (
                      <TableRow key={stock.id}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.shares.toLocaleString()}</TableCell>
                        <TableCell>${stock.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell>${marketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className={gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {gainLoss >= 0 ? '+' : ''}${Math.abs(gainLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell className={gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {gainLossPercent >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{stock.sector}</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>시장 동향</CardTitle>
              <CardDescription>현재 시장 성과 및 트렌드</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>심볼</TableHead>
                    <TableHead>종목명</TableHead>
                    <TableHead>가격</TableHead>
                    <TableHead>변동</TableHead>
                    <TableHead>변동률</TableHead>
                    <TableHead>거래량</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketTrends.map((trend) => (
                    <TableRow key={trend.symbol}>
                      <TableCell className="font-medium">{trend.symbol}</TableCell>
                      <TableCell>{trend.name}</TableCell>
                      <TableCell>${trend.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell className={trend.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {trend.change >= 0 ? '+' : ''}${Math.abs(trend.change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className={trend.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {trend.changePercent >= 0 ? '+' : ''}{trend.changePercent.toFixed(2)}%
                      </TableCell>
                      <TableCell>{trend.volume.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>최근 거래 내역</CardTitle>
              <CardDescription>최근 매수 및 매도 거래</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>날짜</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>심볼</TableHead>
                    <TableHead>주식 수</TableHead>
                    <TableHead>가격</TableHead>
                    <TableHead className="text-right">총액</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={transaction.type === 'buy' ? 'default' : 'secondary'}
                          className={`${transaction.type === 'buy'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {transaction.type === 'buy' ? (
                            <Plus className="h-3 w-3 mr-1" />
                          ) : (
                            <Minus className="h-3 w-3 mr-1" />
                          )}
                          {transaction.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.symbol}</TableCell>
                      <TableCell>{transaction.shares.toLocaleString()}</TableCell>
                      <TableCell>${transaction.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${transaction.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentPortfolio;
