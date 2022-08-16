import React from "react";
import "../styles/forms.css";
import "../styles/searchbar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineSearch } from "react-icons/ai";

import { actionSetSearch } from "../store/slices/publication";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useSelector((state) => state.publications);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {}, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actionSetSearch(searchBar));
    setSearchBar("");
    navigate("/");
  };

  return (
    <div className="searchbar">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={searchBar}
          onChange={(e) => setSearchBar(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch className="icon" />
        </button>
      </form>
    </div>
  );
}
