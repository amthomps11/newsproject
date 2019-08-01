import React from "react";

function Searchbar(props) {
  return (
    <div className="searchbar-wrapper">
      <input
        type="text"
        value={props.value}
        placeholder="Search Here..."
        onChange={props.handleChange}
        className="search-input"
      />
      <button
        onClick={props.handleClick}
        type="submit"
        className="search-button"
      >
        <i class="fa fa-search fa-2x" />
      </button>
    </div>
  );
}

export default Searchbar;
