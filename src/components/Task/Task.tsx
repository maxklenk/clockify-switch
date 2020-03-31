import React from 'react';
import './Task.css';

type TaskProps = {
    onClick: Function;
    active: boolean;
    name: string;
}
type TaskState = {}

class Task extends React.Component<TaskProps, TaskState> {
    clickTask(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.props.onClick();
        event.stopPropagation();
    }

    render() {
        return (
            <button className={'Task ' + (this.props.active && 'active')} onClick={(event) => this.clickTask(event)}>
                {this.props.name}
            </button>
        );
    }
}

export default Task;
