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
                <p>bryan zack</p>
              </div>
              <div className="my-links">
                <a href="https://www.linkedin.com/in/bryan-zack-a7947820a/">
                  <img src={linkedin} width="50" height="50" alt="test"/>
                </a>
                <a href="https://github.com/bryanzack">
                  <img src={github} width="50" height="50" alt="test"/>
                </a>
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
