import React from "react";
import { useSelector } from "react-redux";
import "../styles/pagination.css";

export default function Pagination({ perPage, amount, pagination }) {
  const pages = Math.ceil(amount / perPage);
  const pageNumbers = [];

  const { currentPage } = useSelector((state) => state.publications);

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        <p
          className={currentPage - 1 > 0 ? "showButton" : "hideButton"}
          onClick={() => pagination(currentPage - 1)}
        >
          previous
        </p>

        {pageNumbers &&
          pageNumbers.map((number, i) =>
            number === currentPage ? (
              <button
                key={i}
                className="current"
                onClick={() => pagination(number)}
              >
                {number}
              </button>
            ) : (
              <button key={i} onClick={() => pagination(number)}>
                {number}
              </button>
            )
          )}

        <p
          className={pages > currentPage ? "showButton" : "hideButton"}
          onClick={() => pagination(currentPage + 1)}
        >
          next
        </p>
      </div>
    </nav>
  );
}
