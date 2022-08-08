import React from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch } from "react-redux";

import { actionUserRegister } from "../store/slices/user";

import Alert from "./Alert";

export default function RegisterModal({ showModal }) {
  const dispatch = useDispatch();

  const onSubmit = async (values, resetForm) => {
    try {
      const data = await dispatch(actionUserRegister(values));
      Alert("success", data.msg);
      resetForm();
      showModal(false);
    } catch (e) {
      Alert("error", e);
    }
  };

  const required = "Required Field";

  const createSchema = Yup.object().shape({
    name: Yup.string().required(required),
    lastname: Yup.string().required(required),
    email: Yup.string().email("Invalid format").required(required),
    password: Yup.string().min(6, "At least 6 characters").required(required),
    birthday: Yup.string().required(required),
  });

  return (
    <div className="formContainer">
      <h2>Create User</h2>
      <Formik
        initialValues={{
          name: "",
          lastname: "",
          password: "",
          email: "",
          birthday: "",
        }}
        validationSchema={createSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
      >
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" id="name" type="text" placeholder="name" />
            <p className="error">
              <ErrorMessage name="name" />
            </p>
          </div>
          <div>
            <label htmlFor="lastname">Lastname</label>
            <Field
              name="lastname"
              id="lastname"
              type="text"
              placeholder="lastname"
            />
            <p className="error">
              <ErrorMessage name="lastname" />
            </p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" id="email" type="email" placeholder="email" />
            <p className="error">
              <ErrorMessage name="email" />
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
              <ErrorMessage name="password" />
            </p>
          </div>
          <div>
            <label htmlFor="birthday">Birthday</label>
            <Field name="birthday" id="birthday" type="Date" />
            <p className="error">
              <ErrorMessage name="birthday" />
            </p>
          </div>
          <input type="submit" value="create" />
        </Form>
      </Formik>
    </div>
  );
}
