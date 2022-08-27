import React from "react";
import "../../styles/profile.css";
import "../../styles/modalMP.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  actionGetTransactions,
  actionClearTransactions,
  actionBuyCash,
} from "../../store/slices/user";
import TransactionCard from "../TransactionCard";
import LoadCard from "../LoadCard";
import Alert from "../Alert";
import Modal from "../Modal";

import io from "socket.io-client";
let socket;
socket = io(process.env.REACT_APP_BACKEND_URL);

function Profile() {
  const dispatch = useDispatch();
  const { transactions, user, loading } = useSelector((state) => state.users);
  const token = localStorage.getItem("token");
  const [path, setPath] = useState("");
  const [amount, setAmount] = useState();
  const [modal, setModal] = useState(false);

  // socket;
  const params = window.location.href;

  useEffect(() => {
    dispatch(actionGetTransactions(token));
    socket.emit("UpdateTransactions", params);
    socket.emit("Navigate", params);
    return () => dispatch(actionClearTransactions());
  }, []);

  useEffect(() => {
    socket.on("transactionUpdate", async () => {
      dispatch(actionGetTransactions(token));
    });
    socket.on("redireccion", (path) => {
      setPath(path);
    });
    return () => {
      socket.off("transactionUpdate");
      socket.off("redicreccion");
    };
  }, []);

  function handleButton(e) {
    e.preventDefault();
    !amount
      ? Alert("error", "You must enter the amount")
      : localStorage.setItem("value", `${amount}`);
    dispatch(actionBuyCash(token, amount));
  }

  return (
    <div className="profile">
      <section className="options">
        <h2>Options</h2>
        <div className="actions">
          <Link className="action" to="/forgetPassword">
            Edit password
          </Link>
          <Link className="action" to="#">
            Edit profile
          </Link>
          {/* <button>Change password</button>
          <button>Edit profile</button> */}
          <button className="action" onClick={() => setModal(true)}>
            Add Cash
          </button>
        </div>
      </section>
      <section className="transactions">
        <h2>Transactions</h2>
        {loading ? (
          <LoadCard />
        ) : (
          <div className="cardContainer">
            {transactions.length > 0 ? (
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
      {modal && (
        <Modal showModal={setModal}>
          <div className="modalContainer">
            {!path ? (
              <div className="payForm">
                <label htmlFor="monto">Enter the amount to deposit</label>
                <input
                  id="valorMP"
                  placeholder="Enter the amount of CL"
                  onChange={(e) => setAmount(e.target.value)}
                  className="dinner input"
                  value={amount}
                />
                <button className="buttonMP" onClick={handleButton}>
                  Send
                </button>
              </div>
            ) : (
              <div className="payLink">
                <h3>Click to pay</h3>
                <a href={path}>
                  <img className="logomp" src="/img/mp.png" />
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Profile;
