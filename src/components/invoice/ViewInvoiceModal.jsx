import React from 'react';
import Button from '../ui/Button';

const ViewInvoiceModal = ({ invoice, onClose }) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invoice #{invoice.invoiceNumber}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Bill To</h3>
            <div className="text-gray-600">
              <p className="font-medium">{invoice.billTo.clientName}</p>
              <p>{invoice.billTo.companyName}</p>
              <p>{invoice.billTo.address}</p>
              <p>{invoice.billTo.email}</p>
              <p>{invoice.billTo.phone}</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Invoice Info</h3>
            <div className="text-gray-600">
              <p>Invoice Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
              <p>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
              <p>Status: <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                invoice.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span></p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Items</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Price</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Tax</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">৳{item.unitPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.taxPercent}%</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">৳{item.lineTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <div className="w-80 ml-auto">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>৳{invoice.summary.subtotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax Total</span>
                <span>৳{invoice.summary.taxTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Discount</span>
                <span>৳{invoice.summary.discount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>৳{invoice.summary.shipping.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-medium">Grand Total</span>
                <span className="font-medium">৳{invoice.summary.grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Received Amount</span>
                <span>৳{(invoice.summary.receivedAmount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm text-red-600 font-medium">
                <span>Due Amount</span>
                <span>৳{((invoice.summary.grandTotal || 0) - (invoice.summary.receivedAmount || 0)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
          </div>
        )}

        {/* Close Button */}
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-6"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
