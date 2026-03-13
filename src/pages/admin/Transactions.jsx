import React, { useMemo, useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
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
import { useTransactions, useAddTransaction, useDeleteTransaction } from "../../hooks/useTransactions";

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: transactions = [] } = useTransactions();
  const addTransactionMutation = useAddTransaction();
  const deleteTransactionMutation = useDeleteTransaction();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return transactions;

    return transactions.filter((transaction) => {
      return (
        transaction.type.toLowerCase().includes(normalized) ||
        transaction.category?.toLowerCase()?.includes(normalized) ||
        String(transaction.amount).includes(normalized)
      );
    });
  }, [transactions, searchTerm]);

  const handleAddTransaction = async () => {
    const description = window.prompt('Enter transaction description');
    if (!description) return;

    const amount = Number(window.prompt('Enter amount (numbers only)'));
    if (Number.isNaN(amount)) return;

    await addTransactionMutation.mutateAsync({
      type: 'income',
      amount,
      date: new Date().toISOString(),
      category: 'General',
      syncStatus: 'pending',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FinancialCard
          title="Total Income"
          amount={`₵${transactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0)
            .toLocaleString()}`}
          icon={<FaMoneyBillWave className="text-green-500" />}
        />
        <FinancialCard
          title="Total Expenses"
          amount={`₵${transactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0)
            .toLocaleString()}`}
          icon={<FaMoneyBillWave className="text-red-500" />}
        />
        <FinancialCard
          title="Current Balance"
          amount={`₵${(
            transactions
              .filter((t) => t.type === 'income')
              .reduce((sum, t) => sum + Number(t.amount), 0) -
            transactions
              .filter((t) => t.type === 'expense')
              .reduce((sum, t) => sum + Number(t.amount), 0)
          ).toLocaleString()}`}
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
          <button
            onClick={handleAddTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            <FaPlus className="mr-2" /> New Transaction
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors">
            <FaFileExport className="mr-2" /> Export Report
          </button>
        </div>
      </div>

      <TabGroup>
        <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
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
        </TabList>
        <TabPanels>
          <TabPanel>
            <OverviewPanel transactions={filteredTransactions} />
          </TabPanel>
          <TabPanel>
            <IncomePanel />
          </TabPanel>
          <TabPanel>
            <ExpensesPanel />
          </TabPanel>
          <TabPanel>
            <InvoicesPanel />
          </TabPanel>
          <TabPanel>
            <HistoryPanel transactions={filteredTransactions} onDelete={deleteTransactionMutation.mutateAsync} />
          </TabPanel>
          <TabPanel>
            <BudgetPanel />
          </TabPanel>
          <TabPanel>
            <SettingsPanel />
          </TabPanel>
        </TabPanels>
      </TabGroup>
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

const OverviewPanel = ({ transactions }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.slice(-5).reverse().map((txn) => (
            <li key={txn.id} className="flex justify-between">
              <span className="font-medium">{txn.category || txn.type}</span>
              <span className="text-gray-600">₵{Number(txn.amount).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
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

const HistoryPanel = ({ transactions, onDelete }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
    {transactions.length === 0 ? (
      <p className="text-gray-500">No transactions have been recorded yet.</p>
    ) : (
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 text-left">Date</th>
            <th className="py-2 text-left">Type</th>
            <th className="py-2 text-left">Category</th>
            <th className="py-2 text-left">Amount</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-t">
              <td className="py-2">{new Date(txn.date).toLocaleDateString()}</td>
              <td className="py-2">{txn.type}</td>
              <td className="py-2">{txn.category}</td>
              <td className="py-2">₵{Number(txn.amount).toLocaleString()}</td>
              <td className="py-2">
                <button
                  onClick={() => onDelete(txn.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
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
