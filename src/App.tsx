import React, { Component } from 'react';
import axios from 'axios';

import './App.scss';

interface componentState {
  quoteText: string;
  quoteAuthor: string;
  currentColor: string;
}

class App extends Component<{}, componentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      quoteText: '',
      quoteAuthor: '',
      currentColor: ''
    };
  }

  componentDidMount() {
    this.getNewQuote();
  }

  handleClick = () => {
    this.getNewQuote();
  }

  getNewQuote() {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=?'
      )
      .then(response =>
        this.setState({
          quoteText: response.data.quoteText,
          quoteAuthor: response.data.quoteAuthor,
          currentColor: '#' + Math.random().toString(16).slice(-6)
        })
      )
      .catch(error => {
        this.setState({
          quoteText: 'Sorry! There is no quote:( Try again',
          quoteAuthor: '',
          currentColor: '#' + Math.random().toString(16).slice(-6)
        });
      });
  }

  render() {
    const { quoteText, quoteAuthor } = this.state;
    return (
      <div
        className="wrapper"
        style={{ backgroundColor: this.state.currentColor }}
      >
        <div id="quote-box" className="quote-box">
          <div className="text-wrapper">
            <div
              id="text"
              className="text"
              style={{ color: this.state.currentColor }}
            >
              {quoteText}
            </div>
            <div
              id="author"
              className="author"
              style={{ color: this.state.currentColor }}
            >
              {quoteAuthor}
            </div>
          </div>
          <div className="button-wrapper">
            <button
              id="new-quote"
              onClick={this.handleClick}
              className="button"
            >
              NEW QUOTE
            </button>
            <a id="tweet-quote" href="twitter.com/intent/tweet">
              TWEET QUOTE
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
