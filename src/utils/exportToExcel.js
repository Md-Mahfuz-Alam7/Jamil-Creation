import ExcelJS from 'exceljs';

export const exportInvoicesToExcel = async (invoices) => {
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

  // Create workbook and worksheet using exceljs
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Invoices');

  // Add header row
  worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key }));

  // Add data rows
  data.forEach(row => {
    worksheet.addRow(row);
  });

  // Generate Excel file as Blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Download file
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `invoices_${new Date().toISOString().split('T')[0]}.xlsx`;
  link.click();
  window.URL.revokeObjectURL(url);
};
