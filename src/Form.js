import React, { useState, useEffect } from 'react';

const Form = (props) => {
  const [invoice, setInvoice] = useState(props.data);

  useEffect(() => {
    setInvoice(props.data);  
  }, [props.data]);

  let changeFormData = (event) => {
    const { name, value } = event.target;
    setInvoice({ ...invoice, [name]: value });
  };

  return (
    <div className="form-overlay">
      <form>
        <div className="form-group">
          <label>Invoice ID:</label>
          <input
            className="form-control mt-2"
            value={invoice.id}
            type="text"
            name="id"
            onChange={changeFormData}
            placeholder="Enter Invoice ID"
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            className="form-control mt-2"
            type="date"
            value={invoice.date}
            onChange={changeFormData}
            name="date"
          />
        </div>
        <div className="form-group">
          <label>Customer:</label>
          <input
            className="form-control mt-2"
            type="text"
            value={invoice.customer}
            onChange={changeFormData}
            name="customer"
            placeholder="Enter Customer Name"
          />
        </div>
        <div className="form-group">
          <label>Payable Amount:</label>
          <input
            className="form-control mt-2"
            type="number"
            value={invoice.payableAmount}
            onChange={changeFormData}
            name="payableAmount"
            placeholder="Enter Payable Amount"
          />
        </div>
        <div className="form-group">
          <label>Paid Amount:</label>
          <input
            className="form-control mt-2"
            type="number"
            value={invoice.paidAmount}
            onChange={changeFormData}
            name="paidAmount"
            placeholder="Enter Paid Amount"
          />
        </div>
        <div className="form-group">
          <label>Due:</label>
          <input
            className="form-control mt-2"
            type="number"
            value={invoice.due}
            onChange={changeFormData}
            name="due"
            placeholder="Enter Due Amount"
          />
        </div>
        <button
          className="btn btn-primary float-end"
          onClick={(e) => {
            e.preventDefault();
            props.add(invoice);
          }}
        >
          Save
        </button>
        <button
          className="btn btn-danger float-end"
          onClick={(e) => {
            e.preventDefault();
            props.closeForm();
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Form;
