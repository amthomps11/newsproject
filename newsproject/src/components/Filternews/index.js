import React from "react";

// import axios from "axios";

// import SOURCES from "../src/sources.json";

// import "./App.css";

// import Header from "../Header";
import "../Header/Header.css";

// import Searchbar from "../Searchbar";
import "../Searchbar/Searchbar.css";

import Newscard from "../Newscard";
import "../Newscard/Newscard.css";

import Filterbar from "../Filterbar";
import "../Filterbar/Filterbar.css";

// const TOKEN = process.env.REACT_APP_API_KEY;

class Filternews extends React.Component {
  constructor() {
    super();
    this.state = { articles: [] };
  }

  //   getCall = async () => {
  //     axios
  //       .get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${TOKEN}`)
  //       .then(res => {
  //         this.setState(prevState => ({
  //           articles: [...res.data.articles]
  //         }));
  //       });
  //   };

  //   async componentDidMount() {
  //     await this.getCall();
  //   }

  renderItems = () => {
    return this.state.articles.map((article, index) => {
      //   console.log(article);
      return (
        <div className="flip-container">
          <Newscard
            key={index}
            imgURL={article.urlToImage}
            title={article.title}
            description={article.description}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <Filterbar />
        <div className="news-wrapper">{this.renderItems()}</div>
      </div>
    );
  }
}

export default Filternews;
