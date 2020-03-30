import React from 'react';
import './Project.css';
import Task from "../Task/Task";
import Stopwatch from "../Stopwatch/Stopwatch";

class Project extends React.Component {

  renderTasks() {
    if (!this.props.project || !this.props.project.tasks) {
      return '';
    }
    return this.props.project.tasks.map((task) => this.renderTask(task));
  }

  renderTask(task) {
    const active = this.props.runningEntry
      && this.props.project.id === this.props.runningEntry.projectId
      && (this.props.runningEntry.taskId === task.id || (this.props.runningEntry.taskId == null && task.id === 'start'));
    return (
      <Task
        key={task.id}
        name={task.name}
        active={active}
        onClick={() => active ? this.props.stopTask() : this.props.startTask(this.props.project, task)}
      />
    );
  }

  render() {
    const active = this.props.runningEntry && this.props.runningEntry.projectId === this.props.project.id;
    return (
      <div className={'Project'}>
        <div
          className={'Project-body ' + (active ? 'active' : '')}
          style={{'backgroundColor': this.props.project.color}}
          onClick={() => active ? this.props.stopTask() : this.props.startTask(this.props.project, this.props.project.tasks[0])}
        >
          <div style={{'display': 'flex'}}>
            <h4>{this.props.project.name}</h4>
            <time>{active && <Stopwatch start={this.props.runningEntry.timeInterval.start}/>}</time>
          </div>
          <div className="tasks">
            {this.renderTasks()}
          </div>
          { active && (
            <div className="Project-description">
              <input
                type="text"
                placeholder="Description"
                value={this.props.runningEntry.description || ''}
                onChange={this.props.updateTaskDescription}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Project;
