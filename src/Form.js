import React, { useState, useEffect } from 'react';

const Form = (props) => {
  const [products, setProducts] = useState(props.data);

  useEffect(() => {
    setProducts(props.data);  
  }, [props.data]);

  let changeFormData = (event) => {
    const { name, value } = event.target;
    setProducts({ ...products, [name]: value });
  };

  return (
    <div className="form-overlay">
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            className="form-control mt-2"
            value={products.name}
            type="text"
            name="name"
            onChange={changeFormData}
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            className="form-control mt-2"
            type="number"
            value={products.price}
            onChange={changeFormData}
            name="price"
            placeholder="Enter Price"
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            className="form-control mt-2"
            value={products.category || ""}
            onChange={changeFormData}
            name="category"
          >
            <option value="">Select Category</option>
            <option value="mobiles">Mobiles</option>
            <option value="laptop">Laptop</option>
            <option value="gaming">Gaming</option>
            <option value="wearable">Wearable</option>
            <option value="audio">Audio</option>
          </select>
        </div>
        <button
          className="btn btn-primary float-end"
          onClick={(e) => {
            e.preventDefault();
            props.add(products);
          }}
        >
          Send
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
