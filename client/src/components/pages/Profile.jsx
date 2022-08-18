import React from "react";
import "../../styles/profile.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  actionGetTransactions,
  actionClearTransactions,
} from "../../store/slices/user";
import TransactionCard from "../TransactionCard";
import LoadCard from "../LoadCard";

function Profile() {
  const dispatch = useDispatch();
  const { transactions, user, loading } = useSelector((state) => state.users);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(actionGetTransactions(token));
    return () => dispatch(actionClearTransactions());
  }, []);

  return (
    <div className="profile">
      <section className="options">
        <h2>Options</h2>
        <div className="actions">
          <button>Change password</button>
          <button>Add Credit</button>
          <button>Edit profile</button>
        </div>
      </section>
      <section className="transactions">
        <h2>Transactions</h2>
        {loading ? (
          <LoadCard />
        ) : (
          <div className="cardContainer">
            {transactions.length >= 0 ? (
              <>
                {transactions.map((t) => (
                  <TransactionCard
                    key={t.id}
                    product={t}
                    type={t.buyer === user.user ? "buy" : "sell"}
                  />
                ))}
              </>
            ) : (
              <h2>Empty</h2>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Profile;
