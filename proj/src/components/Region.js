import './Region.css';
import React from 'react';

class Region extends React.Component {
  constructor(props) {
    super(props);
    this.name = "";
    this.data = "";
    this.setActive = this.setActive.bind(this);
    this.state =
  }

  setActive() {
    console.log("clicked: ", this.props.data);
    this.setState({active: true});
  }
  render() {
    return (
      <div id={this.props.name} data={this.props.data} className="region" onClick={this.setActive}>
        {this.props.name}
      </div>
    );
  }
}


export default Region;
