import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/home.css";
import { AiOutlineArrowRight } from "react-icons/ai";

import {
  actionGetAllPublications,
  actionFilterPublications,
  actionClearSearch,
  actionSetCurrentPage,
  actionSetFilter,
  actionClearFilter,
} from "../../store/slices/publication";
import { actionGetcategories } from "../../store/slices/category";
import Publication from "../Publication";
import LoadCard from "../LoadCard";
import Pagination from "../Pagination";

import io from "socket.io-client";
let socket;
socket = io(process.env.REACT_APP_BACKEND_URL);

export default function Home() {
  const dispatch = useDispatch();
  const { filterPublications, search, loading, currentPage, filterRedux } =
    useSelector((state) => state.publications);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.users);
  const [priceFilter, setPriceFIlter] = useState({ min: "", max: "" });
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState("");
  const [firstMount, setFirstMount] = useState(true);
  const [filter, setFilter] = useState(filterRedux);

  // console.log(filterRedux);

  // pagination
  const publicationsPerPage = 10;

  const lastGameIndex = currentPage * publicationsPerPage;
  const firstGameIndex = lastGameIndex - publicationsPerPage;
  const currentPublications = publications.slice(firstGameIndex, lastGameIndex);

  // socket;
  const params = window.location.href;

  const pagination = (pageNumber) => {
    dispatch(actionSetCurrentPage(pageNumber));
  };

  useEffect(() => {
    if (!search) dispatch(actionGetAllPublications());
    dispatch(actionGetcategories());
    socket.emit("Update", params);
    return () => {
      dispatch(actionClearSearch());
      // dispatch(actionClearFilter());
    };
  }, []);

  useEffect(() => {
    socket.on("homeUpdate", async () => {
      // await dispatch(actionGetAllPublications());
      // await dispatch(actionFilterPublications({ ...filter, search }));
      // setPublications(filterPublications.filter((p) => p.owner !== user._id));
      return () => {
        socket.off();
      };
    });
  }, []);

  useEffect(() => {
    setPublications(filterPublications.filter((p) => p.owner !== user._id));
  }, [filterPublications, user]);

  console.log(priceFilter);

  const handleFilter = (arr) => {
    if (arr[0] === "category")
      dispatch(
        actionSetFilter({ ...filterRedux, category: arr[1], subCategory: "" })
      );
    if (arr[0] === "subCategory")
      dispatch(
        actionSetFilter({
          ...filterRedux,
          category: arr[1],
          subCategory: arr[2],
        })
      );
    if (arr[0] === "state")
      dispatch(actionSetFilter({ ...filterRedux, state: arr[1] }));
    if (arr[0] === "price") {
      if (!isNaN(priceFilter.min) && !isNaN(priceFilter.max)) {
        if (priceFilter.min === "" && priceFilter.max === "") {
          console.log("1");
          dispatch(
            actionSetFilter({
              ...filterRedux,
              price: {
                min: priceFilter.min,
                max: priceFilter.max,
              },
            })
          );
          setPriceFIlter({ min: "", max: "" });
          setError("");
        } else if (priceFilter.min !== "" && priceFilter.max === "") {
          console.log("2");
          dispatch(
            actionSetFilter({
              ...filterRedux,
              price: {
                min: priceFilter.min,
                max: priceFilter.max,
              },
            })
          );
          setPriceFIlter({ min: "", max: "" });
          setError("");
        } else if (priceFilter.min === "" && priceFilter.max !== "") {
          console.log("3");
          dispatch(
            actionSetFilter({
              ...filterRedux,
              price: {
                min: priceFilter.min,
                max: priceFilter.max,
              },
            })
          );
          setPriceFIlter({ min: "", max: "" });
          setError("");
        } else if (Number(priceFilter.min) < Number(priceFilter.max)) {
          console.log("4");
          dispatch(
            actionSetFilter({
              ...filterRedux,
              price: {
                min: priceFilter.min,
                max: priceFilter.max,
              },
            })
          );
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
      dispatch(
        actionSetFilter({ ...filterRedux, category: "", subCategory: "" })
      );
    if (type === "subCategory")
      dispatch(actionSetFilter({ ...filterRedux, subCategory: "" }));
    if (type === "state")
      dispatch(actionSetFilter({ ...filterRedux, state: "" }));
    if (type === "min")
      dispatch(
        actionSetFilter({
          ...filterRedux,
          price: { min: "", max: filterRedux.price.max },
        })
      );
    if (type === "max")
      dispatch(
        actionSetFilter({
          ...filterRedux,
          price: { min: filterRedux.price.min, max: "" },
        })
      );
    if (type === "allPrice")
      dispatch(
        actionSetFilter({ ...filterRedux, price: { min: "", max: "" } })
      );
  };

  const handleReset = () => {
    dispatch(actionClearSearch());
    setPriceFIlter({ min: "", max: "" });
    setError("");
    dispatch(actionClearFilter());
  };

  return (
    <div className="main">
      <section className="filters">
        {!loading && <h3>{publications.length} Results</h3>}

        <h2>Filters</h2>
        {search && <h3>{search}</h3>}
        <div className="filtersName">
          {filterRedux.category && (
            <p onClick={() => handleRemoveFilter("category")}>
              {filterRedux.category} <span>x</span>
            </p>
          )}
          {filterRedux.subCategory && (
            <p onClick={() => handleRemoveFilter("subCategory")}>
              {filterRedux.subCategory} <span>x</span>
            </p>
          )}
          {filterRedux.state && (
            <p onClick={() => handleRemoveFilter("state")}>
              {filterRedux.state} <span>x</span>
            </p>
          )}
          {filterRedux.price.min && filterRedux.price.max ? (
            <p
              onClick={() => {
                handleRemoveFilter("allPrice");
              }}
            >
              ${filterRedux.price.min} - ${filterRedux.price.max} <span>x</span>
            </p>
          ) : filterRedux.price.min ? (
            <p onClick={() => handleRemoveFilter("min")}>
              from ${filterRedux.price.min} <span>x</span>
            </p>
          ) : (
            filterRedux.price.max && (
              <p onClick={() => handleRemoveFilter("max")}>
                up ${filterRedux.price.max} <span>x</span>
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
                className={filterRedux.category === cat.name ? "active" : ""}
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
                        filterRedux.subCategory === subCat
                          ? filterRedux.category === cat.name
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
        {loading ? (
          <LoadCard />
        ) : currentPublications.length > 0 ? (
          <>
            <Pagination
              perPage={publicationsPerPage}
              amount={publications.length}
              pagination={pagination}
            />
            {currentPublications?.map((publication) => (
              <Publication key={publication._id} product={publication} />
            ))}
          </>
        ) : (
          <h2>no publications</h2>
        )}
      </section>
    </div>
  );
}
