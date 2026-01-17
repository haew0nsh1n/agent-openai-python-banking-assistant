
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Building2, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "EB";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleSettings = () => {
    navigate("/account");
  };

  return (
    <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">홈 뱅킹 어시스턴트</h2>
            <p className="text-xs text-slate-500 leading-none">데모 애플리케이션</p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm font-medium text-slate-900">{user?.name ?? "기업 사용자"}</div>
          <div className="text-xs text-slate-500">{user?.email ?? "로딩 중…"}</div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2 hover:bg-slate-50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} alt={user?.name ?? "Enterprise User"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white">
            <DropdownMenuLabel>
              <div>
                <div className="font-medium">{user?.name ?? "기업 사용자"}</div>
                {user?.accountId && (
                  <div className="text-xs text-slate-400">계정 {user.accountId}</div>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              프로필
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              계정 설정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
