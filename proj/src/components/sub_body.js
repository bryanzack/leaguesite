import React from 'react';
import './sub_body.css';
import PlayerMatch from './PlayerMatch.js';
import Searchbar from './Searchbar.js';

class sub_body extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleInvalidEntry = this.handleInvalidEntry.bind(this);
    this.handleValidEntry = this.handleValidEntry.bind(this);
    this.state = {
      isLoading: false,
      isInvalid: false, 
      apiCode: null,
      serverCode: null,
      noMatches: false,
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
    this.setState({isLoading: true});
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
            let noMatches = false;
            if (apiResponseCode === 200) {
              let playerData = {};
              let gameData = {};
              console.log(gameData);
              console.log(result["puuid"]);
              console.log(result["matches"]);
              // if the first match is not found, display no matches found
              if (result["matches"][0]["status"] !== undefined &&
                result["matches"][0]["status"]["status_code"] === 404) {
                console.log("NO MATCHES!");
                noMatches = true; 
                // if the first match is found, add matches to json if they exist
              } else {
                for (let i = 0; i < result["matches"].length; i++) {
                  if (result["matches"][i]["status"] === undefined) {
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
                  } else {
                    console.log("no more moatches");
                  }
                }
              }

              console.log(playerData);
              console.log(gameData);
              document.getElementById("input").value = name;
              this.setState({
                isLoading: false,
                apiCode: 200, 
                serverCode: 200, 
                noMatches: noMatches,
                matches: {
                  "playerData": playerData,
                  "gameData": gameData
                }});

            }
            else if (apiResponseCode === 404) {
              this.setState({
                apiCode: 404, 
                serverCode: 200, 
                isLoading: false
              });
            }
          });
        } 
        else if (serverResponseCode >= 400 && serverResponseCode <= 499) {
            this.setState({
              isLoading: false,
              serverCode: 404
            });
          response.json().then(result => {
            console.log(response);
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
    if (this.state.isLoading) {
      return (
        <>
          <Searchbar
            enter={this.handleEnter}
            isInvalid={this.state.isInvalid}
          />
          <div className="matches">
            <h1>Loading...</h1>
          </div>
        </>
      )
    }
    else {
      if (this.state.serverCode === 404 || this.state.serverCode === null) {
        return ( 
          <Searchbar
            enter={this.handleEnter}
            isInvalid={this.state.isInvalid}
          />
        )
      }
      else if (this.state.serverCode === 200) {
        if (this.state.apiCode === 200) {
          if (!this.state.noMatches) {
            return (
              <>
                <Searchbar 
                  enter={this.handleEnter}
                  isInvalid={this.state.isInvalid}
                />
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
              </>
            )
          } else {
            return (
              <>
                <Searchbar 
                  enter={this.handleEnter}
                  isInvalid={this.state.isInvalid}
                />
                <div className="matches">
                  <h1>No matches found...</h1>
                </div>
              </>
            )
          }
        }
        else if (this.state.apiCode === 404 ) {
          return (
              <>
                <Searchbar 
                  enter={this.handleEnter}
                  isInvalid={this.state.isInvalid}
                />
                <div className="matches">
                  <h1>Summoner not found...</h1>
                </div>
              </>
          )
        }
      }
    }
  }
}

export default sub_body;
