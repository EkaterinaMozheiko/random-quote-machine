import React, { Component } from 'react';
import axios from 'axios';

import './App.scss';

interface componentState {
  quoteText: string;
  quoteAuthor: string;
}

class App extends Component<{}, componentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      quoteText: '',
      quoteAuthor: ''
    };
  }

  componentDidMount() {
    this.getNewQuote();
  }

  handleClick = () => {
    this.getNewQuote();
  }

  getNewQuote() {
    axios.get(
      'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&json=?'
    ).then(response => 
      this.setState({
        quoteText: response.data.quoteText,
        quoteAuthor: response.data.quoteAuthor
      })
    );
  };

  render() {
    const { quoteText, quoteAuthor } = this.state;
    return (
      <div className="wrapper">
        <div id="quote-box" className="quote-box">
          <div id="text">{quoteText}</div>
          <div id="author">{quoteAuthor}</div>
          <button id="new-quote" onClick={this.handleClick}>
            NEW QUOTE
          </button>
          <a id="tweet-quote">TWEET QUOTE</a>
        </div>
      </div>
    );
  }
}

export default App;
