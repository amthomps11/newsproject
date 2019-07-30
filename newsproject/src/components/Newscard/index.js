import React from "react";

function Newscard(props) {
  return (
    <div className="newscard-container">
      <div className="newscard-front">
        <p>{props.title}</p>
        <img className="news-image" src={props.imgURL} alt="article affas" />
      </div>
      <div className="newscard-back">
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default Newscard;
