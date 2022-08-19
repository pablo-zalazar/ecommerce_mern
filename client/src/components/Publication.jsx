import React from "react";
import "../styles/publication.css";
import { IoTrash, IoPencil } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  actionDeletePublication,
  actionGetDetails,
} from "../store/slices/publication";
import { actionRemoveFromCart } from "../store/slices/user";

import Alert from "./Alert";

export default function Publication({ product, owner, update, cart }) {
  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { msg } = await dispatch(
            actionDeletePublication(token, product.owner, product._id)
          );
          Alert("error", msg);
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  };

  const handleRemoveCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { msg } = await dispatch(
            actionRemoveFromCart(token, product._id)
          );
          Alert("error", msg);
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  };

  return (
    <div className="card">
      <div
        className="publication"
        onClick={() => navigate(`/details/${product._id}`)}
      >
        <img src={product.image.url} alt="img" />
        <div className="data">
          <h2>{product.title}</h2>
          <h4>
            {product.category} - {product.subCategory} - {product.state}
          </h4>
          <p>stock: {product.stock}</p>
          <p>sold: {product.quantitySold}</p>
          <h3>price: ${product.price}</h3>
        </div>
      </div>
      {owner && (
        <div className="actions">
          <button onClick={() => update(product)}>
            <IoPencil />
          </button>
          <button onClick={() => handleDelete()}>
            <IoTrash />
          </button>
        </div>
      )}
      {cart && (
        <div className="actions">
          <button onClick={() => handleRemoveCart()}>
            <IoTrash />
          </button>
        </div>
      )}
    </div>
  );
}
