import React from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, ErrorMessage, Field } from "formik";

import Alert from "../Alert";
import { forgetPassword } from "../../store/slices/user";

export default function ForgetPassword() {
  const dispatch = useDispatch();

  const onSubmit = async (values, resetForm) => {
    try {
      const data = await dispatch(forgetPassword(values));
      Alert("success", data.msg);
    } catch (e) {
      Alert("error", e);
    }
  };

  const required = "Required Field";

  const createSchema = Yup.object().shape({
    email: Yup.string().email("Invalid format").required(required),
  });

  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={createSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
      >
        <Form>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" id="email" type="email" placeholder="email" />
            <ErrorMessage name="email" />
          </div>
          <input type="submit" value="Send" />
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
}