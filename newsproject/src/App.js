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

import Topnews from "./components/Topnews";
// import Filternews from "./components/Filternews";
import Searchnews from "./components/Searchnews";

import { Route, Link } from "react-router-dom";

const TOKEN = process.env.REACT_APP_API_KEY;

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="viewnav-bar">
        <Link activeClassName="active" to="/topnews/">
          Top News
        </Link>

        <Link activeClassName="active" to="/search/">
          Search
        </Link>

        <Link activeClassName="active" to="/favorites/">
          Favorites
        </Link>
      </div>

      <Route path="/topnews/" component={Topnews} />
      <Route path="/search/" component={Searchnews} />
      {/* <Route path="/favorites/" component={Filternews} /> */}
    </div>
  );
}

export default App;
