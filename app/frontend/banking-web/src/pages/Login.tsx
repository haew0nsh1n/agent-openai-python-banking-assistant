import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const [email, setEmail] = useState("michael.carter@enterprisebank.com");
  const [password, setPassword] = useState("enterprise123");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = useMemo(() => {
    const state = location.state as { from?: { pathname: string } } | null;
    return state?.from?.pathname ?? "/";
  }, [location.state]);

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(from, { replace: true });
    }
  }, [from, isAuthenticated, loading, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login({ email, password });
      toast({
        title: "로그인 성공",
        description: "기업 대시보드에 오신 것을 환영합니다.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to sign in.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-slate-950/80 border border-slate-800 p-10 shadow-2xl backdrop-blur">
        <div className="space-y-3 text-center">
          <p className="text-lg font-semibold text-slate-200">기업 뱅킹</p>
          <h1 className="text-3xl font-bold text-white">로그인하여 계속하기</h1>
          <p className="text-sm text-slate-400">
            본인 확인 후 뱅킹 어시스턴트가 활성화됩니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-slate-300">
              업무용 이메일
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@enterprisebank.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-slate-300">
              비밀번호
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "로그인 중…" : "뱅킹 시작하기"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          <p>도움이 필요하신가요? <a href="mailto:support@bankwise.com" className="text-sky-400 underline">고객지원</a>에 문의하세요.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
