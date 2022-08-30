import React from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actionUserLogin } from "../store/slices/user";
import Alert from "./Alert";

export default function LoginModal({ showModal }) {
  const dispatch = useDispatch();

  const onSubmit = async (values, resetForm) => {
    try {
      const data = await dispatch(actionUserLogin(values));
      localStorage.setItem("token", data.token);
      resetForm();
      showModal(false);
    } catch (e) {
      Alert("error", e);
    }
  };

  const required = "Required Field";

  const createSchema = Yup.object().shape({
    email: Yup.string().email("Invalid format").required(required),
    password: Yup.string().min(6, "At least 6 characters").required(required),
  });

  return (
    <div className="formContainer">
      <h2>Log in</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={createSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
      >
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" id="email" type="email" placeholder="email" />
            <p className="error">
              <ErrorMessage name="email" className="error" />
            </p>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="password"
            />
            <p className="error">
              <ErrorMessage name="password" className="error" />
            </p>
          </div>
          <div className="actions">
            <input type="submit" value="Log in" />
            <Link to="/forgetPassword" onClick={() => showModal(false)}>
              Forget password?
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
