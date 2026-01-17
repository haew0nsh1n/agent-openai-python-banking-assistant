// Mocked Backend-for-Frontend API for all business domains
import { Account } from "@/models/Account";
import { CreditCard } from "@/models/CreditCard";
import { CreditCardTransaction } from "@/models/CreditCardTransaction";
import { DashboardSummary } from "@/models/Dashboard";
import { Payment } from "@/models/Payments";
import { PortfolioAsset } from "@/models/Portfolio";


export const bffApi = {

  async getCreditCards(): Promise<CreditCard[]> {
    return [
      new CreditCard("1", "비즈니스 플래티넘", "**** **** **** 1234", 2450.75, "15,000", "2025-07-15", "active", "visa"),
      new CreditCard("2", "기업 골드", "**** **** **** 5678", 1200.50, "10,000", "2025-07-20", "active", "mastercard"),
      new CreditCard("3", "임원 블랙", "**** **** **** 9012", 0, "25,000", "2025-07-25", "blocked", "amex")
    ];
  },
  async getCreditCardTransactions(): Promise<CreditCardTransaction[]> {
    return [
      {
        id: "1",
        cardId: "1",
        description: "사무용품 구매",
        amount: -342.50,
        date: "2025-06-28",
        category: "사무용품",
        merchant: "Staples Inc."
      },
      {
        id: "2",
        cardId: "1",
        description: "비즈니스 점심",
        amount: -125.75,
        date: "2025-06-27",
        category: "식비",
        merchant: "The Business Grill"
      },
      {
        id: "3",
        cardId: "2",
        description: "소프트웨어 구독",
        amount: -299.99,
        date: "2025-06-26",
        category: "소프트웨어",
        merchant: "Adobe Creative Cloud"
      },
      {
        id: "4",
        cardId: "1",
        description: "결제 수신",
        amount: "1,500.00",
        date: "2025-06-25",
        category: "결제",
        merchant: "계정 결제"
      }
    ];
  },
  async getAccounts(): Promise<Account[]> {
    return [
      new Account("1", "Michael Carter", "52,800", "기업 당좌예금", "활성"),
    ];
  },

  async getPayments(): Promise<Payment[]> {
    return [
      new Payment("1", "1", "2", "245.50", "2024-01-20", "pending"),
      new Payment("2", "1", "3", "89.99", "2024-01-18", "overdue"),
      new Payment("3", "1", "4", "3500.00", "2024-01-25", "pending"),
      new Payment("4", "1", "5", "450.00", "2024-01-22", "pending"),
      new Payment("5", "1", "6", "299.00", "2024-01-15", "paid"),
      new Payment("6", "1", "7", "850.00", "2024-01-28", "pending"),
    ];
  },

  async getPortfolio(): Promise<PortfolioAsset[]> {
    return [
      new PortfolioAsset("1", "Apple Inc.", "stock", "9,262.5", 0.18),
      new PortfolioAsset("2", "Microsoft Corporation", "stock", "11,367", 0.22),
      new PortfolioAsset("3", "Alphabet Inc.", "stock", "2,142", 0.04),
      new PortfolioAsset("4", "Tesla Inc.", "stock", "6,212.5", 0.12),
      new PortfolioAsset("5", "NVIDIA Corporation", "stock", "17,512", 0.33),
    ];
  },

  async getDashboardSummary(): Promise<DashboardSummary> {
    return new DashboardSummary(52800, 35000, 15.2);
  },

  // --- Investment Portfolio ---
  async getPortfolioStocks() {
    // Simulate stocks with extra fields for demo
    return [
      {
        id: "1",
        symbol: "AAPL",
        name: "Apple Inc.",
        shares: 50,
        currentPrice: 185.25,
        purchasePrice: 150.00,
        purchaseDate: "2023-01-10",
        sector: "기술"
      },
      {
        id: "2",
        symbol: "MSFT",
        name: "Microsoft Corporation",
        shares: 30,
        currentPrice: 320.10,
        purchasePrice: 250.00,
        purchaseDate: "2023-03-15",
        sector: "기술"
      },
      {
        id: "3",
        symbol: "TSLA",
        name: "Tesla Inc.",
        shares: 10,
        currentPrice: 700.00,
        purchasePrice: 600.00,
        purchaseDate: "2023-05-20",
        sector: "자동차"
      }
    ];
  },

  async getPortfolioTransactions() {
    return [
      {
        id: "t1",
        type: "buy",
        symbol: "AAPL",
        shares: 20,
        price: 150.00,
        date: "2023-01-10",
        total: 3000
      },
      {
        id: "t2",
        type: "buy",
        symbol: "MSFT",
        shares: 10,
        price: 250.00,
        date: "2023-03-15",
        total: 2500
      },
      {
        id: "t3",
        type: "buy",
        symbol: "TSLA",
        shares: 10,
        price: 600.00,
        date: "2023-05-20",
        total: 6000
      },
      {
        id: "t4",
        type: "buy",
        symbol: "AAPL",
        shares: 30,
        price: 160.00,
        date: "2023-08-01",
        total: 4800
      }
    ];
  },

  async getMarketTrends() {
    return [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 185.25,
        change: 2.15,
        changePercent: 1.17,
        volume: 12000000
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 320.10,
        change: -1.05,
        changePercent: -0.33,
        volume: 9500000
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc.",
        price: 700.00,
        change: 10.00,
        changePercent: 1.45,
        volume: 8000000
      },
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 2750.50,
        change: 15.30,
        changePercent: 0.56,
        volume: 6000000
      },
      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        price: 950.75,
        change: 22.10,
        changePercent: 2.38,
        volume: 7200000
      },
      {
        symbol: "AMZN",
        name: "Amazon.com Inc.",
        price: 3400.00,
        change: -12.50,
        changePercent: -0.37,
        volume: 5400000
      },
      {
        symbol: "META",
        name: "Meta Platforms Inc.",
        price: 355.20,
        change: 5.60,
        changePercent: 1.60,
        volume: 4100000
      },
      {
        symbol: "JPM",
        name: "JPMorgan Chase & Co.",
        price: 160.80,
        change: 1.20,
        changePercent: 0.75,
        volume: 3800000
      },
      {
        symbol: "V",
        name: "Visa Inc.",
        price: 230.10,
        change: -0.90,
        changePercent: -0.39,
        volume: 2900000
      },
      {
        symbol: "DIS",
        name: "The Walt Disney Company",
        price: 145.60,
        change: 3.10,
        changePercent: 2.18,
        volume: 2500000
      }
    ];
  },

  // --- Transaction Analytics ---
  async getTransactionTrends() {
    return [
      { date: "2024-06-01", income: 12000, expenses: 8000 },
      { date: "2024-06-08", income: 15000, expenses: 9500 },
      { date: "2024-06-15", income: 11000, expenses: 7000 },
      { date: "2024-06-22", income: 17000, expenses: 12000 },
      { date: "2024-06-29", income: 14000, expenses: 9000 }
    ];
  },

  async getCategoryBreakdown() {
    return [
      { category: "운영비", amount: 3500, percentage: 35, trend: "+5%", color: "#3b82f6" },
      { category: "공과금", amount: 2000, percentage: 20, trend: "-2%", color: "#f59e0b" },
      { category: "장비", amount: 1500, percentage: 15, trend: "+1%", color: "#10b981" },
      { category: "소프트웨어", amount: 1000, percentage: 10, trend: "+3%", color: "#8b5cf6" },
      { category: "기타", amount: 2000, percentage: 20, trend: "0%", color: "#f43f5e" }
    ];
  },

  async getCashFlowData() {
    return [
      { month: "1월", inflow: 25000, outflow: 18000 },
      { month: "2월", inflow: 27000, outflow: 19500 },
      { month: "3월", inflow: 22000, outflow: 17000 },
      { month: "4월", inflow: 30000, outflow: 21000 },
      { month: "5월", inflow: 26000, outflow: 20000 },
      { month: "6월", inflow: 28000, outflow: 22000 }
    ];
  },

  async getRecentAnalytics() {
    return [
      { metric: "총 수입", value: "$120,000", positive: true, change: "+8%" },
      { metric: "총 지출", value: "$85,000", positive: false, change: "+3%" },
      { metric: "순 현금 흐름", value: "$35,000", positive: null, change: "+5%" },
      { metric: "평균 거래 금액", value: "$1,200", positive: true, change: "+2%" }
    ];
  },

  // --- Bills ---
  async getBills() {
    return [
      { id: 1, name: "전력 회사", amount: 245.5, dueDate: "2024-01-20", status: "pending", category: "운영비", recurring: true },
      { id: 2, name: "인터넷 서비스", amount: 89.99, dueDate: "2024-01-18", status: "overdue", category: "운영비", recurring: true },
      { id: 3, name: "사무실 임대료", amount: 3500.0, dueDate: "2024-01-25", status: "pending", category: "부동산", recurring: true },
      { id: 4, name: "보험료", amount: 450.0, dueDate: "2024-01-22", status: "pending", category: "보험", recurring: true },
      { id: 5, name: "소프트웨어 구독", amount: 299.0, dueDate: "2024-01-15", status: "paid", category: "소프트웨어", recurring: true },
      { id: 6, name: "장비 리스", amount: 850.0, dueDate: "2024-01-28", status: "pending", category: "장비", recurring: true }
    ];
  },

  async getMonthlyBillTrends() {
    return [
      { month: "1월", utilities: 850, insurance: 450, software: 299, equipment: 850, rent: 3500 },
      { month: "2월", utilities: 920, insurance: 450, software: 299, equipment: 850, rent: 3500 },
      { month: "3월", utilities: 780, insurance: 450, software: 299, equipment: 850, rent: 3500 },
      { month: "4월", utilities: 845, insurance: 450, software: 299, equipment: 850, rent: 3500 },
      { month: "5월", utilities: 912, insurance: 450, software: 299, equipment: 850, rent: 3500 },
      { month: "6월", utilities: 834, insurance: 450, software: 299, equipment: 850, rent: 3500 }
    ];
  }
};
