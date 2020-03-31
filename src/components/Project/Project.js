import React from 'react';
import './Project.css';
import Task from "../Task/Task";
import Tag from "../Tag/Tag";
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

  renderTags() {
    if (!this.props.workspace || !this.props.workspace.tags) {
      return '';
    }
    const activeProject = this.props.runningEntry && this.props.runningEntry.projectId === this.props.project.id;
    return this.props.workspace.tags.map((tag) => {
      const active = activeProject && this.props.runningEntry && this.props.runningEntry.tagIds && this.props.runningEntry.tagIds.indexOf(tag.id) !== -1;
      return (
        <Tag
          key={tag.id}
          name={tag.name}
          active={active}
          onClick={(event) => {this.props.setTag(this.props.project, tag)}}
        />
      )
    });
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
          <div className="Project-tasks">
            <button
              className={'Task'}
              onClick={() => active ? this.props.stopTask() : this.props.startTask(this.props.project, {id:'start'})}
            >
              {this.props.runningEntry ? (active ? 'Stop' : 'Switch') : 'Start'}
            </button>
            {this.renderTasks()}
          </div>
          { active && (
            <div className="Project-description">
              <input
                type="text"
                placeholder="Description"
                value={this.props.runningEntry.description || ''}
                onChange={(event) => this.props.typeTaskDescription(event)}
                onBlur={(event) => this.props.updateTaskDescription(event)}
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          )}
          <div className="Project-tags">
            {this.renderTags()}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
