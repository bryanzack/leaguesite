import React from 'react';
import './PlayerMatch.css';
import versions from '../static/versions.json'; // update every patch
import { handleTimeSince, handleTimeLength } from '../helpers/handleTimestamps.js';

class PlayerMatch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    // date info
    const now = new Date(); // regular date
    const todayTimestamp = Math.round(now.getTime()); // epoch timestamp

    // game info
    let version = versions[0];
    let gameMode = this.props.gameData.gameMode;
    let gameDuration = this.props.gameData.gameDuration;
    let gameEndTimestamp = this.props.gameData.gameEndTimestamp;
    let timeSince = handleTimeSince(gameEndTimestamp, todayTimestamp);
    let timeLength = handleTimeLength(gameDuration);

    // player info
    let win = this.props.playerData.win;
    let championName = this.props.playerData.championName;
    let champIconURL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;

    

    return (
      <li className={win ? "match win" : "match lose"}>
        <div className="match-obj gameinfo">
          <>
            <li className={win ? "gamemode win" : "gamemode lose "}>{gameMode}</li>
          </>
          <>
            <li className="timesince">{timeSince}</li>
          </>
            <li className="didwin">{win ? "Victory" : "Defeat"}</li>
          <>
            <li className="timelength">{timeLength}</li>
          </>
        </div>
        <div className="match-obj champinfo">
          <img className="champimage" src={champIconURL} height="75" width="75" alt="test"/>
          
        </div>
      </li>
    );
  }
}

export default PlayerMatch;
