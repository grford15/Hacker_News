import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, onChange } = this.props;
    return (
      <form>
        <input type="text" value={value} onChange={onChange} />
      </form>
    );
  }
}

export default Search;
