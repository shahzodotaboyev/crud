const Table = ({ invoices, deleteInvoice, editInvoice }) => {
    if (!invoices || !Array.isArray(invoices)) {
      return <p className="text-danger m-3">No invoices available.</p>;
    }
  
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Payable Amount</th>
            <th>Paid Amount</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.date}</td>
              <td>{invoice.customer}</td>
              <td>{invoice.payableAmount}</td>
              <td>{invoice.paidAmount}</td>
              <td>{invoice.due}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => editInvoice(invoice)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteInvoice(invoice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  