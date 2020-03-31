import React from 'react';

type StopwatchProps = {
    start: string;
}
type StopwatchState = {
    hours: string;
    minutes: string;
    seconds: string;
}

class Stopwatch extends React.Component<StopwatchProps, StopwatchState> {
    interval: NodeJS.Timeout | null = null;

    constructor(props: StopwatchProps) {
        super(props);

        this.state = {
            hours: '0',
            minutes: '00',
            seconds: '00',
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updateTimer(), 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    updateTimer() {
        const startTime = +new Date(this.props.start);
        const time = (Date.now() - startTime) / 1000;
        this.setState({
            hours: Math.floor(time / 60 / 60).toString(),
            minutes: padNull(Math.floor(time / 60 % 60)),
            seconds: padNull(Math.floor(time % 60)),
        });

        function padNull(num: number): string {
            return (num < 10) ? '0' + num : num.toString(10);
        }
    }

    render() {
        return this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds;
    }
}

export default Stopwatch;
