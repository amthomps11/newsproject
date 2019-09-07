import React from "react";

import "./App.css";

import Header from "./components/Header";
import "./components/Header/Header.css";

import "./components/Searchbar/Searchbar.css";

import "./components/Newscard/Newscard.css";

import "./components/Filterbar/Filterbar.css";

import Topnews from "./components/Topnews";
import "./components/Topnews/Topnews.css";
import Searchnews from "./components/Searchnews";

import { Route, NavLink } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = { favorites: [] };
  }

  render() {
    return (
      <div className="app-container">
        <Header />

        <div className="viewnav-bar">
          <NavLink activeClassName="active" to="/topnews/">
            Top News
          </NavLink>

          <NavLink activeClassName="active" to="/search/">
            Search
          </NavLink>
        </div>

        <Route path="/topnews/" render={props => <Topnews {...props} />} />

        <Route path="/search/" component={Searchnews} />
      </div>
    );
  }
}

export default App;
