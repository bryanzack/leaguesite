import './Region.css';
import React from 'react';

class Region extends React.Component {
  constructor(props) {
    super(props);
    this.name = "";
    this.data = "";
    this.setActive = this.setActive.bind(this);
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
/*
function Region(props) {

  function setActive(event) {
    console.log("clicked: " + event.currentTarget.id);
    var element = document.querySelector('.regionbox'); 
    var children = element.children;
    for (var i=0; i < children.length; i++) {
      var child = children[i];
      if (child.id === event.currentTarget.id) {
        child.classList.add("active");
      }
      else {
        child.classList.remove("active");
      }
    }
  }

  return (
    <div id={props.name} data={props.data} className="region" onClick={setActive}>
      {props.name}
    </div>
  );
}

export { Region };
*/
