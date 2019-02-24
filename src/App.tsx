import React, { Component } from 'react';
import axios, { AxiosResponse } from 'axios';

import './App.scss';

interface componentState {
  quoteText: string;
  quoteAuthor: string;
  currentColor: string;
  quoteLink: string;
}

interface QuoteContent {
  quoteAuthor: string;
  quoteLink: string;
  quoteText: string;
  senderLink: string;
  senderName: string;
}

const errorMessage = 'Sorry! There is no quote:( Try again';

class App extends Component<{}, componentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      quoteText: '',
      quoteAuthor: '',
      currentColor: '',
      quoteLink: ''
    };
  }

  componentDidMount() {
    this.getNewQuote();
  }

  handleClick = () => {
    this.getNewQuote();
  };

  getRandomColor() {
    return '#' + Math.random().toString(16).slice(-6);
  }

  okRespone = (response: AxiosResponse<QuoteContent>) =>
    this.setState({
      quoteText: response.data.quoteText || errorMessage,
      quoteAuthor: response.data.quoteAuthor || '',
      currentColor: this.getRandomColor(),
      quoteLink: response.data.quoteLink
    });

  errorResponse = () =>
    this.setState({
      quoteText: errorMessage,
      quoteAuthor: '',
      currentColor: this.getRandomColor(),
      quoteLink: ''
    });

  getNewQuote() {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=?'
      )
      .then(this.okRespone)
      .catch(this.errorResponse);
  }

  get linkToShare() {
    return `https://twitter.com/intent/tweet?url=${this.state.quoteLink}`;
  }

  render() {
    const { quoteText, quoteAuthor, currentColor } = this.state;

    return (
      <div
        className="wrapper"
        style={{ backgroundColor: currentColor }}
      >
        <div id="quote-box" className="quote-box">
          <div className="text-wrapper">
            <div
              id="text"
              className="text"
              style={{ color: currentColor }}
            >
              {quoteText}
            </div>
            <div
              id="author"
              className="author"
              style={{ color: currentColor }}
            >
              {quoteAuthor}
            </div>
          </div>
          <div className="button-wrapper">
            <button
              id="new-quote"
              onClick={this.handleClick}
              style={{ backgroundColor: currentColor }}
              className="button"
            >
              NEW QUOTE
            </button>
            <a id="tweet-quote" href={this.linkToShare} target="_blank">
              <div className="tweet-button" style={{ backgroundColor: currentColor }}></div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
