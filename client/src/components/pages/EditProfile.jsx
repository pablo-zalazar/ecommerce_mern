import React from "react";
import "../../styles/changePassword.css";
import "../../styles/forms.css";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionUserEdit } from "../../store/slices/user";

import Alert from "../Alert";

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.users);
  const token = localStorage.getItem("token");

  const onSubmit = async (values, resetForm) => {
    try {
      const msg = await dispatch(actionUserEdit(token, values));
      Alert("success", msg);
      resetForm();
      navigate("/profile");
    } catch (e) {
      Alert("error", e);
    }
  };

  const required = "Required Field";

  const createSchema = Yup.object().shape({
    name: Yup.string().min(4, "At least 6 characters").required(required),
    lastname: Yup.string().min(4, "At least 6 characters").required(required),
    user: Yup.string().min(5, "At least 6 characters").required(required),
    email: Yup.string().email("Invalid format").required(required),
    birthday: Yup.string().required(required),
  });

  return (
    <div className="changePassword">
      <h2>Update User</h2>
      <Formik
        initialValues={{
          id: user._id,
          name: user.name,
          lastname: user.lastname,
          user: user.user,
          email: user.email,
          birthday: user.birthday,
        }}
        validationSchema={createSchema}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
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
            <label htmlFor="lastname">User</label>
            <Field name="user" id="user" type="text" placeholder="user" />
            <p className="error">
              <ErrorMessage name="user" />
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
            <label htmlFor="birthday">Birthday</label>
            <Field name="birthday" id="birthday" type="Date" />
            <p className="error">
              <ErrorMessage name="birthday" />
            </p>
          </div>
          <input type="submit" value="Update" />
        </Form>
      </Formik>
    </div>
  );
}
