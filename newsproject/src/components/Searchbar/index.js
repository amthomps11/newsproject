import React from "react";

function Searchbar(props) {
  return (
    <div>
      <input
        type="text"
        value={props.value}
        onChange={props.handleChange}
        className="search-input"
      />
      <button
        onClick={props.handleClick}
        type="submit"
        className="search-button"
      >
        search
      </button>
    </div>
  );
}

export default Searchbar;
