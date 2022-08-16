import React, { useEffect, useState } from "react";
import "../../styles/details.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  actionGetDetails,
  actionClearDetails,
  actionBuy,
} from "../../store/slices/publication";

import { actionAddToCart } from "../../store/slices/user";

import Alert from "../Alert";
import LoadCard from "../LoadCard";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [seller, setSeller] = useState("");
  const { details } = useSelector((state) => state.publications);
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.publications);

  useEffect(() => {
    dispatch(actionGetDetails(id));
    return () => dispatch(actionClearDetails());
  }, []);

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    try {
      const { msg } = await dispatch(actionBuy(token, details._id));
      Alert("success", msg);
      navigate("/");
    } catch (e) {
      Alert("error", e.msg);
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const { msg } = await dispatch(actionAddToCart(token, details._id));
      Alert("success", msg);
    } catch (e) {
      Alert("error", e.msg);
    }
  };

  return (
    <div className="details">
      {!loading ? (
        <div>
          <div className="info">
            <div className="img">
              <img src="/img/noImage.png" alt="img" />
            </div>
            <div>
              <h2>{details.title}</h2>
              <p>{details.category}</p>
              <p>{details.subCategory}</p>
              <p>In stock: {details.stock}</p>
              <h2>${details.price}</h2>
            </div>
          </div>
          <p>{details.description}</p>
          {Object.keys(user).length > 0 &&
            Object.keys(details).length > 0 &&
            user?._id !== details?.owner._id && (
              <div className="actions">
                <button className="btnPrimary" onClick={() => handleBuy()}>
                  Buy now
                </button>
                <button className="btnSecondary" onClick={() => addToCart()}>
                  Add to cart
                </button>
              </div>
            )}
        </div>
      ) : (
        <LoadCard detail={true} />
      )}
    </div>
  );
}
