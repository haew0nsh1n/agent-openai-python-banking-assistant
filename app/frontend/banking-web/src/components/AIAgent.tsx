
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, GripVertical, Maximize2, MessageCircle, Minimize2, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAgentResponse } from "@/context/AgentResponseContext";

import { ChatProvider, ChatShell, type ComposerConfig, type RetryConfig, type ShellContainerConfig, type ShellHeaderConfig } from "@/components/chat";
import type { StarterPrompt } from "@/components/chat/types";



export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showInvitation, setShowInvitation] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 384, height: 500 }); // 96*4=384px (w-96)
  const [isResizing, setIsResizing] = useState(false);
  const { triggerOnResponseEnd } = useAgentResponse();
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);

  const chatServerUrl = import.meta.env.VITE_CHAT_SERVER_URL || "/chatkit";

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

  // Configure which HTTP status codes should allow retry
  // Default: [408, 429, 500, 502, 503, 504]
  const retryConfig: RetryConfig = {
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
  };

  // Configure header appearance and visibility
  // All properties are optional - omit to use defaults
  const headerConfig: ShellHeaderConfig = {
    showHeader: false,                        // Show/hide entire header
    showIcon: false,                          // Show/hide left icon badge
    // icon: Bot,                            // Custom icon (import from lucide-react)
    showTitle: false,                         // Show/hide title label           // Custom title text
    showActiveThread: false,                  // Show/hide active thread name
    activeThreadFallback: "제목 없는 스레드", // Text when no thread selected
    showNewThreadButton: true,               // Show/hide new thread button
    showHistoryButton: false,                 // Show/hide history toggle button
    // customContent: <div>Custom Header</div> // Completely replace header content
  };

  // Configure composer appearance and behavior
  // All properties are optional - omit to use defaults
  const composerConfig: ComposerConfig = {
    placeholder: "메시지를 입력하세요...",
    buttonSize: "sm",                        // "sm" | "md" | "lg"
    showAttachmentCounter: false,            // Show/hide attachment counter
    maxAttachments: 5,                       // Maximum number of attachments
    showAttachmentTitle: false,               // Show/hide attachment filename
    showAttachmentSize: false,                // Show/hide attachment file size
  };

  // Configure shell container for embedded mode
  // Remove border, rounded corners, and shadow since AIAgent Card provides them
  const shellContainerConfig: ShellContainerConfig = {
    showBorder: false,
    showRoundedCorners: false,
    showShadow: false,
    backgroundColor: "bg-transparent",
  };



  const handleResponseEnd = (threadId: string) => {
    console.log("Response ended for thread:", threadId);
    // Call existing context callback if needed
    triggerOnResponseEnd();
    // Add your custom logic here
  };

  const handleThreadStarted = (threadId: string) => {
    console.log("Thread started:", threadId);
    triggerOnResponseEnd();
  }


  // Handle resize functionality
  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizeRef.current || isMinimized) return;

      // Cancel any pending animation frame
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      // Use requestAnimationFrame for smooth, immediate updates
      animationFrameId = requestAnimationFrame(() => {
        if (!resizeRef.current) return;

        const deltaX = resizeRef.current.startX - e.clientX;
        const deltaY = resizeRef.current.startY - e.clientY;

        const newWidth = Math.max(320, Math.min(800, resizeRef.current.startWidth + deltaX));
        const newHeight = Math.max(400, Math.min(window.innerHeight - 100, resizeRef.current.startHeight + deltaY));

        setDimensions({ width: newWidth, height: newHeight });
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'nwse-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isResizing, isMinimized]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: dimensions.width,
      startHeight: dimensions.height,
    };
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Invitation Card */}
        {showInvitation && (
          <div className="mb-4 mr-4 animate-slide-up">
            <Card className="bg-white border border-slate-200 shadow-professional-lg p-4 w-72">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1">AI 어시스턴트 준비 완료</h3>
                  <p className="text-xs text-slate-600 mb-2">뱅킹 업무에 도움이 필요하신가요? 결제, 계정 정보 등을 도와드릴 수 있습니다.</p>
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsOpen(true);
                      setShowInvitation(false);
                    }}
                    className="text-xs h-7 bg-blue-600 hover:bg-blue-700"
                  >
                    채팅 시작
                  </Button>
                </div>
                <button
                  onClick={() => setShowInvitation(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Chat Button */}
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-professional-lg animate-bounce-gentle"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card
      className="fixed bottom-6 right-6 bg-white border border-slate-200 shadow-professional-lg animate-scale-in z-50 rounded-2xl overflow-hidden"
      style={{
        width: isMinimized ? '320px' : `${dimensions.width}px`,
        height: isMinimized ? '64px' : `${dimensions.height}px`,
        transition: isResizing ? 'none' : 'all 300ms',
      }}
    >
      {/* Resize Handle - Only visible when not minimized */}
      {!isMinimized && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize hover:bg-blue-100 transition-colors group z-10"
          title="드래그하여 크기 조절"
        >
          <GripVertical className="h-4 w-4 text-slate-400 group-hover:text-blue-600 rotate-45 absolute top-1 left-1" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-900">AI 뱅킹 어시스턴트</h3>
            <p className="text-xs text-slate-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              온라인 - 도움이 필요하신가요?
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 hover:bg-slate-100"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ChatKit Container - hide when minimized but keep mounted to preserve state */}
      <div
        className={`${isMinimized ? 'opacity-0 pointer-events-none h-0' : 'opacity-100'}`}
        style={{
          height: isMinimized ? '0' : `${dimensions.height - 73}px`,
          transition: isResizing ? 'none' : 'all 300ms',
        }}
      >
        <ChatProvider
          starterPrompts={BANKING_STARTER_PROMPTS}
          chatServerUrl={chatServerUrl}
          retryConfig={retryConfig}
          attachmentImageSize="lg"
          maxVisibleAttachments={3}
          composerConfig={composerConfig}
          shellContainerConfig={shellContainerConfig}
          onResponseEnd={handleResponseEnd}
          onThreadStarted={handleThreadStarted}
        >
          <ChatShell headerConfig={headerConfig} />
        </ChatProvider>
      </div>
    </Card>
  );
}
