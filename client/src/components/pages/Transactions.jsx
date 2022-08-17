import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  actionGetTransactions,
  actionClearTransactions,
} from "../../store/slices/user";

function Transactions() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.users);

  console.log(transactions);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(actionGetTransactions(token));
    return () => dispatch(actionClearTransactions());
  }, []);

  return <div>Transactions</div>;
}

export default Transactions;
