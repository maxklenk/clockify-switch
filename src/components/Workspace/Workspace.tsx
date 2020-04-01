import React from 'react';
import './Workspace.css';
import Project from "../Project/Project";
import {ClockifyProject, ClockifyTag, ClockifyTask, ClockifyTimeEntry, ClockifyWorkspace, getRunningEntry, startTask, stopTask, updateTask} from "../../services/Clockify";

type WorkspaceProps = {
    workspace: ClockifyWorkspace;
}
type WorkspaceState = {
    runningEntry: ClockifyTimeEntry;
}

class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
    interval: NodeJS.Timeout | undefined;
    state: WorkspaceState = {
        runningEntry: null
    };

    componentDidMount() {
        this.updateRunningEntry();
        this.interval = setInterval(() => this.updateRunningEntry(), 30 * 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    updateRunningEntry() {
        getRunningEntry(this.props.workspace.id)
            .then((runningEntry) => {
                this.setState({runningEntry: runningEntry});
            });
    }

    start(project:ClockifyProject, task:ClockifyTask|null = null, tag:ClockifyTag|null = null) {
        this.setState({runningEntry: null});
        task = (task && task.id === 'start') ? null : task;
        startTask(project, task, tag)
            .then((runningEntry) => {
                this.setState({runningEntry: runningEntry});
            });
    }

    stop() {
        this.setState({runningEntry: null});
        stopTask(this.state.runningEntry);
    }

    typeTaskDescription(event:React.ChangeEvent<HTMLInputElement>) {
        const runningEntry = this.state.runningEntry;
        runningEntry.description = event.target.value;
        this.setState({runningEntry: runningEntry});
    }

    updateTaskDescription() {
        updateTask(this.state.runningEntry);
    }

    setTag(project:any, tag:any) {
        if (this.state.runningEntry && this.state.runningEntry.projectId === project.id) {
            // running task in same project
            const runningEntry = this.state.runningEntry;
            if (!runningEntry.tagIds) {
                runningEntry.tagIds = [];
            }
            // > add/remove tag
            const index = runningEntry.tagIds.indexOf(tag.id);
            if (index !== -1) {
                runningEntry.tagIds.splice(index, 1);
            } else {
                runningEntry.tagIds.push(tag.id);
            }
            this.setState({runningEntry: runningEntry});
            updateTask(runningEntry);
        } else {
            // new task with tag
            this.start(project, null, tag);
        }
    }

    renderProjects() {
        if (!this.props.workspace || !this.props.workspace.projects) {
            return '';
        }
        return this.props.workspace.projects.map((project:ClockifyProject) => {
            return <Project
                key={project.id}
                workspace={this.props.workspace}
                project={project}
                runningEntry={this.state.runningEntry}
                startTask={(project:ClockifyProject, task:ClockifyTask) => this.start(project, task)}
                stopTask={() => this.stop()}
                updateTaskDescription={() => this.updateTaskDescription()}
                typeTaskDescription={(event:React.ChangeEvent<HTMLInputElement>) => this.typeTaskDescription(event)}
                setTag={(project:ClockifyProject, tag:ClockifyTag) => this.setTag(project, tag)}
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
