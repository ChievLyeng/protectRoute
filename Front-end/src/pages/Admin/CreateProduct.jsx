import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import { Select, Card } from "antd";
import "../../Style/Product.css";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // create Product function
  const handleCreate = async (e) => {
    e.preventDefault(); // Corrected typo

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token || auth.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/product/create-product",
        productData,
        config // Added the config
      );

      if (data.success) {
        alert("Product created successfully");
        navigate("/policy");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token || auth.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8000/api/category/get-all-categories",
        config
      );

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProduct = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token || auth.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8000/api/product/get-all-products",
        config
      );

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProduct();
    getAllCategories();
  }, []);

  return (
    <Layout>
      <form className="wrapper-whole">
        <h1>Create Product</h1>
        <div className="select-container">
          <Select
            className="custom-select"
            bordered
            placeholder="Select a category"
            size="large"
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="photo-upload-container">
          <label className="photo-upload-label">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="product-photo-container">
          {photo && (
            <div className="product-photo-wrapper">
              <img
                src={URL.createObjectURL(photo)}
                alt="product-photo"
                className="product-photo"
              />
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={name}
            placeholder="write a name"
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <textarea
            type="text"
            value={description}
            placeholder="Write a description"
            className="form-control form-textarea"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="number"
            value={price}
            placeholder="Write a price"
            className="form-control form-input"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="number"
            value={quantity}
            placeholder="Write a quantity"
            className="form-control form-input"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="input-container">
          <Select
            bordered
            placeholder="Select Shipping"
            size="large"
            showSearch
            onChange={(value) => {
              setShipping(value);
            }}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        <button onClick={handleCreate}>CREATE</button>
      </form>
    </Layout>
  );
};

export default CreateProduct;
