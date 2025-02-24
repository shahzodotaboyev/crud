import { useEffect, useState } from "react";
import Table from "./Table";
import { getData, deleteData, postData, putData } from "./api";
import Form from "./Form";

function App() {
  const [invoices, setInvoices] = useState([]);

  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [initialForm, setForm] = useState({
    id: "",
    date: "",
    customer: "",
    payableAmount: "",
    paidAmount: "",
    due: ""
  });

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = async () => {
    let res = await getData();
    setInvoices(res.data);
  };

  const deleteInvoice = async (id) => {
    await deleteData(id);
    getInvoices();
  };

  const addInvoice = async (invoice) => {
    let data = {
      id: invoice.id,
      date: invoice.date,
      customer: invoice.customer,
      payableAmount: invoice.payableAmount,
      paidAmount: invoice.paidAmount,
      due: invoice.due
    };

    if (edit) {
      await putData(invoice.id, data);
      setEdit(false);
    } else {
      await postData(data);
    }
    getInvoices();
    setOpenForm(false);
  };

  const editInvoice = (data) => {
    setForm(data);
    setEdit(true);
    setOpenForm(true);
  };

  const showForm = () => {
    setOpenForm(true);
    setEdit(false);
    setForm({
      id: "",
      date: "",
      customer: "",
      payableAmount: "",
      paidAmount: "",
      due: ""
    });
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.toLowerCase().includes(search.toLowerCase()) ||
    invoice.id.toString().toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-primary">Invoice Management</h2>
      <button className="btn btn-primary mb-3" onClick={showForm}>
        Add Invoice
      </button>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search invoices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table invoices={filteredInvoices} deleteInvoice={deleteInvoice} editInvoice={editInvoice} />

      {openForm && <Form closeForm={closeForm} data={initialForm} add={addInvoice} />}
    </div>
  );
}

export default App;
