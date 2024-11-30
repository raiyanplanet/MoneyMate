import React from "react";

type Transaction = {
  type: string; // "Internal Payment", "External Payment", "Income", or "Expense"
  date: string;
  status?: string; // Only required for specific transactions
  amount: string; // The amount as a string, e.g., "$40,000"
};

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="text-gray-600 mb-4">Outgoing Transactions</h4>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm">No transactions available.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2">Type</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{txn.type}</td>
                <td className="p-2">{txn.date}</td>
                <td className="p-2">{txn.status || "N/A"}</td>
                <td className="p-2">{txn.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionTable;
