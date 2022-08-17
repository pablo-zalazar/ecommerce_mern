import React from "react";
import "../../styles/myPublications.css";
import "../../styles/forms.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  actionGetMyPublications,
  actionCreatePublication,
  actionUpdatePublication,
} from "../../store/slices/publication";

import { actionGetcategories } from "../../store/slices/category";

import Publication from "../Publication";
import Alert from "../Alert";
import LoadCard from "../LoadCard";

export default function MyPublications() {
  const dispatch = useDispatch();
  const [create, setCreate] = useState(true);
  const [publicationUpdate, setPublicationUpdate] = useState({});
  const { user } = useSelector((state) => state.users);
  const { myPublications } = useSelector((state) => state.publications);
  const { categories } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.publications);
  const [category, setCategory] = useState("");

  let initialValues =
    Object.keys(publicationUpdate).length < 1
      ? {
          title: "",
          price: "",
          description: "",
          state: "",
          stock: "1",
          category: "",
          subCategory: "",
        }
      : {
          title: publicationUpdate.title,
          price: publicationUpdate.price.toString(),
          description: publicationUpdate.description,
          state: publicationUpdate.state,
          stock: publicationUpdate.stock.toString(),
          category: publicationUpdate.category,
          subCategory: publicationUpdate.subCategory,
        };

  useEffect(() => {
    dispatch(actionGetcategories());
  }, []);

  useEffect(() => {
    const func = async () => {
      const token = localStorage.getItem("token");
      Object.keys(user).length > 0 &&
        (await dispatch(actionGetMyPublications(token, user._id)));
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
    subCategory: Yup.string().required(required),
  });

  const update = async (publication) => {
    setPublicationUpdate(publication);
    setCreate(false);
  };

  const onSubmit = async (values, resetForm) => {
    const token = localStorage.getItem("token");
    if (create) {
      try {
        const { msg } = await dispatch(
          actionCreatePublication(values, token, user._id)
        );
        resetForm();
        Alert("success", msg);
        setCreate(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const { msg } = await dispatch(
          actionUpdatePublication(
            {
              ...publicationUpdate,
              title: values.title,
              price: values.price,
              description: values.description,
              state: values.state,
              stock: values.stock,
              category: values.category,
              subCategory: values.subCategory,
            },
            token,
            user._id
          )
        );
        setPublicationUpdate({});
        resetForm();
        Alert("success", msg);
        setCreate(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="myPublications">
      <section className="formContainer">
        <h2>{create ? "Create publication" : "Update publication"}</h2>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
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
                  {Object.keys(categories).length > 0 &&
                    categories?.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                </Field>
                <p className="error">
                  <ErrorMessage name="category" />
                </p>
              </div>

              {category !== props.values.category
                ? (props.values.subCategory = "")
                : null}
              {setCategory(props.values.category)}

              {props.values.category !== "" && (
                <div>
                  <label htmlFor="subCategory">subCategory</label>
                  <Field name="subCategory" id="subCategory" as="select">
                    <option value="">Select</option>
                    {categories?.map(
                      (cat) =>
                        cat.name === props.values.category &&
                        cat.subCategories.map((subCat) => (
                          <option key={subCat}>{subCat}</option>
                        ))
                    )}
                  </Field>

                  <p className="error">
                    <ErrorMessage name="subCategory" />
                  </p>
                </div>
              )}
              <input type="submit" value={create ? "create" : "update"} />
            </Form>
          )}
        </Formik>
      </section>

      <div className="cards">
        <h2>Publications</h2>
        {myPublications.length <= 0 ? (
          <h2>No publications</h2>
        ) : (
          <div className="cardsContainer">
            {loading ? (
              <div>
                <LoadCard />
              </div>
            ) : (
              <div>
                {myPublications?.map((p) => (
                  <Publication
                    key={p._id}
                    product={p}
                    owner={true}
                    update={update}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
