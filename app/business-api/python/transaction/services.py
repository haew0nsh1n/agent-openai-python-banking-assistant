from typing import List, Optional
from models import Transaction
import logging
from datetime import datetime

logger = logging.getLogger(__name__)


class TransactionService:
    def __init__(self):
        self.last_transactions = {}
        self.all_transactions = {}

        # populate sample data for account 1010 similar to Java
        self.last_transactions["1010"] = [
            Transaction(
                id="11",
                description="가정용 전기 청구서 334398",
                type="payment",
                flowType="outcome",
                recipientName="ACME",
                recipientBankReference="0001",
                accountId="1010",
                paymentType="은행 송금",
                amount=160.40,
                timestamp=datetime.now().isoformat() + "Z",
                category="공과금",
                status="대기중"
            ),
            Transaction(
                id="22",
                description="사무용품 서비스 결제",
                type="payment",
                flowType="outcome",
                recipientName="Contoso Services",
                recipientBankReference="0002",
                accountId="1010",
                paymentType="신용카드",
                cardId="card-8421",
                amount=215.00,
                timestamp="2025-03-02T12:00:00Z",
                category="사무용품",
                status="완료"
            ),
            Transaction(
                id="33",
                description="고객 비즈니스 점심",
                type="payment",
                flowType="outcome",
                recipientName="Duff",
                accountId="1010",
                paymentType="신용카드",
                cardId="card-8421",
                amount=134.10,
                timestamp="2025-10-03T12:00:00Z",
                category="식비",
                status="완료"
            ),
            Transaction(
                id="43",
                description="ATM 00987에서 카드 출금",
                type="withdrawal",
                flowType="outcome",
                accountId="1010",
                paymentType="자동이체",
                cardId="card-3311",
                amount=150.00,
                timestamp="2025-8-04T12:00:00Z",
                category="보험",
            ),
            Transaction(
                id="53",
                description="청구서 19dee 환불",
                type="deposit",
                flowType="income",
                recipientName="oscorp",
                recipientBankReference="0005",
                accountId="1010",
                paymentType="은행 송금",
                amount=522.00,
                timestamp="2025-4-05T12:00:00Z",
                category="환불",
                cardId="card-0098",
            )
        ]

        self.all_transactions["1010"] = [
            Transaction(
                id="373737",
                description="가정용 전기 청구서 334398",
                type="payment",
                flowType="outcome",
                recipientName="ACME",
                recipientBankReference="0001",
                accountId="1010",
                paymentType="은행 송금",
                amount=160.40,
                timestamp=datetime.now().isoformat() + "Z",
                category="공과금",
                status="대기중"
            ),
            Transaction(
                id="232334",
                description="사무용품 서비스 결제",
                type="payment",
                flowType="outcome",
                recipientName="Contoso",
                recipientBankReference="0002",
                accountId="1010",
                paymentType="신용카드",
                cardId="55555",
                amount=215.00,
                timestamp="2025-03-02T12:00:00Z",
                category="사무용품",
                status="완료"
            ),
            Transaction(
                id="3321432",
                description="고객 비즈니스 점심",
                type="payment",
                flowType="outcome",
                recipientName="Duff",
                accountId="1010",
                paymentType="신용카드",
                cardId="66666",
                amount=134.10,
                timestamp="2025-10-03T12:00:00Z",
                category="식비",
                status="완료"
            ),
            Transaction(
                id="99584",
                description="ATM 00987에서 카드 출금",
                type="withdrawal",
                flowType="outcome",
                accountId="1010",
                paymentType="자동이체",
                amount=150.00,
                cardId="card-3311",
                timestamp="2025-8-04T12:00:00Z",
                category="보험",
            ),
            Transaction(
                id="99477",
                description="청구서 19dee 환불",
                type="deposit",
                flowType="income",
                recipientName="oscorp",
                recipientBankReference="0005",
                accountId="1010",
                paymentType="은행 송금",
                amount=522.00,
                timestamp="2025-4-05T12:00:00Z",
                category="환불",
                cardId="card-0098",
            ),
            Transaction(
                id="388373",
                description="가스 공급 청구서 173645AB435",
                type="payment",
                flowType="outcome",
                recipientName="ACME",
                recipientBankReference="A012TABTYT156!",
                accountId="1010",
                paymentType="은행 송금",
                amount=100.00,
                timestamp=datetime.now().isoformat() + "Z",
                category="공과금",
                status="대기중"
            ),
            Transaction(
                id="337733",
                description="배관 및 기타 서비스. 청구서 998877",
                type="payment",
                flowType="outcome",
                recipientName="ACME",
                recipientBankReference="0002",
                accountId="1010",
                paymentType="은행 송금",
                amount=323.00,
                timestamp=datetime.now().isoformat() + "Z",
                category="구독",
                status="대기중"
            ),
            Transaction(
                id="884995",
                description="사무실 에어컨. 청구서 355TRA1423FFSSS",
                type="payment",
                flowType="outcome",
                recipientName="Contoso Services",
                recipientBankReference="0003",
                accountId="1010",
                paymentType="자동이체",
                amount=300.00,
                timestamp="2025-10-03T12:00:00Z",
                category="서비스",
                status="완료"

            ),
            Transaction(
                id="304984",
                description="보험료 월납. 참조:12365GSHT",
                type="transfer",
                flowType="outcome",
                recipientName="ACME",
                recipientBankReference="0004",
                accountId="1010",
                paymentType="Transfer",
                amount=320.00,
                timestamp="2025-8-04T12:00:00Z",
                category="저축",
            ),
            Transaction(
                id="3946373",
                description="지하철 및 버스 정기권 2023-AB56",
                type="payment",
                flowType="outcome",
                recipientName="Speedy Subways",
                recipientBankReference="0005",
                accountId="1010",
                paymentType="신용카드",
                cardId="66666",
                amount=410.00,
                timestamp="2025-04-05T12:00:00Z",
                category="소매",
                status="완료"
            ),

            Transaction(
                id="2004764",
                description="안과 검진 결제. 참조: MZ23-5567",
                type="payment",
                flowType="outcome",
                recipientName="Contoso Health",
                recipientBankReference="0001",
                accountId="1010",
                paymentType="신용카드",
                cardId="66666",
                amount=230.00,
                timestamp="2025-11-01T12:00:00Z",
                category="의료",
                status="완료"
            ),
            Transaction(
                id="49950598",
                description="청구서 682222 결제",
                type="payment",
                flowType="outcome",
                recipientName="Contoso Services",
                recipientBankReference="0002",
                accountId="1010",
                paymentType="신용카드",
                cardId="55555",
                amount=200.00,
                timestamp="2025-11-02T12:00:00Z",
                category="임대료",
                status="완료"
            ),
            Transaction(
                id="488624",
                description="월급 - StartUp.com",
                type="deposit",
                flowType="income",
                accountId="1010",
                paymentType="Transfer",
                amount=3000.00,
                timestamp="2025-10-03T12:00:00Z",
                category="급여",
            ),
            Transaction(
                id="3004853",
                description="주식 베스팅 입금. www.traderepublic.com - FY25Q3",
                type="deposit",
                flowType="income",
                accountId="1010",
                paymentType="Transfer",
                amount=400.00,
                timestamp="2025-8-04T12:00:00Z",
                category="투자",
            ),
            Transaction(
                id="3994853",
                description="ATM 345516에서 출금",
                type="withdrawal",
                flowType="outcome",
                accountId="1010",
                paymentType="Transfer",
                cardId="card-3311",
                amount=500.00,
                timestamp="2025-11-05T12:00:00Z",
                category="교육",
            ),
        ]

    def get_transactions_by_recipient_name(self, account_id: str, name: str) -> List[Transaction]:
        logger.info(
            "get_transactions_by_recipient_name called with account_id=%s, name=%s", account_id, name)
        if not account_id:
            raise ValueError("AccountId is empty or null")
        if not account_id.isdigit():
            raise ValueError("AccountId is not a valid number")
        transactions = self.all_transactions.get(account_id)
        if transactions is None:
            return []
        name_lower = name.lower() if name else ""
        filtered = [
            t for t in transactions if t.recipientName and name_lower in t.recipientName.lower()]
        return sorted(filtered, key=lambda t: t.timestamp, reverse=True)

    def get_transactions(self, account_id: str) -> List[Transaction]:
        logger.info(
            "get_last_transactions called with account_id=%s", account_id)
        if not account_id:
            raise ValueError("AccountId is empty or null")
        if not account_id.isdigit():
            raise ValueError("AccountId is not a valid number")
        transactions = self.last_transactions.get(account_id)
        if not transactions:
            return []
        return sorted(transactions, key=lambda t: t.timestamp, reverse=True)

    def get_transactions_by_type(
        self,
        account_id: str,
        payment_type: Optional[str] = None,
        transaction_type: Optional[str] = None,
        card_id: Optional[str] = None,
    ) -> List[Transaction]:
        logger.info(
            "get_transactions_by_payment_type called with account_id=%s, payment_type=%s, transaction_type=%s, card_id=%s",
            account_id,
            payment_type,
            transaction_type,
            card_id,
        )
        if not account_id:
            raise ValueError("AccountId is empty or null")
        if not account_id.isdigit():
            raise ValueError("AccountId is not a valid number")
        transactions = self.all_transactions.get(account_id)
        if transactions is None:
            return []
        filtered = transactions
        if transaction_type:
            filtered = [t for t in filtered if t.type == transaction_type]
        if payment_type:
            filtered = [t for t in filtered if t.paymentType == payment_type]
        if card_id:
            filtered = [t for t in filtered if t.cardId == card_id]
        return sorted(filtered, key=lambda t: t.timestamp, reverse=True)

    def notify_transaction(self, account_id: str, transaction: Transaction) -> None:
        logger.info(
            "notify_transaction called with account_id=%s, transaction=%s", account_id, transaction)
        if not account_id:
            raise ValueError("AccountId is empty or null")
        if not account_id.isdigit():
            raise ValueError("AccountId is not a valid number")
        all_list = self.all_transactions.get(account_id)
        if all_list is None:
            raise RuntimeError(
                f"Cannot find all transactions for account id: {account_id}")
        all_list.append(transaction)

        last_list = self.last_transactions.get(account_id)
        if last_list is None:
            raise RuntimeError(
                f"Cannot find last transactions for account id: {account_id}")
        last_list.append(transaction)


# create a single service instance (in-memory sample data lives here)
transaction_service_singleton = TransactionService()
