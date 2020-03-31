import React from 'react';
import './Tag.css';

type TagProps = {
    name: string;
    onClick: Function;
    active: boolean;
}
type TagState = {}

class Tag extends React.Component<TagProps, TagState> {
    clickTask(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
