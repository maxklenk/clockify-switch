import React from 'react';
import './Tag.css';

class Tag extends React.Component {
  clickTask(event) {
    this.props.onClick();
    event.stopPropagation();
  }

  render() {
    return (
      <button className={'Tag ' + (this.props.active && 'active')} onClick={(event) => this.clickTask(event)}>
        {this.props.name}
      </button>
    );
  }
}

export default Tag;
