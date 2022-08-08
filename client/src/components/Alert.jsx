import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Alert(type, text) {
  return type === "success"
    ? toast.success(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    : toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
}
