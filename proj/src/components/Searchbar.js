import React from 'react';
import './Searchbar.css';
import RegionBox from './RegionBox.js';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isMenuVisible: true
    }
  }

  handleClick() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    })
  }

  render() {
    return (  
      <>
        <div className="inputbox">
          <input className={this.props.isInvalid ? "input active" : "input" } type="text" id="input" onKeyDown={(e) => {this.props.enter(e)}}/>
        </div>
        <RegionBox/>
      </>
    );
  }
}

export default Searchbar;
