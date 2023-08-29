import { Component } from "react";
import PropTypes from "prop-types";

import "../styles/countdown.css";
import pattern from "../assets/pattern-hills.svg";
import stars from "../assets/stars.svg";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.calculateTimeUntilDeadline();
    this.interval = setInterval(this.calculateTimeUntilDeadline, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deadline !== this.props.deadline) {
      this.calculateTimeUntilDeadline();
      clearInterval(this.interval); // Clear the previous interval
      this.interval = setInterval(this.calculateTimeUntilDeadline, 1000); // Start a new interval
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  calculateTimeUntilDeadline = () => {
    const deadline = new Date(this.props.deadline);
    const currentTime = new Date();
    const timeDifference = deadline - currentTime;

    if (timeDifference <= 0) {
      clearInterval(this.interval);
      return "0";
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (isNaN(days || hours || minutes || seconds)) {
      return "0";
    }

    this.setState({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  render() {
    return (
      <>
        <h1>WE'RE LAUNCHING SOON</h1>

        <div className="container">
          <div className="time">
            <div className="number">{this.state.days}</div>
            <div className="legend">days</div>
          </div>
          <div className="time">
            <div className="number">{this.state.hours}</div>
            <div className="legend">hours</div>
          </div>
          <div className="time">
            <div className="number">{this.state.minutes}</div>
            <div className="legend">minutes</div>
          </div>
          <div className="time">
            <div className="number">{this.state.seconds}</div>
            <div className="legend">seconds</div>
          </div>
        </div>
        <img className="pattern" src={pattern} alt="pattern" />
        <img className="stars" src={stars} alt="stars" />
      </>
    );
  }
}

Countdown.propTypes = {
  deadline: PropTypes.string.isRequired,
};

export default Countdown;
