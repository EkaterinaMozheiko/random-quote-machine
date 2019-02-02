import React, { Component } from 'react';

interface componentState {
  quoteText: string,
  quoteAuthor: string
}

class App extends Component<{}, componentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      quoteText: '',
      quoteAuthor: ''
    };
  }

  render() {
    return (
      <div id="quote-box">
        <div id="text">
        TEXT
        </div>
        <div id="author">
        AUTHOR
        </div>
        <button id="new-quote">NEW QUOTE</button>
        <button id="tweet-quote">TWEET QUOTE</button>
      </div>
      
    );
  }
}

export default App;
