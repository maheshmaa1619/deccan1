const PDFDocument = require('pdfkit');

exports.generateClientPDF = (data, stream) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(stream);
  const { client, tasks, calls, payments } = data;

  doc.fontSize(16).text('Client Master Information Sheet', { underline: true });
  doc.moveDown();
  doc.fontSize(12).text(`Client ID: ${client.client_id}`);
  doc.text(`Name: ${client.name}`);
  doc.text(`Business: ${client.business || ''}`);
  doc.text(`Contact Person: ${client.contact_person || ''}`);
  doc.text(`Phone: ${client.phone || ''}`);
  doc.text(`Email: ${client.email || ''}`);
  doc.text(`GSTN: ${client.gstn || ''}`);
  doc.moveDown();

  doc.fontSize(14).text('Monthly Tasks');
  tasks.forEach(t=>{
    doc.fontSize(11).text(`${t.type} - Due: ${t.due_date} - Status: ${t.status}`);
  });
  doc.moveDown();

  doc.fontSize(14).text('Conversation Log');
  calls.forEach(c=>{
    doc.fontSize(11).text(`${c.created_at} [${c.mode}] ${c.summary} -> Action: ${c.action_required || ''} Deadline: ${c.deadline || ''}`);
  });
  doc.moveDown();

  doc.fontSize(14).text('Payments');
  payments.forEach(p=>{
    doc.fontSize(11).text(`${p.invoice_no} - ${p.amount} - Paid on: ${p.paid_on || 'N/A'} - Mode: ${p.mode || ''}`);
  });

  doc.end();
};
