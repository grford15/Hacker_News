import React, { Component } from 'react';
import Search from './components/Search';
import Table from './components/Table';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '50';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

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
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchtopStories = this.fetchSearchtopStories.bind(
      this,
    );
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    this.fetchSearchtopStories(searchTerm);
  }

  fetchSearchtopStories(searchTerm, page = 0) {
    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`,
    )
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchtopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result;

    const oldHits = page !== 0 ? this.state.result.hits : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({ result: { hits: updatedHits, page } });
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
    const page = (result && result.page) || 0;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result && (
          <Table list={result.hits} onDismiss={this.onDismiss} />
        )}
        <div className="interactions">
          <button
            onClick={() =>
              this.fetchSearchtopStories(searchTerm, page + 1)
            }
          >
            More
          </button>
        </div>
      </div>
    );
  }
}

export default App;
