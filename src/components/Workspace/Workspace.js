import React from 'react';
import './Workspace.css';
import Project from "../Project/Project";
import {getRunningEntry, startTask, stopTask} from "../Clockify";

class Workspace extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      runningEntry: null
    };
  }

  componentDidMount() {
    this.updateRunningEntry();
  }

  updateRunningEntry() {
    getRunningEntry(this.props.workspace.id)
      .then((runningEntry) => {
        this.setState({runningEntry: runningEntry});
      });
  }

  start(project, task) {
    this.setState({runningEntry: null});
    task = task.id === 'start' ? null : task;
    startTask(project, task)
      .then((runningEntry) => {
        this.setState({runningEntry: runningEntry});
      });
  }

  stop() {
    this.setState({runningEntry: null});
    stopTask(this.state.runningEntry);
  }

  renderProjects() {
    if (!this.props.workspace || !this.props.workspace.projects) {
      return '';
    }
    return this.props.workspace.projects.map((project) => {
      return <Project
        key={project.id}
        project={project}
        runningEntry={this.state.runningEntry}
        startTask={(project, task) => this.start(project, task)}
        stopTask={() => this.stop()}
      />
    });
  }

  // Workspace: {this.props.workspace.name}
  render() {
    return (
      <div className="Workspace">
        <div className="Workspace-title">Workspace: {this.props.workspace.name}</div>
        <div className="projects">
          {this.renderProjects()}
        </div>
      </div>
    );
  }
}

export default Workspace;
