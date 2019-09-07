import React from "react";

import axios from "axios";

import "../Header/Header.css";

import "../Searchbar/Searchbar.css";

import Newscard from "../Newscard";
import "../Newscard/Newscard.css";

import Filterbar from "../Filterbar";
import "../Filterbar/Filterbar.css";

import Pillholder from "../Pillholder";
import "../Pillholder/Pillholder.css";

const TOKEN = process.env.REACT_APP_API_KEY;

class Topnews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      sources: [],
      topics: []
    };
  }

  getCall = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apiKey=${TOKEN}`;
    await axios.get(url).then(res => {
      console.log(url);
      this.setState({
        articles: [...res.data.articles]
      });
    });
  };

  async componentDidMount() {
    await this.getCall();
  }

  handleFetchNews = async () => {
    if (this.state.sources === [] && this.state.topics === []) {
      try {
        let url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apiKey=${TOKEN}`;
        const data = await axios.get(url);
        await this.setState({
          articles: [...data.data.articles]
        });
      } catch (error) {
        console.log(error);
      }
    } else if (this.state.sources === [] && this.state.topics !== []) {
      try {
        let url = `https://newsapi.org/v2/top-headlines?q=${this.state.topics}&pageSize=40&country=us&apiKey=${TOKEN}`;
        const data = await axios.get(url);
        await this.setState({
          articles: [...data.data.articles]
        });
      } catch (error) {
        console.log(error);
      }
    } else if (this.state.sources !== [] && this.state.topics === []) {
      try {
        let url = `https://newsapi.org/v2/top-headlines?sources=${this.state.sources.join(
          ","
        )}&pageSize=40&apiKey=${TOKEN}`;
        const data = await axios.get(url);
        await this.setState({
          articles: [...data.data.articles]
        });
      } catch (error) {
        console.log(error);
      }
    } else if (this.state.sources !== [] && this.state.topics !== []) {
      try {
        let url = `https://newsapi.org/v2/top-headlines?sources=${this.state.sources.join(
          ","
        )}&q=${this.state.topics.join(",")}&pageSize=40&apiKey=${TOKEN}`;
        console.log(url);
        const data = await axios.get(url);
        await this.setState({
          articles: [...data.data.articles]
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleSetSource = async e => {
    const source = e.target.getAttribute("name");
    const topic = e.target.getAttribute("value");
    if (source) {
      await this.setState(prevState => {
        prevState.sources = [...prevState.sources, source];
      });
    }
    if (topic) {
      await this.setState(prevState => {
        prevState.topics = [...prevState.topics, topic];
      });
    }
    await this.handleFetchNews();
  };

  renderItems = () => {
    return this.state.articles.map((article, index) => {
      return (
        <div className="flip-container">
          <Newscard
            key={index}
            imgURL={article.urlToImage}
            title={article.title}
            description={article.description}
            source={article.source.name}
            link={article.url}
            handleFavorite={this.props.handleFavorite}
          />
        </div>
      );
    });
  };

  handleRemovefilter = async e => {
    let filterToRemove = e.target.getAttribute("name");
    if (this.state.sources.indexOf(filterToRemove) !== -1) {
      let index = this.state.sources.indexOf(filterToRemove);
      let tempArray = this.state.sources;
      if (tempArray.length > 1) {
        tempArray.splice(index, 1);
      } else {
        tempArray = [];
      }
      await this.setState({ sources: tempArray });
    }
    if (this.state.topics.indexOf(filterToRemove) !== -1) {
      let index = this.state.topics.indexOf(filterToRemove);
      let tempArray = this.state.topics;
      if (tempArray.length > 1) {
        tempArray.splice(index, 1);
      } else {
        tempArray = [];
      }
      await this.setState({ topics: tempArray });
    }

    await this.handleFetchNews();
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* <div className="filter-pill-holder">
          <Filterbar handleFilter={this.handleSetSource} />
          <Pillholder
            pills={this.state.sources.concat(this.state.topics)}
            handleRemoveFilter={this.handleRemovefilter}
          />
        </div> */}
        <div className="news-wrapper">{this.renderItems()}</div>
      </div>
    );
  }
}

export default Topnews;
