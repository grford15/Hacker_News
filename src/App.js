import React, { Component } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories(result) {
    this.setState({ result: result });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits },
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, result } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        {result && (
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
            isSearched={this.isSearched}
          />
        )}
      </div>
    );
  }
}

export default App;
