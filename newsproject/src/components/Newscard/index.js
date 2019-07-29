import React from "react";

function Newscard(props) {
  return (
    <div className="newscard">
      <p>{props.title}</p>
      <img className="news-image" src={props.imgURL} alt="article affas" />
    </div>
  );
}

export default Newscard;
