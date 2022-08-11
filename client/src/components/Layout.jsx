import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/layout.css";
import Header from "./Header";
import Footer from "./Footer";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Modal from "./Modal";
import UserSettings from "./UserSettings";

export default function Layout({ children }) {
  const [modalRegister, setModalRegister] = useState(false);
  const [modalLogin, setModalLogin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="layout">
      <Header
        setModalRegister={setModalRegister}
        setModalLogin={setModalLogin}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      <div className="content">
        <UserSettings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <div className="children">{children}</div>
      </div>
      <Footer />

      {modalRegister && (
        <Modal showModal={setModalRegister}>
          <RegisterForm showModal={setModalRegister} />
        </Modal>
      )}
      {modalLogin && (
        <Modal showModal={setModalLogin}>
          <LoginForm showModal={setModalLogin} />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
}
