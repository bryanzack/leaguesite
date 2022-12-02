import React from 'react';
import './sub_body.css';
import RegionBox  from './RegionBox.js';
import PlayerMatch from './PlayerMatch.js';

class sub_body extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleInvalidEntry = this.handleInvalidEntry.bind(this);
    this.handleValidEntry = this.handleValidEntry.bind(this);
    this.state = {
      isInvalid: false, 
      apiCode: null,
      serverCode: null,
      matches: {
        playerData: {},
        gameData: {}
      }
    };
  }

  handleInvalidEntry() {
    this.setState({isInvalid: false});
    setTimeout(() => {
      this.setState({isInvalid: true});
    }, 10);
  }

  handleValidEntry(region, name) {
    //console.log(region);
    //console.log(name);
    fetch(`/users/${region}/${name}`)
      .then(response => {
        let serverResponseCode = response["status"];
        console.log("Connection to backend: : ", serverResponseCode);
        if (serverResponseCode >= 200 && serverResponseCode <= 299) {
          response.json().then(result => {
            let apiResponseCode = result["status"];
            //let array = result["matches"];
            console.log("Connection to Riot api: " + apiResponseCode);
            console.log(result);
            if (apiResponseCode === 200) {
              let playerData = {};
              let gameData = {};
              console.log(gameData);
              console.log(result["puuid"]);
              for (let i = 0; i < result["matches"].length; i++) {
                gameData[i] = {
                  "gameMode": result["matches"][i]["info"]["gameMode"],
                  "gameDuration": result["matches"][i]["info"]["gameDuration"],
                  "gameEndTimestamp": result["matches"][i]["info"]["gameEndTimestamp"],
                  "teams": result["matches"][i]["info"]["teams"],
                  "participants": result["matches"][i]["info"]["participants"]
                }
                for (let j = 0; j < 10; j++) {
                  if (result["puuid"] === result["matches"][i]["info"]["participants"][j]["puuid"]) {
                    playerData[i] = result["matches"][i]["info"]["participants"][j];
                  }
                }
              }
              console.log(playerData);
              console.log(gameData);
              this.setState({
                apiCode: 200, 
                serverCode: 200, 
                matches: {
                  "playerData": playerData,
                  "gameData": gameData
                }});

            }
            else if (apiResponseCode === 404) {
              this.setState({apiCode: 404, serverCode: 200});
            }
          });
        } 
        else if (serverResponseCode >= 400 && serverResponseCode <= 499) {
          response.json().then(result => {
            console.log(response);
            this.setState({serverCode: 404});
          });
        }
    });
  }

  handleEnter(event) {
    if (event.code === "Enter") {
      let name = document.getElementById("input").value;
      let region = document.querySelector(".item.active");
      if (!region || !name) {
        console.log("invalid name or region");
        this.handleInvalidEntry();
      } 
      else {
        this.handleValidEntry(region.innerText, name);
      }
    }
  }
  
  render() {
    if (this.state.serverCode === 404 || this.state.serverCode === null) {
      return (
      <div className="inputbox">
        <input className={this.state.isInvalid ? "input active" : "input" } type="text" id="input" onKeyDown={this.handleEnter}>
        </input>
        <RegionBox />
      </div>
      )
    }
    else if (this.state.serverCode === 200) {
      if (this.state.apiCode === 200) {
        return (
          <div className="matches">
            {Object.keys(this.state.matches.playerData).map((key) =>
              <PlayerMatch
                className="match"
                key={key}
                playerData={this.state.matches.playerData[key]}
                gameData={this.state.matches.gameData[key]}
                handleClick={this.handleValidEntry}
              />)}
          </div>
        )
      }
      else if (this.state.apiCode === 404) {
        return (
          <h1>Summoner not found</h1>
        )
      }
    }
  }
}

export default sub_body;
