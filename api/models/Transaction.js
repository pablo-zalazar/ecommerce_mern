import mongoose from "mongoose";

const TransactionSchema = mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication",
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
