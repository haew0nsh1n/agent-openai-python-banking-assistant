
import { Card } from "@/components/ui/card";
import { bffApi } from "@/mocks/bffApi";
import { Account as AccountModel } from "@/models/Account";
import { useEffect, useState } from "react";
export default function Account() {
  const [accounts, setAccounts] = useState<AccountModel[]>([]);

  useEffect(() => {
    bffApi.getAccounts().then(setAccounts);
  }, []);

  const account = accounts[0];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-2 text-slate-900">계정 개요</h1>
      <p className="text-slate-600 mb-6 text-base">계정 정보, 코드, 계약 및 정책 정보 등 주요 정보를 확인하세요. 문의 사항이 있으시면 언제든지 연락해 주세요. <a href="mailto:support@bankwise.com" className="text-blue-600 underline">support@bankwise.com</a>.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Information */}
        <Card className="p-8 shadow-xl border border-slate-200 flex-1">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-slate-800 flex items-center gap-2">
              일반 정보
            </h2>
            <div className="text-slate-700 text-base leading-relaxed">
              <div className="mb-2"><span className="font-medium">계정 소유자:</span> {account?.name}</div>
              <div className="mb-2"><span className="font-medium">계정 유형:</span> {account?.type}</div>
              <div className="mb-2"><span className="font-medium">상태:</span> <span className="text-green-600 font-semibold">{account?.status}</span></div>
              <div><span className="font-medium">개설일:</span> 2022년 1월 15일</div>
            </div>
          </section>
        </Card>
        {/* Account Codes */}
        <Card className="p-8 shadow-xl border border-slate-200 flex-1">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-slate-800 flex items-center gap-2">
              계정 코드
            </h2>
            <div className="grid grid-cols-1 gap-4 text-slate-700">
              <div><span className="font-medium">계좌 번호:</span> <span className="font-mono tracking-wider">1234 5678 9012 3456</span></div>
              <div><span className="font-medium">SWIFT 코드:</span> <span className="font-mono tracking-wider">BWAIUS33</span></div>
              <div><span className="font-medium">IBAN:</span> <span className="font-mono tracking-wider">US00BWAI12345678901234</span></div>
              <div><span className="font-medium">라우팅 번호:</span> <span className="font-mono tracking-wider">021000021</span></div>
            </div>
          </section>
        </Card>
        {/* Agreements */}
        <Card className="p-8 shadow-xl border border-slate-200 flex-1">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-slate-800 flex items-center gap-2">
              계약 및 약관
            </h2>
            <ul className="list-disc ml-6 text-slate-700 space-y-2">
              <li>
                <a href="#" className="text-blue-600 underline font-medium">서비스 약관</a> — 계정 보유자로서의 권리와 책임을 설명합니다.
              </li>
              <li>
                <a href="#" className="text-blue-600 underline font-medium">전자 통신 계약</a> — 중요한 정보를 전자적으로 전달하는 방법에 대해 설명합니다.
              </li>
              <li>
                <a href="#" className="text-blue-600 underline font-medium">요금 일정</a> — 계정 관련 수수료에 대한 정보를 제공합니다.
              </li>
            </ul>
          </section>
        </Card>
        {/* Policy */}
        <Card className="p-8 shadow-xl border border-slate-200 flex-1">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-slate-800 flex items-center gap-2">
              개인정보 보호 및 보안 정책
            </h2>
            <div className="text-slate-700 text-base leading-relaxed">
              <p className="mb-2">저희는 고객님의 개인정보 보호와 보안을 최우선으로 생각합니다. 업계 최고 수준의 암호화 및 보안 기술을 사용하여 고객님의 데이터와 금융 정보를 보호합니다.</p>
              <p className="mb-2">고객님의 명시적인 동의 없이는 제3자와 정보를 공유하지 않습니다. 전체 정책은 아래에서 확인하실 수 있습니다.</p>
              <a href="#" className="text-blue-600 underline font-medium">개인정보 보호정책 보기</a>
            </div>
          </section>
        </Card>
      </div>
    </div>
  );
}
