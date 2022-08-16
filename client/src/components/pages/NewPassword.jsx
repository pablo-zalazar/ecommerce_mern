import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "../../styles/changePassword.css";
import "../../styles/forms.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";

import Alert from "../Alert";
import { actionCheckToken, actionNewPassword } from "../../store/slices/user";

export default function NewPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { token } = params;
  const { loading } = useSelector((state) => state.users);
  const [validToken, setValidToken] = useState(false);
  const [changedPassword, setChangedPassword] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await dispatch(actionCheckToken(token));
        setValidToken(true);
      } catch (e) {
        setValidToken(false);
      }
    };
    check();
  }, [dispatch]);

  const onSubmit = async (values, resetForm) => {
    try {
      const data = await dispatch(
        actionNewPassword({ token, password: { password: values.password } })
      );
      console.log(data);
      Alert("success", data.msg);
      setChangedPassword(true);
      resetForm();
      navigate("/");
    } catch (e) {
      Alert("error", e.response.data.msg);
    }
  };

  const required = "Required Field";

  const createSchema = Yup.object().shape({
    password: Yup.string().min(6, "At least 6 characters").required(required),
    confirmPassword: Yup.string()
      .min(6, "At least 6 characters")
      .required(required)
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <div className="changePassword">
      {loading ? (
        <h1>CARGANDO</h1>
      ) : validToken ? (
        !changedPassword ? (
          <>
            <h2>Forget password</h2>
            <Formik
              initialValues={{ password: "", confirmPassword: "" }}
              validationSchema={createSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
            >
              <Form>
                <div>
                  <label htmlFor="password">Enter new password</label>
                  <Field
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <p className="error">
                    <ErrorMessage name="password" />
                  </p>
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <Field
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                  />
                  <p className="error">
                    <ErrorMessage name="confirmPassword" />
                  </p>
                </div>
                <input type="submit" value="Change" />
              </Form>
            </Formik>
          </>
        ) : (
          <Link to="/">Return</Link>
        )
      ) : (
        <h2>Token invalido</h2>
      )}

      <ToastContainer />
    </div>
  );
}
