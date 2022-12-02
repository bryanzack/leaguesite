import React from 'react';
import './Searchbar.css';
import RegionBox from './RegionBox.js';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (  
      <div className="inputbox">
        <input className={this.props.isInvalid ? "input active" : "input" } type="text" id="input" onKeyDown={(e) => {this.props.enter(e)}}>
        </input>
        <RegionBox />
      </div>
    );
  }
}

export default Searchbar;
