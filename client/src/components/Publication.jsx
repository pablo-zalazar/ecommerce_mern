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
import Alert from "./Alert";

export default function Publication({ product, owner, update }) {
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

  return (
    <div className="card">
      <div
        className="publication"
        onClick={() => navigate(`/details/${product._id}`)}
      >
        <img src="/img/noImage.png" alt="img" />
        <div className="data">
          <h2>{product.title}</h2>
          <h4>
            {product.category} - {product.subCategory}
          </h4>
          <p>stock: {product.stock}</p>
          <p>sold: {product.quantitySold}</p>
          <div>
            <h3>price: ${product.price}</h3>
            {product.stock < 1 && <p className="empty">OUT OF STOCK</p>}
          </div>
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
    </div>
  );
}
