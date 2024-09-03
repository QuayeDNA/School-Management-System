import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  FaMoneyBillWave,
  FaChartLine,
  FaFileInvoiceDollar,
  FaHistory,
  FaCog,
  FaSearch,
  FaPlus,
  FaFileExport,
} from "react-icons/fa";

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here₵
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FinancialCard
          title="Total Income"
          amount="₵250,000"
          icon={<FaMoneyBillWave className="text-green-500" />}
        />
        <FinancialCard
          title="Total Expenses"
          amount="₵180,000"
          icon={<FaMoneyBillWave className="text-red-500" />}
        />
        <FinancialCard
          title="Current Balance"
          amount="₵70,000"
          icon={<FaMoneyBillWave className="text-blue-500" />}
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors">
            <FaPlus className="mr-2" /> New Transaction
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors">
            <FaFileExport className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
          {[
            "Overview",
            "Income",
            "Expenses",
            "Invoices",
            "History",
            "Budget",
            "Settings",
          ].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 whitespace-nowrap
                ${
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                }`
              }>
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <OverviewPanel />
          </Tab.Panel>
          <Tab.Panel>
            <IncomePanel />
          </Tab.Panel>
          <Tab.Panel>
            <ExpensesPanel />
          </Tab.Panel>
          <Tab.Panel>
            <InvoicesPanel />
          </Tab.Panel>
          <Tab.Panel>
            <HistoryPanel />
          </Tab.Panel>
          <Tab.Panel>
            <BudgetPanel />
          </Tab.Panel>
          <Tab.Panel>
            <SettingsPanel />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

const FinancialCard = ({ title, amount, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{amount}</p>
    </div>
    <div className="text-4xl">{icon}</div>
  </div>
);

const OverviewPanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      {/* Add a table or list of recent transactions here */}
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
      {/* Add charts or graphs for financial summary here */}
    </div>
  </div>
);

const IncomePanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Income Tracking</h2>
    {/* Add income tracking table or components here */}
  </div>
);

const ExpensesPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Expense Tracking</h2>
    {/* Add expense tracking table or components here */}
  </div>
);

const InvoicesPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Invoices Management</h2>
    {/* Add invoice management components here */}
  </div>
);

const HistoryPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
    {/* Add transaction history table or components here */}
  </div>
);

const BudgetPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Budget Management</h2>
    {/* Add budget management components here */}
  </div>
);

const SettingsPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Transaction Settings</h2>
    {/* Add settings components here */}
  </div>
);

export default TransactionsPage;
