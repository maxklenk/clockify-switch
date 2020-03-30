import React from 'react';
import './Task.css';

class Task extends React.Component {
  clickTask(event) {
    this.props.onClick();
    event.stopPropagation();
  }

  render() {
    return (
      <button className={'Task ' + (this.props.active ? 'active' : '')} onClick={(event) => this.clickTask(event)}>
        {this.props.name}
      </button>
    );
  }
}

export default Task;
