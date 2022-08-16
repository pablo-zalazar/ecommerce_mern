import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/home.css";
import { AiOutlineArrowRight } from "react-icons/ai";

import {
  actionGetAllPublications,
  actionFilterPublications,
  actionClearSearch,
} from "../../store/slices/publication";
import { actionGetcategories } from "../../store/slices/category";
import Publication from "../Publication";

export default function Home() {
  const dispatch = useDispatch();
  const { filterPublications, search } = useSelector(
    (state) => state.publications
  );
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.users);
  const [priceFilter, setPriceFIlter] = useState({ min: "", max: "" });
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState("");
  const [firstMount, setFirstMount] = useState(true);
  const [filter, setFilter] = useState({
    category: "",
    subCategory: "",
    state: "",
    price: { min: "", max: "" },
    search: "",
  });

  useEffect(() => {
    dispatch(actionGetAllPublications());
    dispatch(actionGetcategories());

    return () => dispatch(actionClearSearch());
  }, []);

  useEffect(() => {
    setPublications(filterPublications.filter((p) => p.owner !== user._id));
  }, [filterPublications, user]);

  useEffect(() => {
    setFilter({
      category: "",
      subCategory: "",
      state: "",
      price: { min: "", max: "" },
      search: "",
    });
  }, [search]);

  useEffect(() => {
    if (!firstMount) dispatch(actionFilterPublications({ ...filter, search }));
    else setFirstMount(false);
  }, [filter]);

  // useEffect(() => {
  //   async function getPublications() {
  //     await dispatch(actionGetAllPublications());
  //     await dispatch(actionGetcategories());
  //   }
  //   getPublications();
  // }, []);

  const handleFilter = (arr) => {
    if (arr[0] === "category")
      setFilter({ ...filter, category: arr[1], subCategory: "" });
    if (arr[0] === "subCategory")
      setFilter({ ...filter, category: arr[1], subCategory: arr[2] });
    if (arr[0] === "state") setFilter({ ...filter, state: arr[1] });
    if (arr[0] === "price") {
      if (!isNaN(priceFilter.min) && !isNaN(priceFilter.max)) {
        if (priceFilter.max === "" || priceFilter.min <= priceFilter.max) {
          setFilter({
            ...filter,
            price: {
              min: priceFilter.min,
              max: priceFilter.max,
            },
          });
          setPriceFIlter({ min: "", max: "" });
          setError("");
        } else if (
          priceFilter.max !== "" ||
          priceFilter.min <= priceFilter.max
        ) {
          setFilter({
            ...filter,
            price: {
              min: priceFilter.min,
              max: priceFilter.max,
            },
          });
          setPriceFIlter({ min: "", max: "" });
          setError("");
        } else {
          setError("max value must be grater than min value");
        }
      } else {
        setError("Invalid values");
      }
    }
  };

  const handleRemoveFilter = (type) => {
    if (type === "category")
      setFilter({ ...filter, category: "", subCategory: "" });
    if (type === "subCategory") setFilter({ ...filter, subCategory: "" });
    if (type === "state") setFilter({ ...filter, state: "" });
    if (type === "min")
      setFilter({ ...filter, price: { min: "", max: filter.price.max } });
    if (type === "max")
      setFilter({ ...filter, price: { min: filter.price.min, max: "" } });
    if (type === "allPrice")
      setFilter({ ...filter, price: { min: "", max: "" } });
  };

  const handleReset = () => {
    dispatch(actionClearSearch());
    setFilter({
      category: "",
      subCategory: "",
      state: "",
      price: { min: "", max: "" },
      search: "",
    });
  };

  return (
    <div className="main">
      <section className="filters">
        <h3>{publications.length} Results</h3>
        <h2>Filters</h2>
        {search && <h3>{search}</h3>}
        <div className="filtersName">
          {filter.category && (
            <p onClick={() => handleRemoveFilter("category")}>
              {filter.category} <span>x</span>
            </p>
          )}
          {filter.subCategory && (
            <p onClick={() => handleRemoveFilter("subCategory")}>
              {filter.subCategory} <span>x</span>
            </p>
          )}
          {filter.state && (
            <p onClick={() => handleRemoveFilter("state")}>
              {filter.state} <span>x</span>
            </p>
          )}
          {filter.price.min && filter.price.max ? (
            <p
              onClick={() => {
                handleRemoveFilter("allPrice");
              }}
            >
              ${filter.price.min} - ${filter.price.max} <span>x</span>
            </p>
          ) : filter.price.min ? (
            <p onClick={() => handleRemoveFilter("min")}>
              from ${filter.price.min} <span>x</span>
            </p>
          ) : (
            filter.price.max && (
              <p onClick={() => handleRemoveFilter("max")}>
                up ${filter.price.max} <span>x</span>
              </p>
            )
          )}
        </div>
        <button className="reset" onClick={() => handleReset()}>
          reset
        </button>
        <h3>Categories</h3>
        {Object.keys(categories).length > 0 &&
          categories?.map((cat) => (
            <div key={cat._id} className="categories">
              <h4
                key={cat._id}
                onClick={() => handleFilter(["category", cat.name])}
                className={filter.category === cat.name ? "active" : ""}
              >
                {cat.name}
              </h4>
              {cat?.subCategories?.map(
                (subCat, i) =>
                  cat.name !== "Other" && (
                    <p
                      key={cat._id + i}
                      onClick={() =>
                        handleFilter(["subCategory", cat.name, subCat])
                      }
                      className={
                        filter.subCategory === subCat
                          ? filter.category === cat.name
                            ? "active"
                            : ""
                          : ""
                      }
                    >
                      {subCat}
                    </p>
                  )
              )}
            </div>
          ))}

        <h3>State</h3>
        <select onChange={(e) => handleFilter(["state", e.target.value])}>
          <option value="">all</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        <h3>Price</h3>
        <div className="priceFilter">
          <input
            value={priceFilter.min}
            onChange={(e) =>
              setPriceFIlter({ ...priceFilter, min: e.target.value })
            }
            placeholder="min"
          />
          <input
            value={priceFilter.max}
            onChange={(e) =>
              setPriceFIlter({ ...priceFilter, max: e.target.value })
            }
            placeholder="max"
          />
          {priceFilter.min === "" && priceFilter.max === "" ? (
            <button disabled onClick={() => handleFilter(["price"])}>
              <AiOutlineArrowRight />
            </button>
          ) : (
            <button onClick={() => handleFilter(["price"])}>
              <AiOutlineArrowRight />
            </button>
          )}
        </div>
        <p>{error}</p>
      </section>
      <section className="cards">
        {publications.length > 0 ? (
          publications?.map((publication) => (
            <Publication key={publication._id} product={publication} />
          ))
        ) : (
          <p>No hay productos</p>
        )}
      </section>
    </div>
  );
}
