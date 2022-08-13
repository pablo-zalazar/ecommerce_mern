import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/home.css";
import { AiOutlineArrowRight } from "react-icons/ai";

import {
  actionGetAllPublications,
  actionFilterPublications,
} from "../../store/slices/publication";
import { actionGetcategories } from "../../store/slices/category";
import Publication from "../Publication";

export default function Home() {
  const dispatch = useDispatch();
  const { filterPublications } = useSelector((state) => state.publications);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.users);
  const [priceFilter, setPriceFIlter] = useState({ min: "", max: "" });
  const [error, setError] = useState("");

  const [filter, setFilter] = useState({
    category: "",
    subCategory: "",
    state: "",
    price: { min: "", max: "" },
  });
  const [firstMount, setFirstMount] = useState(true);

  useEffect(() => {
    if (!firstMount) dispatch(actionFilterPublications(filter));
    else setFirstMount(false);
  }, [filter]);

  useEffect(() => {
    async function getPublications() {
      await dispatch(actionGetAllPublications());
      await dispatch(actionGetcategories());
    }
    getPublications();
  }, []);

  const handleFilter = (arr) => {
    console.log(arr);
    console.log(priceFilter);
    if (arr[0] === "category")
      setFilter({ ...filter, category: arr[1], subCategory: "" });
    if (arr[0] === "subCategory")
      setFilter({ ...filter, category: arr[1], subCategory: arr[2] });
    if (arr[0] === "state") setFilter({ ...filter, state: arr[1] });
    if (arr[0] === "price") {
      if (!isNaN(priceFilter.min) && !isNaN(priceFilter.max)) {
        console.log("b");
        if (priceFilter.min <= priceFilter.max) {
          console.log("v");
          setFilter({
            ...filter,
            price: { min: priceFilter.min, max: priceFilter.max },
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

  const handleReset = () => {
    setFilter({
      category: "",
      subCategory: "",
      state: "",
      price: { min: "", max: "" },
    });
  };

  return (
    <div className="main">
      <section className="filters">
        <h3>{filterPublications.length} Results</h3>
        <h2>Filters</h2>
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
          <button onClick={() => handleFilter(["price"])}>
            <AiOutlineArrowRight />
          </button>
        </div>
        <p>{error}</p>
      </section>
      <section className="cards">
        {filterPublications.length > 0 ? (
          filterPublications?.map(
            (publication) =>
              publication.owner !== user._id && (
                <Publication key={publication._id} product={publication} />
              )
          )
        ) : (
          <p>No hay productos</p>
        )}
      </section>
    </div>
  );
}
