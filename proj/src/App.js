import './App.css';
import SubBody from './/components/sub_body.js';
import React from 'react';

class App extends React.Component { 
  render() {
    return (
      <div className="App">
        <div className="header">
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
