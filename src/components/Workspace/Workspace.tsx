import React from 'react';
import './Workspace.css';
import Project from "../Project/Project";
import {ClockifyProject, ClockifyTag, ClockifyTask, ClockifyTimeEntry, ClockifyWorkspace, getRunningEntry, startTask, stopTask, updateTask} from "../../services/Clockify";

type WorkspaceProps = {
    workspace: ClockifyWorkspace;
}
type WorkspaceState = {
    runningEntry: ClockifyTimeEntry | null;
}

class Workspace extends React.Component<WorkspaceProps, WorkspaceState> {
    timeout: NodeJS.Timeout | undefined;
    state: WorkspaceState = {
        runningEntry: null
    };

    componentDidMount() {
        this.updateRunningEntry();
    }

    componentWillUnmount() {
        clearTimeout();
    }

    clearTimeout() {
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    updateRunningEntry() {
        clearTimeout();
        return getRunningEntry(this.props.workspace.id)
            .then((runningEntry) => {
                this.setState({runningEntry: runningEntry});
            })
            .finally(() => {
                this.timeout = setTimeout(() => {
                    this.updateRunningEntry();
                }, 30 * 1000);
            });
    }

    start(project: ClockifyProject, task: ClockifyTask | null = null, tag: ClockifyTag | null = null) {
        this.setState({runningEntry: null});
        task = (task && task.id === 'start') ? null : task;
        startTask(project, task, tag)
            .then((runningEntry) => {
                this.setState({runningEntry: runningEntry});
            });
    }

    stop() {
        if (this.state.runningEntry) {
            stopTask(this.state.runningEntry);
        }
        this.setState({runningEntry: null});
    }

    typeTaskDescription(event: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout();
        if (this.state.runningEntry) {
            const runningEntry = this.state.runningEntry;
            runningEntry.description = event.target.value;
            this.setState({runningEntry: runningEntry});
        }
    }

    updateTaskDescription() {
        if (this.state.runningEntry) {
            updateTask(this.state.runningEntry);
        }
    }

    setTag(project: ClockifyProject, tag: ClockifyTag) {
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

    addMinutes(minutes:number) {
        if (this.state.runningEntry) {
            // calculate new start
            const startTime = +new Date(this.state.runningEntry.timeInterval.start);
            const newStartTime = startTime - minutes * 60 * 1000;

            // update state
            const runningEntry = this.state.runningEntry;
            runningEntry.timeInterval.start = new Date(newStartTime).toISOString();
            this.setState({runningEntry: runningEntry});

            // save on Clockify
            updateTask(runningEntry);
        }
    }

    renderProjects() {
        if (!this.props.workspace || !this.props.workspace.projects) {
            return '';
        }
        return this.props.workspace.projects.map((project: ClockifyProject) => {
            return <Project
                key={project.id}
                workspace={this.props.workspace}
                project={project}
                runningEntry={this.state.runningEntry}
                startTask={(project: ClockifyProject, task: ClockifyTask) => this.start(project, task)}
                stopTask={() => this.stop()}
                updateTaskDescription={() => this.updateTaskDescription()}
                typeTaskDescription={(event: React.ChangeEvent<HTMLInputElement>) => this.typeTaskDescription(event)}
                setTag={(project: ClockifyProject, tag: ClockifyTag) => this.setTag(project, tag)}
                addFifteenMinutes={() => this.addMinutes(15)}
            />
        });
    }

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
