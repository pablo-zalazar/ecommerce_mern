import React, { useState } from "react";
import "../styles/publication.css";
import { IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";

export default function Publication({ product, type }) {
  const transactionDate = product.date.toLocaleString().split("T")[0];

  const [showMore, setShowMore] = useState(false);

  const limitString = (str) => {
    if (str.length > 200)
      return { string: str.slice(0, 197).concat("..."), addButton: true };
    else return { string: str, addButton: false };
  };
  return (
    <div className="card">
      <div className="publication">
        <img src="/img/noImage.png" alt="img" />
        <div className="data">
          {type !== "buy" ? (
            <h3>Sold to {product.buyer}</h3>
          ) : (
            <h3>bought from {product.seller}</h3>
          )}
          <h3>{transactionDate}</h3>
          <h2>{product.publication.title}</h2>
          <h4>
            {product.publication.category} - {product.publication.subCategory} -{" "}
            {product.publication.state}
          </h4>

          {!showMore ? (
            <>
              <p>{limitString(product.publication.description).string}</p>
              {limitString(product.publication.description).addButton && (
                <button
                  className="view"
                  type="button"
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  open
                </button>
              )}
            </>
          ) : (
            <>
              <p>{product.publication.description}</p>
              <button
                className="view"
                type="button"
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                close
              </button>
            </>
          )}
          {/* <p>{product.publication.description}</p> */}

          <h3>price: ${product.publication.price}</h3>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => {}}>
          <IoTrash />
        </button>
      </div>
    </div>
  );
}
