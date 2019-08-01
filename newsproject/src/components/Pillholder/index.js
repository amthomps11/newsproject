import React from "react";

function Pillholder(props) {
  return (
    <div className="pill-wrapper">
      {props.pills.map((pill, index) => {
        if (pill !== "") {
          return (
            <button key={index} name={pill} onClick={props.handleRemoveFilter}>
              {pill}
            </button>
          );
        }
      })}
    </div>
  );
}

export default Pillholder;
