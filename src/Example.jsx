import React, { Component } from 'react';
import GradientSlider from './GradientSlider/Container';

export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [{ color: '#fff', position: 0 }, { color: '#ff0000', position: 70 }, { color: '#000', position: 100 }]
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(colors) {
    this.setState({
      colors,
    });
  }

  render() {
    const { onChange } = this;
    const { colors } = this.state;
    return (
      <div style={{ width: 300, margin: '50px auto'}}>
        <GradientSlider defaultValue={colors} onChange={onChange} />
      </div>
    );
  }
}
