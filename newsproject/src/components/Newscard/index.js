import React from "react";

import tempImage from "../../../src/placeholder.png";

function Newscard(props) {
  return (
    <div className="newscard-container">
      <div className="newscard-front">
        {props.imgURL ? (
          <img className="news-image" src={props.imgURL} alt="fsadadsfasd" />
        ) : (
          <img className="news-image" src={tempImage} alt="fsadadsfasd" />
        )}
        <p className="title">{props.title}</p>

        <p className="source">{props.source}</p>
      </div>

      <div className="newscard-back">
        <p>{props.description}</p>
        <a href={props.link}>Link To Article</a>
      </div>
    </div>
  );
}

export default Newscard;
