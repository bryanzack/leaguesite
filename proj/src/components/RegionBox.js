import './RegionBox.css';
import React, { useState, useEffect, Component } from 'react';
class Region extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className={this.props.status ? "item active" : "item"} onClick={this.props.click}>
        {this.props.name}
      </li>
    );
  }
}


const regions = ["na1", "euw1", "eun1", "kr", "br1", "jp1", "ru", "oc1", "tr1", "lan1", "la2"];
class RegionBox extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {select: false};
  };
  
  componentDidMount() {
    console.log("initial render");
    this.setState({select: 0});
  };
  
  componentDidUpdate() {
    console.log("re-render!");
  }

  handleSelect(key) {
    console.log(regions[key]);
  };

  render() {
    return (
      <div className="regionbox">
        {regions.map((name, key) => (
          <Region 
            name={name} 
            status={this.state.select === key}
            key={key}
            click={() => this.setState({select: key})}
          />
        ))}
      </div>
    );
  }
}

export default RegionBox;
