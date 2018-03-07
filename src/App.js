import React, { Component } from 'react';
import AutocompleteInput from './components/autocomplete_input';
import './App.css';
import data from './MOCK_DATA_1000.json';

class App extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      data,
    };
  }
  render() {
    return (
      <div className="App">
        <AutocompleteInput data={this.state.data}/>
      </div>
    );
  }
}

export default App;
