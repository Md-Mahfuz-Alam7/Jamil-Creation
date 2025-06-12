import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaFileInvoice, FaChartBar, FaUsers, FaCog } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Total Invoices', value: '24', icon: FaFileInvoice },
    { label: 'Total Revenue', value: '৳45,000', icon: FaChartBar },
    { label: 'Active Clients', value: '12', icon: FaUsers },
  ];

  const recentInvoices = [
    { id: 'INV-001', client: 'ABC Company', amount: '৳5,000', status: 'Paid' },
    { id: 'INV-002', client: 'XYZ Ltd', amount: '৳3,500', status: 'Pending' },
    { id: 'INV-003', client: 'Tech Corp', amount: '৳7,800', status: 'Draft' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.email}
          </h1>
          <p className="text-gray-600">Here's what's happening with your invoices today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-[#d4a373]" />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex gap-4">
              <Link
                to="/create-invoice"
                className="bg-[#d4a373] text-white px-4 py-2 rounded-lg hover:bg-[#cb997e] transition-colors duration-200"
              >
                Create New Invoice
              </Link>
              <button
                className="border border-[#d4a373] text-[#d4a373] px-4 py-2 rounded-lg hover:bg-[#d4a373] hover:text-white transition-colors duration-200"
              >
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Invoices</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Invoice ID</th>
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3 px-4 text-[#d4a373]">{invoice.id}</td>
                      <td className="py-3 px-4">{invoice.client}</td>
                      <td className="py-3 px-4">{invoice.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
