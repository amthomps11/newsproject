import React from "react";
import "../Filterbar/Filterbar.css";

class Filterbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: true,
      topics: false,
      currentInput: "",
      // currentTopic: "",
      listOfSources: [],
      listOfTopics: []
    };
  }

  showSources = () => {
    this.setState(prevState => {
      return { sources: true, topics: false };
    });
  };

  showTopics = () => {
    this.setState(prevState => {
      return { topics: true, sources: false };
    });
  };

  handleInput = e => {
    e.preventDefault();
    this.setState({ currentInput: e.target.value });
  };

  handleClick = () => {
    if (this.state.sources === true) {
      // console.log("hi");
      this.setState({
        listOfSources: [...this.state.listOfSources, this.state.currentInput]
      });
    } else if (this.state.topics === true) {
      this.setState({
        listOfTopics: [...this.state.listOfTopics, this.state.currentInput]
      });
    }
  };
  renderAdditionalSources = () => {
    return this.state.listOfSources.map(source => {
      return (
        <li name={source} onClick={this.props.handleFilter}>
          {source}
        </li>
      );
    });
  };
  renderAdditionalTopics = () => {
    return this.state.listOfTopics.map(topic => {
      return (
        <li value={topic} onClick={this.props.handleFilter}>
          {topic}
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="entire-filter-bar-wrapper">
          <div>
            <input
              onChange={this.handleInput}
              value={this.state.currentInput}
            />
            <button onClick={this.handleClick}>Add filter</button>
          </div>
          <ul className="filterbar">
            <li onClick={this.showSources}>Sources</li>
            <li onClick={this.showTopics}>Topics</li>
          </ul>

          {this.state.sources ? (
            <ul className="source-topic-bar">
              <li name="cnn" onClick={this.props.handleFilter}>
                CNN
              </li>
              <li name="abc-news" onClick={this.props.handleFilter}>
                ABC
              </li>
              {this.renderAdditionalSources()}
            </ul>
          ) : (
            <ul className="source-topic-bar">
              <li value="Democrat" onClick={this.props.handleFilter}>
                Democrat
              </li>
              <li value="Debate" onClick={this.props.handleFilter}>
                Debate
              </li>
              {this.renderAdditionalTopics()}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Filterbar;
