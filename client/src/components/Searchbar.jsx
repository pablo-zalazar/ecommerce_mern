import React from "react";
import "../styles/forms.css";
import "../styles/searchbar.css";
import { useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";

export default function Searchbar() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    setSearch("");
  };
  return (
    <div className="searchbar">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch className="icon" />
        </button>
      </form>
    </div>
  );
}
