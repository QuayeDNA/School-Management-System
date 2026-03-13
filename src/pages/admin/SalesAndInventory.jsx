import React, { useMemo, useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import {
  FaShoppingCart,
  FaBoxes,
  FaChartLine,
  FaTags,
  FaClipboardList,
  FaExchangeAlt,
  FaCog,
  FaSearch,
  FaPlus,
  FaFileExport,
} from "react-icons/fa";
import PropTypes from "prop-types";
import { useInventory, useAddInventory, useUpdateInventory, useDeleteInventory } from "../../hooks/useInventory";
import { useTransactions, useAddTransaction } from "../../hooks/useTransactions";

const SalesAndInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: inventory = [] } = useInventory();
  const addInventoryMutation = useAddInventory();
  const updateInventoryMutation = useUpdateInventory();
  const deleteInventoryMutation = useDeleteInventory();

  const { data: transactions = [] } = useTransactions();
  const addTransactionMutation = useAddTransaction();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return inventory;

    return inventory.filter((item) => {
      return (
        item.name.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized)
      );
    });
  }, [inventory, searchTerm]);

  const filteredSales = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return transactions;

    return transactions.filter((txn) => {
      return (
        (txn.category ?? '').toLowerCase().includes(normalized) ||
        (txn.type ?? '').toLowerCase().includes(normalized) ||
        String(txn.amount).includes(normalized)
      );
    });
  }, [transactions, searchTerm]);

  const totalSales = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'income' || t.type === 'sale')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  }, [transactions]);

  const totalInventoryValue = useMemo(() => {
    return inventory.reduce((sum, item) => {
      const value = Number(item.quantity || 0) * Number(item.unitPrice || 0);
      return sum + value;
    }, 0);
  }, [inventory]);

  const lowStockCount = useMemo(() => {
    return inventory.filter((item) => Number(item.quantity || 0) <= 5).length;
  }, [inventory]);

  const handleAddProduct = async () => {
    const name = window.prompt('Product name');
    if (!name) return;

    const category = window.prompt('Category') || 'Uncategorized';
    const quantity = Number(window.prompt('Quantity (number)') || 0);
    const unitPrice = Number(window.prompt('Unit price (number)') || 0);

    await addInventoryMutation.mutateAsync({
      name,
      category,
      quantity,
      unitPrice,
      syncStatus: 'pending',
    });
  };

  const handleRecordSale = async () => {
    const amount = Number(window.prompt('Sale amount (number)') || 0);
    if (!amount) return;

    await addTransactionMutation.mutateAsync({
      type: 'income',
      category: 'Sales',
      amount,
      date: new Date().toISOString(),
      syncStatus: 'pending',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sales and Inventory Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Sales"
          amount={`₵${totalSales.toLocaleString()}`}
          icon={<FaShoppingCart className="text-green-500" />}
        />
        <SummaryCard
          title="Total Inventory Value"
          amount={`₵${totalInventoryValue.toLocaleString()}`}
          icon={<FaBoxes className="text-blue-500" />}
        />
        <SummaryCard
          title="Low Stock Items"
          amount={`${lowStockCount}`}
          icon={<FaTags className="text-yellow-500" />}
        />
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            <FaPlus className="mr-2" /> New Product
          </button>
          <button
            onClick={handleRecordSale}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
          >
            <FaFileExport className="mr-2" /> Record Sale
          </button>
        </div>
      </div>

      <TabGroup>
        <TabList className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6 overflow-x-auto">
          {[
            "Overview",
            "Sales",
            "Inventory",
            "Products",
            "Orders",
            "Restocking",
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
            <OverviewPanel inventory={inventory} transactions={transactions} />
          </TabPanel>
          <TabPanel>
            <SalesPanel transactions={transactions} />
          </TabPanel>
          <TabPanel>
            <InventoryPanel
              inventory={filteredInventory}
              onEdit={(item) => {
                const name = window.prompt('New name', item.name) || item.name;
                const category = window.prompt('New category', item.category) || item.category;
                const quantity = Number(window.prompt('New quantity', item.quantity) || item.quantity);
                const unitPrice = Number(window.prompt('New unit price', item.unitPrice || 0) || item.unitPrice || 0);

                updateInventoryMutation.mutate({
                  id: item.id,
                  data: { name, category, quantity, unitPrice },
                });
              }}
              onDelete={(id) => deleteInventoryMutation.mutate(id)}
            />
          </TabPanel>
          <TabPanel>
            <ProductsPanel />
          </TabPanel>
          <TabPanel>
            <OrdersPanel />
          </TabPanel>
          <TabPanel>
            <RestockingPanel />
          </TabPanel>
          <TabPanel>
            <SettingsPanel />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

const SummaryCard = ({ title, amount, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{amount}</p>
    </div>
    <div className="text-4xl">{icon}</div>
  </div>
);

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

const OverviewPanel = ({ inventory, transactions }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Top Inventory Items</h2>
      {inventory.length === 0 ? (
        <p className="text-gray-500">No inventory data available.</p>
      ) : (
        <ul className="space-y-2">
          {inventory
            .slice()
            .sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
            .slice(0, 5)
            .map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-gray-600">Qty: {item.quantity}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No sales recorded yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions
            .slice()
            .filter((t) => t.type === 'income' || t.type === 'sale')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((txn) => (
              <li key={txn.id} className="flex justify-between">
                <span>{txn.category || txn.type}</span>
                <span className="text-gray-600">₵{Number(txn.amount).toLocaleString()}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  </div>
);

const SalesPanel = ({ transactions }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
    {transactions.length === 0 ? (
      <p className="text-gray-500">No sales data available.</p>
    ) : (
      <div className="space-y-3">
        <p className="text-gray-600">Total transactions: {transactions.length}</p>
        <p className="text-gray-600">
          Total sales: ₵{transactions
            .filter((t) => t.type === 'income' || t.type === 'sale')
            .reduce((sum, t) => sum + Number(t.amount || 0), 0)
            .toLocaleString()}
        </p>
      </div>
    )}
  </div>
);

const InventoryPanel = ({ inventory, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>

    {inventory.length === 0 ? (
      <p className="text-gray-500">No inventory items available.</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Unit Price</th>
              <th className="py-2 px-4 text-left">Value</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.category}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">₵{Number(item.unitPrice || 0).toLocaleString()}</td>
                <td className="py-2 px-4">₵{(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

InventoryPanel.propTypes = {
  inventory: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const ProductsPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Product Management</h2>
    {/* Add product management table or components here */}
  </div>
);

const OrdersPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
    {/* Add order tracking table or components here */}
  </div>
);

const RestockingPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Restocking Management</h2>
    {/* Add restocking management components here */}
  </div>
);

const SettingsPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Sales and Inventory Settings</h2>
    {/* Add settings components here */}
  </div>
);

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

export default SalesAndInventoryPage;
