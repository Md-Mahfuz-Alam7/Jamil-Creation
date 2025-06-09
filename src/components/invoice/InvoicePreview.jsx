import React from 'react';

const InvoicePreview = ({ invoiceData, summary }) => {
  return (
    <div className="bg-white rounded-lg p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Invoice Preview</h2>
      
      {/* Invoice Details */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Invoice Number</p>
            <p className="font-medium">{invoiceData.invoiceNumber || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Invoice Date</p>
            <p className="font-medium">{invoiceData.invoiceDate || 'N/A'}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">Due Date</p>
          <p className="font-medium">{invoiceData.dueDate || 'N/A'}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Bill To</h3>
        <div className="border-l-2 border-blue-500 pl-4">
          <p className="font-medium">{invoiceData.billTo.clientName}</p>
          <p>{invoiceData.billTo.companyName}</p>
          <p className="whitespace-pre-line text-sm text-gray-600">{invoiceData.billTo.address}</p>
          <p className="text-sm text-gray-600">{invoiceData.billTo.email}</p>
          <p className="text-sm text-gray-600">{invoiceData.billTo.phone}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Items</h3>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Qty</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Tax</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>          <td className="px-4 py-2 text-right">৳{item.unitPrice.toFixed(2)}</td>
          <td className="px-4 py-2 text-right">{item.taxPercent}%</td>
          <td className="px-4 py-2 text-right">৳{item.lineTotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>              <span>৳{summary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax Total</span>
              <span>৳{summary.taxTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span>৳{summary.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>৳{summary.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Received Amount</span>
              <span>৳{summary.receivedAmount?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Grand Total</span>
              <span>৳{summary.grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-600 font-bold mt-2">
              <span>Remaining</span>
              <span>৳{(summary.grandTotal - (summary.receivedAmount || 0)).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoiceData.notes && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}

      {/* Payment Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Payment Information</h3>
        <div className="text-sm text-gray-600">          <p>Payment Method: {invoiceData.paymentMethod ? invoiceData.paymentMethod.replace('_', ' ').toUpperCase() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
