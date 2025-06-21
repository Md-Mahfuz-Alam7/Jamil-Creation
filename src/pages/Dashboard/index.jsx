import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaFileInvoice, FaChartBar, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import ViewInvoiceModal from '../../components/invoice/ViewInvoiceModal';
import { exportInvoicesToExcel } from '../../utils/exportToExcel';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvoices: 0,
    totalRevenue: 0,
    totalDue: 0,
    paidInvoices: 0
  });
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const q = query(
          collection(db, 'invoices'),
          where('userId', '==', user.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const invoiceData = [];
        let totalRevenue = 0;
        let totalDue = 0;
        let paidCount = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const invoice = {
            id: doc.id,
            ...data,
            dueAmount: data.summary.grandTotal - (data.summary.receivedAmount || 0)
          };
          
          invoiceData.push(invoice);
          totalRevenue += data.summary.grandTotal;
          totalDue += invoice.dueAmount;
          if (data.status === 'paid') paidCount++;
        });

        // Sort by date descending
        invoiceData.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());

        setInvoices(invoiceData);
        setStats({
          totalInvoices: invoiceData.length,
          totalRevenue,
          totalDue,
          paidInvoices: paidCount
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchInvoices();
    }
  }, [user]);
  const handleMarkAsPaid = async (invoice) => {
    if (!confirm('Are you sure you want to mark this invoice as paid?')) {
      return;
    }

    try {
      const invoiceRef = doc(db, 'invoices', invoice.id);
      const timestamp = new Date();
      
      await updateDoc(invoiceRef, {
        status: 'paid',
        'summary.receivedAmount': invoice.summary.grandTotal,
        updatedAt: timestamp,
        paidAt: timestamp
      });

      // Update local state
      const updatedInvoices = invoices.map(inv => 
        inv.id === invoice.id 
          ? {
              ...inv,
              status: 'paid',
              summary: {
                ...inv.summary,
                receivedAmount: inv.summary.grandTotal
              },
              dueAmount: 0,
              updatedAt: timestamp,
              paidAt: timestamp
            }
          : inv
      );

      setInvoices(updatedInvoices);

      // Update stats
      const dueAmount = invoice.summary.grandTotal - (invoice.summary.receivedAmount || 0);
      setStats(prev => ({
        ...prev,
        paidInvoices: prev.paidInvoices + 1,
        totalDue: Math.max(0, prev.totalDue - dueAmount)
      }));

      // If modal is open, update the selected invoice
      if (selectedInvoice && selectedInvoice.id === invoice.id) {
        setSelectedInvoice({
          ...selectedInvoice,
          status: 'paid',
          summary: {
            ...selectedInvoice.summary,
            receivedAmount: selectedInvoice.summary.grandTotal
          },
          dueAmount: 0,
          updatedAt: timestamp,
          paidAt: timestamp
        });
      }

      alert('Invoice marked as paid successfully!');
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      alert('Failed to update invoice status. Please try again.');
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleExportToExcel = () => {
    try {
      exportInvoicesToExcel(invoices);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export invoices');
    }
  };

  const getStatusColor = (status, dueAmount) => {
    if (status === 'paid') return 'bg-green-100 text-green-800';
    if (status === 'draft') return 'bg-gray-100 text-gray-800';
    return dueAmount > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filter === 'all') return true;
    if (filter === 'paid') return invoice.status === 'paid';
    if (filter === 'pending') return invoice.status === 'sent' && invoice.dueAmount > 0;
    if (filter === 'draft') return invoice.status === 'draft';
    return true;
  });

  const statsCards = [
    { 
      label: 'Total Invoices', 
      value: stats.totalInvoices, 
      icon: FaFileInvoice,
      color: 'text-blue-600'
    },
    { 
      label: 'Total Revenue', 
      value: `৳${stats.totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, 
      icon: FaChartBar,
      color: 'text-green-600'
    },
    { 
      label: 'Total Due', 
      value: `৳${stats.totalDue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`, 
      icon: FaMoneyBillWave,
      color: 'text-red-600'
    },
    { 
      label: 'Paid Invoices', 
      value: `${stats.paidInvoices}/${stats.totalInvoices}`, 
      icon: FaClock,
      color: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a373]"></div>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
            >
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
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
                onClick={handleExportToExcel}
                className="border border-[#d4a373] text-[#d4a373] px-4 py-2 rounded-lg hover:bg-[#d4a373] hover:text-white transition-colors duration-200"
              >
                Download All Invoices
              </button>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-lg ${
                    filter === 'all' ? 'bg-[#d4a373] text-white' : 'border border-[#d4a373] text-[#d4a373]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('paid')}
                  className={`px-3 py-1 rounded-lg ${
                    filter === 'paid' ? 'bg-[#d4a373] text-white' : 'border border-[#d4a373] text-[#d4a373]'
                  }`}
                >
                  Paid
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-3 py-1 rounded-lg ${
                    filter === 'pending' ? 'bg-[#d4a373] text-white' : 'border border-[#d4a373] text-[#d4a373]'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-3 py-1 rounded-lg ${
                    filter === 'draft' ? 'bg-[#d4a373] text-white' : 'border border-[#d4a373] text-[#d4a373]'
                  }`}
                >
                  Draft
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Invoice ID</th>
                    <th className="text-left py-3 px-4">Client</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Due</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b last:border-b-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-[#d4a373]">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4">{invoice.billTo.clientName}</td>
                      <td className="py-3 px-4">
                        {new Date(invoice.invoiceDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        ৳{invoice.summary.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">
                        ৳{invoice.dueAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          getStatusColor(invoice.status, invoice.dueAmount)
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-2 items-end">
                        {invoice.status !== 'paid' && invoice.status !== 'draft' && (
                          <button
                            onClick={() => handleMarkAsPaid(invoice)}
                            className="w-full bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium shadow-sm hover:shadow"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => handleViewInvoice(invoice)}
                          className="w-full bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-sm hover:shadow flex items-center justify-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View/Edit
                        </button>
                      </div>
                    </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>      {/* View Invoice Modal */}
      {selectedInvoice && (
        <ViewInvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onUpdate={(updatedInvoice) => {
            setInvoices(prev => prev.map(inv => 
              inv.id === updatedInvoice.id ? { ...inv, ...updatedInvoice } : inv
            ));
            setSelectedInvoice(updatedInvoice);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
