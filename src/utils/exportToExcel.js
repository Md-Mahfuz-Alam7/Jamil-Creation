import * as XLSX from 'xlsx';

export const exportInvoicesToExcel = (invoices) => {
  // Transform invoices data for Excel
  const data = invoices.map(invoice => ({
    'Invoice Number': invoice.invoiceNumber,
    'Date': new Date(invoice.invoiceDate).toLocaleDateString(),
    'Due Date': new Date(invoice.dueDate).toLocaleDateString(),
    'Client Name': invoice.billTo.clientName,
    'Company': invoice.billTo.companyName,
    'Email': invoice.billTo.email,
    'Phone': invoice.billTo.phone,
    'Subtotal': invoice.summary.subtotal,
    'Tax Total': invoice.summary.taxTotal,
    'Discount': invoice.summary.discount,
    'Shipping': invoice.summary.shipping,
    'Grand Total': invoice.summary.grandTotal,
    'Received Amount': invoice.summary.receivedAmount || 0,
    'Due Amount': invoice.summary.grandTotal - (invoice.summary.receivedAmount || 0),
    'Status': invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1),
    'Items Count': invoice.items.length,
    'Notes': invoice.notes || ''
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Download file
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoices_${new Date().toISOString().split('T')[0]}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
};
