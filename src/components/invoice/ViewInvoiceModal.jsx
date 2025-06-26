import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';
import Textarea from '../ui/Textarea';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ViewInvoiceModal = ({ invoice, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(invoice);
  const [loading, setLoading] = useState(false);

  // Reset edited data when invoice changes
  useEffect(() => {
    setEditedData(invoice);
  }, [invoice]);

  const handleBillToChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      billTo: {
        ...prev.billTo,
        [field]: value
      }
    }));
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxTotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * item.taxPercent / 100), 0);
    const grandTotal = subtotal + taxTotal + (editedData.summary.shipping || 0) - (editedData.summary.discount || 0);
    return { subtotal, taxTotal, grandTotal };
  };
  if (!invoice) return null;

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...editedData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    // Recalculate line total
    if (field === 'quantity' || field === 'unitPrice' || field === 'taxPercent') {
      const item = updatedItems[index];
      const subtotal = item.quantity * item.unitPrice;
      const tax = subtotal * (item.taxPercent / 100);
      updatedItems[index].lineTotal = subtotal + tax;
    }

    // Calculate new totals
    const { subtotal, taxTotal, grandTotal } = calculateTotals(updatedItems);

    setEditedData(prev => ({
      ...prev,
      items: updatedItems,
      summary: {
        ...prev.summary,
        subtotal,
        taxTotal,
        grandTotal
      }
    }));
  };

  const addItem = () => {
    setEditedData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: '',
          quantity: 1,
          unitPrice: 0,
          taxPercent: 0,
          lineTotal: 0
        }
      ]
    }));
  };

  const removeItem = (index) => {
    const updatedItems = editedData.items.filter((_, i) => i !== index);
    const { subtotal, taxTotal, grandTotal } = calculateTotals(updatedItems);

    setEditedData(prev => ({
      ...prev,
      items: updatedItems,
      summary: {
        ...prev.summary,
        subtotal,
        taxTotal,
        grandTotal
      }
    }));
  };

  const handleSummaryChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    const { subtotal, taxTotal } = calculateTotals(editedData.items);
    const grandTotal = subtotal + taxTotal + 
      (field === 'shipping' ? numValue : editedData.summary.shipping || 0) -
      (field === 'discount' ? numValue : editedData.summary.discount || 0);

    setEditedData(prev => ({
      ...prev,
      summary: {
        ...prev.summary,
        [field]: numValue,
        grandTotal
      }
    }));
  };

  const handleNotesChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      notes: value
    }));
  };

  const handleDueDateChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      dueDate: value
    }));
  };  const validateInvoiceData = (data) => {
    if (!data.items || data.items.length === 0) {
      throw new Error('Invoice must have at least one item');
    }
    
    if (!data.billTo?.clientName) {
      throw new Error('Client name is required');
    }

    if (!data.dueDate) {
      throw new Error('Due date is required');
    }

    return true;
  };

  const handlePaymentMethodChange = (value) => {
    setEditedData(prev => ({
      ...prev,
      paymentMethod: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      
      // Validate required fields
      validateInvoiceData(editedData);

      const invoiceRef = doc(db, 'invoices', invoice.id);
      
      // Calculate the final totals to ensure they're up to date
      const { subtotal, taxTotal, grandTotal } = calculateTotals(editedData.items);
      
      // Prepare the summary with calculated totals
      const summary = {
        ...editedData.summary,
        subtotal,
        taxTotal,
        grandTotal,
        dueAmount: grandTotal - (editedData.summary.receivedAmount || 0)
      };      // Prepare all updates while keeping the original structure and required fields
      const updates = {
        // Required fields from isValidInvoice()
        invoiceNumber: invoice.invoiceNumber,
        invoiceDate: invoice.invoiceDate,
        userId: invoice.userId,
        items: editedData.items.map(item => ({
          description: item.description || '',
          quantity: Number(item.quantity) || 0,
          unitPrice: Number(item.unitPrice) || 0,
          taxPercent: Number(item.taxPercent) || 0,
          lineTotal: Number(item.lineTotal) || 0
        })),
        
        // Updated fields
        billTo: {
          clientName: editedData.billTo.clientName || '',
          companyName: editedData.billTo.companyName || '',
          address: editedData.billTo.address || '',
          email: editedData.billTo.email || '',
          phone: editedData.billTo.phone || ''
        },
        notes: editedData.notes || '',
        dueDate: editedData.dueDate,
        paymentMethod: editedData.paymentMethod || '',
        summary: {
          ...summary,
          shipping: Number(summary.shipping) || 0,
          discount: Number(summary.discount) || 0,
          receivedAmount: Number(summary.receivedAmount) || 0
        },
        status: invoice.status,
        
        // Timestamps required by rules
        updatedAt: new Date().toISOString(),
        createdAt: invoice.createdAt
      };

      console.log('Saving invoice with data:', updates);

      await updateDoc(invoiceRef, updates);
      
      onUpdate({
        ...invoice,
        ...updates,
        id: invoice.id
      });
      
      setIsEditing(false);
      alert('Invoice updated successfully!');
    } catch (error) {
      console.error('Error updating invoice:', error);
      if (error.message) {
        alert(error.message);
      } else {
        alert('Failed to update invoice. Please check all required fields and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
        <div className="grid grid-cols-2 gap-8 mb-8">          <div>
            <h3 className="text-lg font-semibold mb-2">Bill To</h3>
            <div className="text-gray-600 space-y-2">
              {isEditing ? (
                <>
                  <InputField
                    label="Client Name"
                    value={editedData.billTo.clientName}
                    onChange={(e) => handleBillToChange('clientName', e.target.value)}
                  />
                  <InputField
                    label="Company Name"
                    value={editedData.billTo.companyName}
                    onChange={(e) => handleBillToChange('companyName', e.target.value)}
                  />
                  <InputField
                    label="Address"
                    value={editedData.billTo.address}
                    onChange={(e) => handleBillToChange('address', e.target.value)}
                  />
                  <InputField
                    label="Email"
                    type="email"
                    value={editedData.billTo.email}
                    onChange={(e) => handleBillToChange('email', e.target.value)}
                  />
                  <InputField
                    label="Phone"
                    value={editedData.billTo.phone}
                    onChange={(e) => handleBillToChange('phone', e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p className="font-medium">{invoice.billTo.clientName}</p>
                  <p>{invoice.billTo.companyName}</p>
                  <p>{invoice.billTo.address}</p>
                  <p>{invoice.billTo.email}</p>
                  <p>{invoice.billTo.phone}</p>
                </>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Invoice Info</h3>
            <div className="text-gray-600 space-y-2">
              <p>Invoice Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
              <p>
                Due Date:{' '}
                {isEditing ? (
                  <input
                    type="date"
                    value={editedData.dueDate.split('T')[0]}
                    onChange={(e) => handleDueDateChange(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  new Date(invoice.dueDate).toLocaleDateString()
                )}
              </p>
              <p>Status: <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                invoice.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>{invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span></p>
              <p>Payment Method:{' '}
                {isEditing ? (
                  <select
                    value={editedData.paymentMethod || ''}
                    onChange={e => handlePaymentMethodChange(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Select method</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Card">Card</option>
                    <option value="Mobile Payment">Mobile Payment</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <span className="ml-1">{invoice.paymentMethod || 'N/A'}</span>
                )}
              </p>
            </div>
          </div>
        </div>        {/* Items Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Items</h3>
            {isEditing && (
              <button
                onClick={addItem}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                Add Item
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Price</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Tax</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Total</th>
                  {isEditing && (
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {(isEditing ? editedData.items : invoice.items).map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                          className="w-full p-1 border rounded"
                        />
                      ) : (
                        item.description
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      {isEditing ? (
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-20 p-1 border rounded text-right"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end">
                          <span className="mr-1">৳</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-24 p-1 border rounded text-right"
                          />
                        </div>
                      ) : (
                        `৳${item.unitPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.taxPercent}
                            onChange={(e) => handleItemChange(index, 'taxPercent', parseInt(e.target.value) || 0)}
                            className="w-16 p-1 border rounded text-right"
                          />
                          <span className="ml-1">%</span>
                        </div>
                      ) : (
                        `${item.taxPercent}%`
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">
                      ৳{item.lineTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    {isEditing && (
                      <td className="px-4 py-3 text-sm text-right">
                        <button
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>        {/* Summary */}
        <div className="mb-8">
          <div className="w-80 ml-auto">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>৳{(isEditing ? editedData.summary.subtotal : invoice.summary.subtotal).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax Total</span>
                <span>৳{(isEditing ? editedData.summary.taxTotal : invoice.summary.taxTotal).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-500">Discount</span>
                {isEditing ? (
                  <div className="flex items-center">
                    <span className="mr-1">৳</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editedData.summary.discount || 0}
                      onChange={(e) => handleSummaryChange('discount', e.target.value)}
                      className="w-24 p-1 border rounded text-right"
                    />
                  </div>
                ) : (
                  <span>৳{invoice.summary.discount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                )}
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-500">Shipping</span>
                {isEditing ? (
                  <div className="flex items-center">
                    <span className="mr-1">৳</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editedData.summary.shipping || 0}
                      onChange={(e) => handleSummaryChange('shipping', e.target.value)}
                      className="w-24 p-1 border rounded text-right"
                    />
                  </div>
                ) : (
                  <span>৳{invoice.summary.shipping.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                )}
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="font-medium">Grand Total</span>
                <span className="font-medium">৳{(isEditing ? editedData.summary.grandTotal : invoice.summary.grandTotal).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-500">Received Amount</span>
                {isEditing && invoice.status !== 'paid' ? (
                  <div className="flex items-center">
                    <span className="mr-1">৳</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editedData.summary.receivedAmount || 0}
                      onChange={(e) => handleSummaryChange('receivedAmount', e.target.value)}
                      className="w-24 p-1 border rounded text-right"
                    />
                  </div>
                ) : (
                  <span>৳{((isEditing ? editedData.summary.receivedAmount : invoice.summary.receivedAmount) || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                )}
              </div>
              <div className="flex justify-between text-sm text-red-600 font-medium">
                <span>Due Amount</span>
                <span>৳{((isEditing ? editedData.summary.grandTotal : invoice.summary.grandTotal) - 
                        (isEditing ? editedData.summary.receivedAmount : invoice.summary.receivedAmount || 0)).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>        {/* Notes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Notes</h3>
          {isEditing ? (
            <Textarea
              value={editedData.notes || ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Add notes here..."
              className="h-32"
            />
          ) : (
            invoice.notes && <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
          )}
        </div>        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {invoice.status !== 'paid' && (
            isEditing ? (
              <>
                <Button
                  variant="primary"
                  onClick={handleSaveChanges}
                  className="px-6"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditedData(invoice);
                    setIsEditing(false);
                  }}
                  className="px-6"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                className="px-6"
              >
                Edit Invoice
              </Button>
            )
          )}
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-6"
            disabled={loading}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
