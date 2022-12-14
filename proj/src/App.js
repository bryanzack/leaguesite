import React from 'react';
import './App.css';
import SubBody from './/components/sub_body.js';
import linkedin from './/static/linkedin.png';
import github from './/static/github.png';
class App extends React.Component { 
  render() {
    return (
        <div className="App">
          <div className="header">
            <div className="header-container">
              <div className="my-name">
              </div>
            </div>
          </div>
            <div className="body">
              <SubBody className="subbody"/>
            </div>
          <div className="footer">
          </div>
        </div>
    );
  }
}

export default App;
