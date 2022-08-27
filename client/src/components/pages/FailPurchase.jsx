import React from "react";
import { Link } from "react-router-dom";

export default function FailPurchase() {
  return (
    <div className="contConfirmar">
      <h2>
        <span>NFT</span> Market
      </h2>
      <p>An error occurred in the purchase</p>
      <Link to="/">
        <button className="buttonOrange">Go back home</button>
      </Link>
    </div>
  );
}
