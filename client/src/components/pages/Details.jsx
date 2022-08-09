import React, { useEffect, useState } from "react";
import "../../styles/details.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  actionGetDetails,
  actionClearDetails,
} from "../../store/slices/publication";

export default function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [seller, setSeller] = useState("");
  const { details } = useSelector((state) => state.publications);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(actionGetDetails(id));
    return () => dispatch(actionClearDetails());
  }, []);

  return (
    <div className="details">
      <div>
        <div className="info">
          <img src="/img/noImage.png" alt="img" />
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
          user?._id !== details?.owner._id && <button>Buy now</button>}
      </div>
    </div>
  );
}
