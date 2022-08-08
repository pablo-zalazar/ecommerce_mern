import React from "react";
import "../../styles/myPublications.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";

import {
  getMyPublications,
  createPublication,
} from "../../store/slices/publication";

import Publication from "../Publication";
import Alert from "../Alert";

export default function MyPublications() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { myPublications } = useSelector((state) => state.publications);

  console.log(myPublications);

  const initialValues = {
    title: "",
    price: "",
    description: "",
    state: "",
    stock: "1",
    category: "",
    subCategory: "",
  };

  useEffect(() => {
    console.log("a");
    const func = async () => {
      const token = localStorage.getItem("token");
      Object.keys(user).length > 0 &&
        (await dispatch(getMyPublications(token, user._id)));
    };
    func();
  }, [user]);

  const required = "Required Field";

  const createSchema = Yup.object().shape({
    title: Yup.string().required(required),
    price: Yup.number()
      .typeError("must be a number")
      .min(1, "Price must be greater than 0")
      .required(required),
    description: Yup.string().required(required),
    state: Yup.string().required(required),
    stock: Yup.number()
      .typeError("must be a number")
      .min(1, "Price must be greater than 0")
      .required(required),
    category: Yup.string().required(required),
    subCategory: Yup.string(),
  });

  const onSubmit = async (values, resetForm) => {
    const token = localStorage.getItem("token");
    await dispatch(createPublication(values, token, user._id));
    resetForm();
  };

  return (
    <div className="myPublications">
      <div className="formContainer">
        <h2>Create publication</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={createSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
        >
          {(props) => (
            <Form>
              <div>
                <label htmlFor="title">Title</label>
                <Field name="title" id="title" placeholder="title" />
                <p className="error">
                  <ErrorMessage name="title" />
                </p>
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <Field name="price" id="price" placeholder="price" />
                <p className="error">
                  <ErrorMessage name="price" />
                </p>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <Field
                  name="description"
                  id="description"
                  as="textarea"
                  placeholder="description"
                />
                <p className="error">
                  <ErrorMessage name="description" />
                </p>
              </div>
              <div>
                <label htmlFor="state">State</label>
                <Field name="state" id="state" as="select">
                  <option value="">Select</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </Field>
                <p className="error">
                  <ErrorMessage name="state" />
                </p>
              </div>
              {props.values.state === "new" && (
                <div>
                  <label htmlFor="stock">Stock</label>
                  <Field name="stock" as="input" placeholder="stock" />
                  <p className="error">
                    <ErrorMessage name="stock" />
                  </p>
                </div>
              )}
              <div>
                <label htmlFor="category">Category</label>
                <Field name="category" id="category" as="select">
                  <option value="">Select</option>
                  <option value="category 1">category 1</option>
                  <option value="category 2">category 2</option>
                  <option value="category 3">category 3</option>
                  <option value="category 4">category 4</option>
                  <option value="category 5">category 5</option>
                </Field>
                <p className="error">
                  <ErrorMessage name="category" />
                </p>
              </div>
              <div>
                <label htmlFor="subCategory">subCategory</label>
                <Field name="subCategory" id="subCategory" as="select">
                  <option value="">Select</option>
                </Field>
                <p className="error">
                  <ErrorMessage name="subCategory" />
                </p>
              </div>
              <input type="submit" value="create" />
            </Form>
          )}
        </Formik>
      </div>

      <div className="cards">
        <h2>Publications</h2>
        {myPublications?.map((p) => (
          <Publication key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
