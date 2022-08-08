import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import ConfirmUser from "./components/pages/ConfirmUser";
import ForgetPassword from "./components/pages/ForgetPassword";
import NewPassword from "./components/pages/NewPassword";
import VerifyUser from "./components/VerifyUser";
import Layout from "./components/Layout";
import MyPublications from "./components/pages/MyPublications";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/forgetPassword/:token" element={<NewPassword />} />
          <Route path="/confirmUser/:token" element={<ConfirmUser />} />

          <Route path="/myPublications" element={<VerifyUser />}>
            <Route index element={<MyPublications />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
