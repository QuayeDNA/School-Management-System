import React, { useState } from "react";
import { Tab } from "@headlessui/react";
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

const SalesAndInventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Sales and Inventory Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Sales"
          amount="₵120,000"
          icon={<FaShoppingCart className="text-green-500" />}
        />
        <SummaryCard
          title="Total Inventory Value"
          amount="₵500,000"
          icon={<FaBoxes className="text-blue-500" />}
        />
        <SummaryCard
          title="Low Stock Items"
          amount="15"
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors">
            <FaPlus className="mr-2" /> New Product
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
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <OverviewPanel />
          </Tab.Panel>
          <Tab.Panel>
            <SalesPanel />
          </Tab.Panel>
          <Tab.Panel>
            <InventoryPanel />
          </Tab.Panel>
          <Tab.Panel>
            <ProductsPanel />
          </Tab.Panel>
          <Tab.Panel>
            <OrdersPanel />
          </Tab.Panel>
          <Tab.Panel>
            <RestockingPanel />
          </Tab.Panel>
          <Tab.Panel>
            <SettingsPanel />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
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

const OverviewPanel = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
      {/* Add a table or list of top selling products here */}
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
      {/* Add charts or graphs for sales trends here */}
    </div>
  </div>
);

const SalesPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
    {/* Add sales analytics components and charts here */}
  </div>
);

const InventoryPanel = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Inventory Status</h2>
    {/* Add inventory status table or components here */}
  </div>
);

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
