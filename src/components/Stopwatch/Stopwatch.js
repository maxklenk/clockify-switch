import React from 'react';

class Stopwatch extends React.Component {
  constructor(props) {
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
    clearInterval(this.interval);
  }

  updateTimer() {
    const time = (Date.now() - new Date(this.props.start)) / 1000;
    this.setState({
      hours: Math.floor(time / 60 / 60),
      minutes: padNull(Math.floor(time / 60 % 60)),
      seconds: padNull(Math.floor(time % 60)),
    });

    function padNull(num) {
      return (num < 10) ? '0' + num : num;
    }
  }

  render() {
    return this.state.hours + ':' + this.state.minutes + ':' + this.state.seconds;
  }
}

export default Stopwatch;
