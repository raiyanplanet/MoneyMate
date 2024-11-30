import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faWallet,
  faPiggyBank,
  faCoins,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col overflow-hidden">
      {/* Logo / Title Section */}
      <div className="p-4 text-2xl font-bold border-b border-gray-600 text-center">
        MoneyMate
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer transition-colors">
            <FontAwesomeIcon icon={faChartPie} className="mr-3" />
            <span>Dashboard</span>
          </li>
          <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer transition-colors">
            <FontAwesomeIcon icon={faWallet} className="mr-3" />
            <span>Transactions</span>
          </li>
          <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer transition-colors">
            <FontAwesomeIcon icon={faPiggyBank} className="mr-3" />
            <span>Savings</span>
          </li>
          <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer transition-colors">
            <FontAwesomeIcon icon={faCoins} className="mr-3" />
            <span>Wallets</span>
          </li>
          <li className="p-4 flex items-center hover:bg-gray-700 cursor-pointer transition-colors">
            <FontAwesomeIcon icon={faClipboardList} className="mr-3" />
            <span>Loans</span>
          </li>
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-600 text-sm text-center">
        © 2024 Fort Gate
      </div>
    </div>
  );
};

export default Sidebar;
