import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/home.css";

import { getAllPublications } from "../../store/slices/publication";
import Publication from "../Publication";

export default function Home() {
  const dispatch = useDispatch();
  const { allPublications } = useSelector((state) => state.publications);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    async function getPublications() {
      await dispatch(getAllPublications());
    }

    getPublications();
  }, []);

  return (
    <div className="main">
      <section className="filters">
        <h2>Filters</h2>
        <h3>{allPublications.length} Results</h3>
        <h3>Category</h3>

        <h3>State</h3>

        <h3>Price</h3>
      </section>
      <section className="cards">
        {allPublications.length > 0 ? (
          allPublications?.map(
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
