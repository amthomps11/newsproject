import React from "react";

import axios from "axios";

import SOURCES from "../src/sources.json";

import "./App.css";

import Header from "./components/Header";
import "./components/Header/Header.css";

import Searchbar from "./components/Searchbar";
import "./components/Searchbar/Searchbar.css";

import Newscard from "./components/Newscard";
import "./components/Newscard/Newscard.css";

import Filterbar from "./components/Filterbar";
import "./components/Filterbar/Filterbar.css";

const TOKEN = process.env.REACT_APP_API_KEY;

class App extends React.Component {
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
        <Newscard
          key={index}
          imgURL={article.urlToImage}
          title={article.title}
        />
      );
    });
  };

  render() {
    console.log(SOURCES);
    return (
      <div className="app-container">
        <Header />
        <Searchbar
          value={this.state.currentQuery}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
        <Filterbar />
        <div className="news-wrapper">{this.renderItems()}</div>
      </div>
    );
  }
}

export default App;
