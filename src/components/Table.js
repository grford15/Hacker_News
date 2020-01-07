import React from 'react';

const Table = ({ list, onDismiss }) => {
  return (
    <div className="table">
      {list.map(item => (
        <div key={item.objectID} className="table-row">
          <span style={{ width: '40%' }}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span className="large-column">{item.author}</span>
          <span className="medium-column">{item.num_comments}</span>
          <span className="small-column">{item.points}</span>
          <span className="small-column">
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

const Button = ({ onClick, className = '', children }) => {
  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
};

export default Table;
