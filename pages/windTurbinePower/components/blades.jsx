import React, { Component } from 'react';
import './turbine.css';

class TurbineBlades extends Component {
  constructor(props) {
    super(props);

    const angleOffset = Math.random() * 120;

    this.state = {
      angle: 0 + angleOffset
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    this.stopAnimation();
  }

  startAnimation() {
    this.animationFrame = requestAnimationFrame(this.animate);
  }

  stopAnimation() {
    cancelAnimationFrame(this.animationFrame);
  }

  animate = () => {
    const windVelocity = this.props.windVelocity > 3 ? (this.props.windVelocity - 3) / 12 : 0;

    this.setState(prevState => ({
      angle: (prevState.angle + windVelocity * 6) % 360
    }), () => {
      this.blades.style.transform = `rotate(${this.state.angle}deg)`;
      this.animationFrame = requestAnimationFrame(this.animate);
    });
  };

  render() {
    const bladeLength = (300 * this.props.bladeLength) / 200;

    const bladeWidthScale = 0.6 * (bladeLength / 175) + 0.4;
    const scale = bladeLength / 175;

    return (
      <svg
        className="turbine-blades"
        x={this.props.x}
        y={this.props.y + 250}
        overflow="visible"
        width={this.props.width}
      >
        <defs>
          <symbol id="Blade" viewBox="-7.87 -100 15.73 100" overflow="visible">
            <polyline className="blade-side-2" points="0,0 -2,-2.09 -2.25,-175 2.25,-175 10,-12 0,0" />
            <polygon className="blade-side-1" points="0,-175 -2.25,-175 -16,-40 0,0 " />
          </symbol>
        </defs>

        <mask id="blade-center">
          <circle fill="#ffffff" cx="0" cy="0" r="10" />
        </mask>

        <g ref={node => (this.blades = node)}>
          <g transform={`scale(${scale})`}>
            <use xlinkHref="#Blade" width="15.73" height="100" x="-7.87" y="-100" transform="rotate(-120)" overflow="visible" />
            <use xlinkHref="#Blade1" width="15.73" height="100" x="-7.87" y="-100" overflow="visible" />
            <use xlinkHref="#Blade" width="15.73" height="100" x="-7.87" y="-100" overflow="visible" />
            <use xlinkHref="#Blade" width="15.73" height="100" x="-7.87" y="-100" transform="rotate(120)" overflow="visible" />
          </g>
        </g>

        <g className="center" transform={`scale(${bladeWidthScale})`}>
          <circle className="hub-circle" cx="0" cy="0" r="10" />
          <polygon className="hub-shine" points="0,0 -10,5 0,12.5 " transform="rotate(180)" mask="url(#blade-center)" />
          <circle className="hub-center" cx="0" cy="0" r="5" />
        </g>
      </svg>
    );
  }
}

export default TurbineBlades;
