import { ChatProvider, ChatShell, type RetryConfig, type ShellHeaderConfig, type WelcomeHeaderConfig } from "@/components/chat";
import type { StarterPrompt } from "@/components/chat/types";
import { Sparkles } from "lucide-react"; // Example: import custom icon

const BANKING_STARTER_PROMPTS: StarterPrompt[] = [
  {
    id: "pay-bill",
    title: "청구서 결제",
    description: "청구서를 업로드하거나 세부 정보를 공유하세요",
    icon: "🧾",
    content: "이번 달 Alpine Utilities 최근 청구서를 결제해주세요",
  },
  {
    id: "card-trend",
    title: "카드 사용 확인",
    description: "요약, 트렌드 및 이상 항목",
    icon: "💳",
    content: "지난 30일간 Platinum Visa 카드 사용 내역을 요약해주세요",
  },
  {
    id: "transactions-search",
    title: "결제 내역 검색",
    description: "다양한 기준으로 결제 내역을 검색하세요.",
    icon: "🛡️",
    content: "contoso에 마지막으로 결제한 날짜가 언제였나요?",
  },
];

export default function Support() {
  // Configure your chat server URL here
  const chatServerUrl = import.meta.env.VITE_CHAT_SERVER_URL || "/chatkit";

  // Configure which HTTP status codes should allow retry
  // Default: [408, 429, 500, 502, 503, 504]
  const retryConfig: RetryConfig = {
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  };

  // Configure header appearance and visibility
  // All properties are optional - omit to use defaults
  const headerConfig: ShellHeaderConfig = {
    showIcon: true,                          // Show/hide left icon badge
    // icon: Bot,                            // Custom icon (import from lucide-react)
    showTitle: true,                         // Show/hide title label
    titleLabel: "뱅킹 코파일럿",           // Custom title text
    showActiveThread: true,                  // Show/hide active thread name
    activeThreadFallback: "제목 없는 쓰레드", // Text when no thread selected
    showNewThreadButton: true,               // Show/hide new thread button
    showHistoryButton: true,                 // Show/hide history toggle button
    // customContent: <div>Custom Header</div> // Completely replace header content
  };

  // Configure welcome header (shown when no messages exist)
  // All properties are optional - omit to use defaults
  const welcomeHeaderConfig: WelcomeHeaderConfig = {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "뱅킹 어시스턴트에 오신 것을 환영합니다",
    subtitle: "시작하려면 프롬프트를 선택하세요",
  };

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center bg-slate-100 p-6">
      <div className="h-[720px] w-full max-w-5xl">
        <ChatProvider
          starterPrompts={BANKING_STARTER_PROMPTS}
          chatServerUrl={chatServerUrl}
          retryConfig={retryConfig}
          attachmentImageSize="lg"
          maxVisibleAttachments={3}
          welcomeHeaderConfig={welcomeHeaderConfig}
        >
          <ChatShell headerConfig={headerConfig} />
        </ChatProvider>
      </div>
    </div>
  );
}
