import React from "react";
import "../styles/publication.css";
import { IoTrash, IoPencil } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { actionDeletePublication } from "../store/slices/publication";
import Alert from "./Alert";

export default function Publication({ product, owner, update }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleUpdate = () => {};

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
    <div className="publication">
      <img src="/img/noImage.png" alt="img" />
      <div className="data">
        <h2>{product.title}</h2>
        <p>stock: {product.stock}</p>
        <p>sold: {product.quantitySold}</p>
        <h3>price: ${product.price}</h3>
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
