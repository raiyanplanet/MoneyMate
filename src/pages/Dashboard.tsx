import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import KPIBox from "../components/KPIBox";
import BarChartComponent from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import TransactionTable from "../components/TransactionTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]); // Transactions array
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state
  const [isFormVisible, setIsFormVisible] = useState(false); // Form visibility state

  // Calculate income and expense dynamically
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount.slice(1)),
      0
    );

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (sum, transaction) => sum + parseFloat(transaction.amount.slice(1)),
      0
    );

  // Calculate the current balance
  const currentBalance = income - expense;

  useEffect(() => {
    // Load transactions from local storage on initial load
    const savedTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    // Save transactions to local storage whenever they change
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const amount = parseFloat(form.amount.value);
    const description = form.description.value;
    const type = form.type.value;

    // Validate amount
    if (amount <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }

    const newTransaction = {
      id: Math.random().toString(36).substring(2, 9), // Generate unique ID
      amount: `$${amount.toFixed(2)}`,
      description,
      type,
      date: new Date().toLocaleString(),
      status: type === "expense" ? "Waiting" : "Received",
    };

    // Add transaction
    setTransactions([...transactions, newTransaction]);

    form.reset();
    setIsFormVisible(false); // Hide form after submission
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Toggle Add Transaction Form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:flex-shrink-0`}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-lg font-bold text-gray-700">Menu</h1>
          <button
            aria-label="Close Sidebar"
            onClick={toggleSidebar}
            className=" py-2 px-3 rounded-sm bg-red-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4 bg-gray-100 relative">
        {/* Hamburger Icon */}
        <div className="absolute top-4 left-4 md:hidden max-sm:flex max-sm:items-center max-sm:justify-center max-sm:gap-2">
          <button
            aria-label="Open Sidebar"
            onClick={toggleSidebar}
            className=" px-2 py-4 rounded-sm bg-blue-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
          <Header />
        </div>

        {/* Current Balance Box */}
        <div className="my-6 p-4 bg-white rounded shadow-lg max-sm:mt-20">
          <h2 className="text-xl font-bold mb-4">Current Balance</h2>
          <div className="text-2xl font-semibold text-gray-800">{`$${currentBalance.toFixed(
            2
          )}`}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
          <KPIBox
            title="Income"
            value={`$${income.toFixed(2)}`}
            change="+4.4%"
            isPositive
          />
          <KPIBox
            title="Spending"
            value={`$${expense.toFixed(2)}`}
            change="-1.2%"
            isPositive={false}
          />
          <KPIBox
            title="All Funds"
            value={`$${(income + expense).toFixed(2)}`}
            change="+0.8%"
            isPositive
          />
          <KPIBox
            title="Net Profit"
            value={`$${(income - expense).toFixed(2)}`}
            change="+1.0%"
            isPositive
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BarChartComponent income={income} expense={expense} />
          <PieChartComponent income={income} expense={expense} />
        </div>

        {/* Add Transaction Button */}
        {!isFormVisible && (
          <button
            onClick={toggleFormVisibility}
            className="my-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Add Transaction
          </button>
        )}

        {/* Add Transaction Form */}
        {isFormVisible && (
          <div className="my-6 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
            <form onSubmit={handleAddTransaction}>
              <div className="flex gap-4 mb-4 max-sm:flex-col">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label htmlFor="amount" className="text-sm font-medium mb-2">
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    required
                    className="p-2 border rounded-lg max-sm:w-full"
                    min="0.01"
                    step="any"
                  />
                </div>
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium mb-2"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    className="p-2 border rounded-lg max-sm:w-full"
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex flex-col w-1/2 max-sm:w-full">
                  <label htmlFor="type" className="text-sm font-medium mb-2">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue="income"
                    className="p-2 border rounded-lg max-sm:w-full"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Transaction
              </button>
            </form>
          </div>
        )}

        {/* Transaction Table */}
        {transactions.length > 0 ? (
          <TransactionTable transactions={transactions} />
        ) : (
          <div className="text-center text-gray-500 my-6">
            No transactions to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
