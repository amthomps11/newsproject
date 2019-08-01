import React from "react";

import axios from "axios";

// import SOURCES from "../src/sources.json";

// import "./App.css";

// import Header from "../Header";
import "../Header/Header.css";

import Searchbar from "../Searchbar";
import "../Searchbar/Searchbar.css";

import Newscard from "../Newscard";
import "../Newscard/Newscard.css";

// import Filterbar from "../Filterbar";
import "../Filterbar/Filterbar.css";

const TOKEN = process.env.REACT_APP_API_KEY;

class Searchnews extends React.Component {
  constructor() {
    super();
    this.state = { articles: [], currentQuery: "" };
  }

  getCall = async () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${
          this.state.currentQuery
        }&apiKey=${TOKEN}`
      )
      .then(res => {
        this.setState(prevState => ({
          articles: [...res.data.articles]
        }));
      });
  };

  handleClick = e => {
    e.preventDefault();
    this.getCall();
    this.renderItems();
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ currentQuery: e.target.value });
  };

  renderItems = () => {
    return this.state.articles.map((article, index) => {
      console.log(article);
      return (
        <div className="flip-container">
          <Newscard
            key={index}
            imgURL={article.urlToImage}
            title={article.title}
            description={article.description}
            source={article.source.name}
            link={article.url}
          />
        </div>
      );
    });
  };

  render() {
    return (
      <div className="articles-container">
        <Searchbar
          value={this.state.currentQuery}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
        <div className="news-wrapper">{this.renderItems()}</div>
      </div>
    );
  }
}

export default Searchnews;
