import React, { useEffect, useState } from "react";
import "../../styles/details.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  actionGetDetails,
  actionClearDetails,
  actionBuy,
} from "../../store/slices/publication";
import { actionAuthenticateUser } from "../../store/slices/user";
import { actionAddToCart } from "../../store/slices/user";

import Alert from "../Alert";
import LoadCard from "../LoadCard";

export default function Details() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { details } = useSelector((state) => state.publications);
  const { user } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.publications);

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(actionGetDetails(id));
    return () => dispatch(actionClearDetails());
  }, []);

  const handleBuy = async () => {
    try {
      const { msg } = await dispatch(actionBuy(token, details._id));
      Alert("success", msg);
      navigate("/");
    } catch (e) {
      Alert("error", e.msg);
    }
  };

  const addToCart = async () => {
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
        Object.keys(details).length > 0 ? (
          <div>
            <div className="img">
              <img src={details?.image.url} alt="img" />
            </div>

            <div className="data">
              <h2>{details.title}</h2>
              <span>
                <p>
                  {details.state} | {details.quantitySold} solds
                </p>
              </span>

              <p>{details.category}</p>
              <p>{details.subCategory}</p>
              <p>In stock: {details.stock}</p>
              <h3>${details.price}</h3>
              <div className="actions">
                {Object.keys(user).length > 0 ? (
                  user._id !== details.owner._id && (
                    <div>
                      <button
                        className="btnPrimary"
                        onClick={() => handleBuy()}
                      >
                        Buy now
                      </button>
                      <button
                        className="btnSecondary"
                        onClick={() => addToCart()}
                      >
                        Add to cart
                      </button>
                    </div>
                  )
                ) : (
                  <h3>log in to buy</h3>
                )}
              </div>
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{details.description}</p>
            </div>
          </div>
        ) : (
          <p>Not found</p>
        )
      ) : (
        <LoadCard detail={true} />
      )}
    </div>
  );
}
