import React from 'react';
import './Searchbar.css';
import RegionBox from './RegionBox.js';

class Searchbar extends React.Component {
  render() {
    return (  
      <div className="inputbox">
        <input className={this.props.isInvalid ? "input active" : "input" } type="text" id="input" onKeyDown={(e) => {this.props.enter(e)}}/>
        <div className="regionmenu">
          menu
        </div>
      </div>
    );
  }
}

export default Searchbar;
