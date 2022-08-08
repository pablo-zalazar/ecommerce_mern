import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link, useParams } from "react-router-dom";

import Alert from "../Alert";
import { checkToken, newPassword } from "../../store/slices/user";

export default function NewPassword() {
  const dispatch = useDispatch();

  const params = useParams();
  const { token } = params;

  const [validToken, setValidToken] = useState(false);
  const [changedPassword, setChangedPassword] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const data = await dispatch(checkToken(token));
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
        newPassword({ token, password: { password: values.password } })
      );
      console.log(data);
      Alert("success", data.msg);
      setChangedPassword(true);
      resetForm();
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
    <div>
      {validToken ? (
        !changedPassword ? (
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
                <ErrorMessage name="password" />
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat password"
                />
                <ErrorMessage name="confirmPassword" />
              </div>
              <input type="submit" value="Change" />
            </Form>
          </Formik>
        ) : (
          <Link to="/">Return</Link>
        )
      ) : (
        <div>Token invalido</div>
      )}
      <ToastContainer />
    </div>
  );
}
