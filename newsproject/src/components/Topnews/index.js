import React from "react";

import axios from "axios";

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

import Pillholder from "../Pillholder";
import "../Pillholder/Pillholder.css";

const TOKEN = process.env.REACT_APP_API_KEY;

const removeString = (mainString, string) => {
  let str = mainString;
  let word = string + ",";
  let l = word.length;
  var n = str.indexOf(word);
  let tempS1 = str.substring(0, n);
  let tempS2 = str.substring(n + l, str.length);
  return tempS1 + tempS2;
};

class Topnews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      sources: "",
      topics: ""
    };
  }

  getCall = async () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apiKey=${TOKEN}`
      )
      .then(res => {
        this.setState({
          articles: [...res.data.articles]
        });
      });
  };

  async componentDidMount() {
    await this.getCall();
  }

  handleFetchNews = async () => {
    if (this.state.sources === "" && this.state.topics !== "") {
      try {
        let url = `https://newsapi.org/v2/top-headlines?q=${
          this.state.topics
        }&pageSize=40&country=us&apiKey=${TOKEN}`;
        // console.log(url);
        const data = await axios.get(url);
        await this.setState({
          articles: [...data.data.articles]
        });
      } catch (error) {
        // console.log(error);
      }
    } else if (this.state.sources !== "" && this.state.topics === "") {
      try {
        let url = `https://newsapi.org/v2/top-headlines?sources=${
          this.state.sources
        }&pageSize=40&apiKey=${TOKEN}`;
        // console.log(url);
        const data = await axios.get(url);
        await this.setState({
          articles: [...data.data.articles]
        });
      } catch (error) {
        // console.log(error);
      }
    } else if (this.state.sources !== "" && this.state.topics !== "") {
      try {
        let url = `https://newsapi.org/v2/top-headlines?sources=${
          this.state.sources
        }&q=${this.state.topics}&pageSize=40&apiKey=${TOKEN}`;
        console.log(url);
        const data = await axios.get(url);
        await this.setState({
          articles: [...data.data.articles]
        });
      } catch (error) {
        // console.log(error);
      }
    }
  };

  handleSetSource = async e => {
    const source = e.target.getAttribute("name");
    const topic = e.target.getAttribute("value");
    if (source) {
      if (this.state.sources === "") {
        await this.setState(prevState => {
          prevState.sources = source;
        });
      } else if (this.state.source !== "") {
        await this.setState(prevState => {
          prevState.sources = prevState.sources + `,${source}`;
        });
      }
    }
    if (topic) {
      if (this.state.topics === "") {
        await this.setState(prevState => {
          prevState.topics = topic;
        });
      } else if (this.state.topic !== "") {
        await this.setState(prevState => {
          prevState.topics = prevState.topics + `,${topic}`;
        });
      }
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
      console.log("source");
      let tempString = this.state.sources;
      console.log(tempString);
      let newString = removeString(tempString, filterToRemove);
      console.log(newString);
      await this.setState({ sources: newString });
    }
    if (this.state.topics.indexOf(filterToRemove) !== -1) {
      console.log("topic");
    }
    await this.handleFetchNews();
  };

  render() {
    return (
      <div>
        <Pillholder
          pills={this.state.sources
            .split(",")
            .concat(this.state.topics.split(","))}
          handleRemoveFilter={this.handleRemovefilter}
        />
        <div className="content-wrapper">
          <Filterbar handleFilter={this.handleSetSource} />
          <div className="news-wrapper">{this.renderItems()}</div>
        </div>
      </div>
    );
  }
}

export default Topnews;

// handleFilter = async e => {
//   let type = e.target.getAttribute("value1");
//   let filter = e.target.getAttribute("value2");

//   if (type === "source") {
//     if (this.state.sources !== "") {
//       this.setState(prevState => ({
//         sources: `${prevState.sources},${filter}`,
//         url: `https://newsapi.org/v2/top-headlines?sources=${
//           this.state.sources
//         }&q=${this.state.topics}&apiKey=${TOKEN}`
//       }));
//     } else if (this.state.sources === "") {
//       this.setState({
//         sources: filter,
//         url: `https://newsapi.org/v2/top-headlines?sources=${
//           this.state.sources
//         }&q=${this.state.topics}&apiKey=${TOKEN}`
//       });
//     }
//   } else if (type === "topic") {
//     if (this.state.topics !== "") {
//       this.setState(prevState => ({
//         topics: `${prevState.topics},${filter}`,
//         url: `https://newsapi.org/v2/top-headlines?sources=${
//           this.state.sources
//         }&q=${this.state.topics}&apiKey=${TOKEN}`
//       }));
//     } else {
//       this.setState(prevState => ({
//         topics: filter,
//         url: `https://newsapi.org/v2/top-headlines?sources=${
//           this.state.sources
//         }&q=${this.state.topics}&apiKey=${TOKEN}`
//       }));
//     }
//   }
//   this.getCall();
// };
