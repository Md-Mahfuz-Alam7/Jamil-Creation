import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Textarea from '../../components/ui/Textarea';
import Dropdown from '../../components/ui/Dropdown';
import InvoicePreview from '../../components/invoice/InvoicePreview';

const CreateNewInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    billFrom: {
      companyName: '',
      address: '',
      email: '',
      phone: ''
    },
    billTo: {
      clientName: '',
      companyName: '',
      address: '',
      email: '',
      phone: ''
    },
    items: [],
    notes: '',
    paymentMethod: ''
  });

  const [summary, setSummary] = useState({
    subtotal: 0.00,
    discount: 0.00,
    taxTotal: 0.00,
    shipping: 0.00,
    receivedAmount: 0.00,
    grandTotal: 0.00
  });

  const handleInputChange = (section, field, value) => {
    if (section) {
      setInvoiceData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setInvoiceData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
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

    setInvoiceData(prev => ({
      ...prev,
      items: updatedItems
    }));

    // Recalculate summary
    calculateSummary(updatedItems);
  };

  const calculateSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxTotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice * item.taxPercent / 100), 0);
    const grandTotal = subtotal + taxTotal + summary.shipping - summary.discount;

    setSummary(prev => ({
      ...prev,
      subtotal,
      taxTotal,
      grandTotal
    }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
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
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData(prev => ({
      ...prev,
      items: updatedItems
    }));
    calculateSummary(updatedItems);
  };

  const handleSave = () => {
    console.log('Saving invoice...', invoiceData);
    alert('Invoice saved successfully!');
  };

  const handlePreview = () => {
    console.log('Previewing invoice...', invoiceData);
    alert('Opening invoice preview...');
  };

  const handleSendInvoice = () => {
    console.log('Sending invoice...', invoiceData);
    alert('Invoice sent successfully!');
  };

  const paymentMethodOptions = [
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'check', label: 'Check' },
    { value: 'cash', label: 'Cash' }
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="flex h-[calc(100vh-65px)]">
        {/* Form Section */}
        <div className="w-full overflow-y-auto px-8 py-9">
          <h1 className="text-[32px] font-bold leading-[39px] text-[#0c141c] font-inter mb-8">
            Create New Invoice
          </h1>

          {/* Invoice Details Section */}
          <section className="mb-8 w-full">
            <h2 className="text-[18px] font-bold leading-[22px] text-[#0c141c] font-inter mb-6">
              Invoice Details
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <InputField
                label="Invoice Number"
                value={invoiceData.invoiceNumber}
                onChange={(e) => handleInputChange(null, 'invoiceNumber', e.target.value)}
                placeholder="Enter invoice number"
              />
              <InputField
                label="Invoice Date"
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => handleInputChange(null, 'invoiceDate', e.target.value)}
              />
            </div>

            <InputField
              label="Due Date"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => handleInputChange(null, 'dueDate', e.target.value)}
              className="w-[448px]"
            />
          </section>


          {/* Bill To Section */}
          <section className="mb-8 w-full">
            <h2 className="text-[18px] font-bold leading-[22px] text-[#0c141c] font-inter mb-6">
              Bill To
            </h2>

            <div className="space-y-6">
              <InputField
                label="Client Name"
                value={invoiceData.billTo.clientName}
                onChange={(e) => handleInputChange('billTo', 'clientName', e.target.value)}
                placeholder="Enter client name"
                className="w-[448]"
              />

              <InputField
                label="Company Name"
                value={invoiceData.billTo.companyName}
                onChange={(e) => handleInputChange('billTo', 'companyName', e.target.value)}
                placeholder="Enter company name"
                className="w-[448]"
              />

              <Textarea
                label="Address"
                value={invoiceData.billTo.address}
                onChange={(e) => handleInputChange('billTo', 'address', e.target.value)}
                placeholder="Enter client address"
                rows={6}
                className="w-[448] h-[144px]"
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Email"
                  type="email"
                  value={invoiceData.billTo.email}
                  onChange={(e) => handleInputChange('billTo', 'email', e.target.value)}
                  placeholder="Enter email address"
                />
                <InputField
                  label="Phone"
                  type="tel"
                  value={invoiceData.billTo.phone}
                  onChange={(e) => handleInputChange('billTo', 'phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </section>

          {/* Itemized Table Section */}
          <section className="mb-8">
            <h2 className="text-[18px] font-bold leading-[22px] text-[#0c141c] font-inter mb-6">
              Itemized Table
            </h2>

            <div className="bg-[#f7f9fc] border border-[#cedbe8] rounded-lg overflow-hidden w-full">
              {/* Table Header */}
              <div className="bg-[#f7f9fc] border-b border-[#e5e8ea] p-4 ">
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-[14px] font-medium leading-[17px] text-[#0c141c] font-inter">
                    Description
                  </div>
                  <div className="text-[14px] font-medium leading-[17px] text-[#0c141c] font-inter">
                    Quantity
                  </div>
                  <div className="text-[14px] font-medium leading-[17px] text-[#0c141c] font-inter">
                    Unit Price
                  </div>
                  <div className="text-[14px] font-medium leading-[17px] text-[#0c141c] font-inter">
                    Tax %
                  </div>
                  <div className="text-[14px] font-medium leading-[17px] text-[#0c141c] font-inter">
                    Line Total
                  </div>
                </div>
              </div>

              {/* Table Rows */}
              {invoiceData.items.map((item, index) => (
                <div key={index} className="border-b border-[#e5e8ea] p-4">
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="text-[14px] font-normal leading-[17px] text-[#49729b] font-inter bg-transparent border-none outline-none"
                      placeholder="Enter description"
                    />
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      className="text-[14px] font-normal leading-[17px] text-[#49729b] font-inter bg-transparent border-none outline-none"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="text-[14px] font-normal leading-[17px] text-[#49729b] font-inter bg-transparent border-none outline-none"
                    />
                    <input
                      type="number"
                      value={item.taxPercent}
                      onChange={(e) => handleItemChange(index, 'taxPercent', parseInt(e.target.value) || 0)}
                      className="text-[14px] font-normal leading-[17px] text-[#49729b] font-inter bg-transparent border-none outline-none"
                    />
                    <div className="flex items-center justify-between">                    <span className="text-[14px] font-normal leading-[17px] text-[#49729b] font-inter">
                      ৳{item.lineTotal.toFixed(2)}
                    </span>
                      <button
                        onClick={() => removeItem(index)}
                        className="ml-2 p-1 hover:bg-red-100 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add/Remove Item Buttons */}
            <div className="flex gap-4 mt-4 w-full">
              <Button
                variant="primary"
                onClick={addItem}
                className="w-40 h-10"
              >
                Add Item
              </Button>


            </div>
          </section>

          {/* Summary Section */}
          <section className="mb-8 w-full">
            <h2 className="text-[18px] font-bold leading-[22px] text-[#0c141c] font-inter mb-6">
              Summary
            </h2>

            <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-[#cedbe8]">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-[14px] font-medium text-[#49729b] font-inter">
                  Subtotal
                </span>
                <span className="text-[14px] font-medium text-[#0c141c] font-inter">
                  ৳{summary.subtotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] font-medium text-[#49729b] font-inter">
                  Discount
                </span>
                <div className="flex items-center">
                  <span className="mr-2 text-[#49729b]">৳</span>
                  <input
                    type="number"
                    value={summary.discount}
                    onChange={(e) => setSummary(prev => ({...prev, discount: parseFloat(e.target.value) || 0, grandTotal: prev.subtotal + prev.taxTotal + prev.shipping - (parseFloat(e.target.value) || 0)}))}
                    className="w-24 px-3 py-2 text-right text-[14px] bg-white border border-[#cedbe8] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] font-medium text-[#49729b] font-inter">
                  Tax Total
                </span>
                <div className="flex items-center">
                  <span className="mr-2 text-[#49729b]">৳</span>
                  <input
                    type="number"
                    value={summary.taxTotal}
                    onChange={(e) => setSummary(prev => ({...prev, taxTotal: parseFloat(e.target.value) || 0, grandTotal: prev.subtotal + (parseFloat(e.target.value) || 0) + prev.shipping - prev.discount}))}
                    className="w-24 px-3 py-2 text-right text-[14px] bg-white border border-[#cedbe8] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] font-medium text-[#49729b] font-inter">
                  Shipping
                </span>
                <div className="flex items-center">
                  <span className="mr-2 text-[#49729b]">৳</span>
                  <input
                    type="number"
                    value={summary.shipping}
                    onChange={(e) => setSummary(prev => ({...prev, shipping: parseFloat(e.target.value) || 0, grandTotal: prev.subtotal + prev.taxTotal + (parseFloat(e.target.value) || 0) - prev.discount}))}
                    className="w-24 px-3 py-2 text-right text-[14px] bg-white border border-[#cedbe8] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] font-medium text-[#49729b] font-inter">
                  Received Amount
                </span>
                <div className="flex items-center">
                  <span className="mr-2 text-[#49729b]">৳</span>
                  <input
                    type="number"
                    value={summary.receivedAmount || 0}
                    onChange={(e) => setSummary(prev => ({...prev, receivedAmount: parseFloat(e.target.value) || 0}))}
                    className="w-24 px-3 py-2 text-right text-[14px] bg-white border border-[#cedbe8] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-[16px] font-bold text-[#0c141c] font-inter">
                  Grand Total
                </span>
                <span className="text-[16px] font-bold text-[#0c141c] font-inter">
                  ৳{summary.grandTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 text-red-500">
                <span className="text-[14px] font-medium font-inter">
                  Remaining Amount
                </span>
                <span className="text-[14px] font-medium font-inter">
                  ৳{(summary.grandTotal - (summary.receivedAmount || 0)).toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section className="mb-8 w-full">
            <Textarea
              label="Notes"
              value={invoiceData.notes}
              onChange={(e) => handleInputChange(null, 'notes', e.target.value)}
              placeholder="Add any additional notes..."
              rows={6}
              className="w-[448px] h-[144px]"
            />
          </section>

          {/* Payment Method Section */}
          <section className="mb-8 w-full">
            <Dropdown
              label="Payment Method"
              value={invoiceData.paymentMethod}
              onChange={(e) => handleInputChange(null, 'paymentMethod', e.target.value)}
              options={paymentMethodOptions}
              placeholder="Select payment method"
              className="w-[448px]"
            />
          </section>

          {/* Action Buttons */}
          <div className="flex justify-start gap-4">
            <Button
              variant="secondary"
              onClick={handleSave}
              className="w-[84px] h-12"
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={handlePreview}
              className="w-[103px] h-12"
            >
              Preview
            </Button>
            <Button
              variant="primary"
              onClick={handleSendInvoice}
              className="w-[141px] h-12"
            >
              Save Invoice
            </Button>


          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full bg-white p-8 pb-32 overflow-y-auto border-l">
          <InvoicePreview invoiceData={invoiceData} summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewInvoice;