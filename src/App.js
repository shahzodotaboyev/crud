import { useEffect, useState } from "react";
import Table from "./Table";
import { getData, deleteData, postData, putData } from "./api";
import Form from "./Form";

function App() {
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState("");
  const [initialForm, setForm] = useState({
    name: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let res = await getData();
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await deleteData(id);
    getProducts();
  };

  const addProduct = async (product) => {
    let data = {
      name: product.name,
      price: product.price,
      category: product.category
    };

    if (edit) {
      await putData(product.id, data);
      setEdit(false);
    } else {
      await postData(data);
    }
    getProducts();
    setOpenForm(false);
  };

  const editProduct = (data) => {
    setForm(data);
    setEdit(true);
    setOpenForm(true);
  };

  const showForm = () => {
    setOpenForm(true);
    setEdit(false);
    setForm({ name: "", price: "", category: "" });
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="wrapper m-5 w-50">
      <h2 className="text-primary">CRUD Operations</h2>
      <button className="btn btn-primary mb-3" onClick={showForm}>
        Add Product
      </button>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table products={filteredProducts} delete={deleteProduct} edit={editProduct} />
      {openForm && <Form closeForm={closeForm} data={initialForm} add={addProduct} />}
    </div>
  );
}

export default App;
