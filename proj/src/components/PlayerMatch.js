import React from 'react';
import './PlayerMatch.css';

// ensures all data is up to date with most recent version, needs updated every time a league patch is released
import versions from '../static/versions.json';


// helpers
import { handleTimeSince, handleTimeLength } from '../helpers/handleTimestamps.js';
import { handleSummonerKey } from '../helpers/handleSummonerKey.js';
import { handleRuneSecondary, handleRunePrimary } from '../helpers/handleRuneId.js';
import { handleItemIds } from '../helpers/handleItemIds.js';

class PlayerMatch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    /////////////////
    // date info
    /////////////////
    const now = new Date(); // regular date
    const todayTimestamp = Math.round(now.getTime()); // epoch timestamp

    /////////////////
    // game data
    /////////////////
    let version = versions[0];
    let gameMode = this.props.gameData.gameMode;
    let gameDuration = this.props.gameData.gameDuration;
    let gameEndTimestamp = this.props.gameData.gameEndTimestamp;
    let timeSince = handleTimeSince(gameEndTimestamp, todayTimestamp);
    let timeLength = handleTimeLength(gameDuration);

    /////////////////
    // player data
    /////////////////
    //  champ info
    let win = this.props.playerData.win;
    let championName = this.props.playerData.championName;
    let champIconURL = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
    let champLevel =  this.props.playerData.champLevel;
    
    // summoner spell info
    let summoner1Id = handleSummonerKey(this.props.playerData.summoner1Id);
    let summoner2Id = handleSummonerKey(this.props.playerData.summoner2Id);
    let summoner1URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summoner1Id}.png`;
    let summoner2URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summoner2Id}.png`
    
    // rune info
    let runePrimary = this.props.playerData.perks.styles[0].selections[0].perk;
    let runePrimaryPath = handleRunePrimary(runePrimary);
    let runePrimaryURL = `https://ddragon.leagueoflegends.com/cdn/img/${runePrimaryPath}`;
    let runeSecondary = this.props.playerData.perks.styles[1].style;
    let runeSecondaryPath = handleRuneSecondary(runeSecondary);
    let runeSecondaryURL = `https://ddragon.leagueoflegends.com/cdn/img/${runeSecondaryPath}`;    
    
    // item info
    let item0 = this.props.playerData.item0
    let item1 = this.props.playerData.item1
    let item2 = this.props.playerData.item2
    let item3 = this.props.playerData.item3
    let item4 = this.props.playerData.item4
    let item5 = this.props.playerData.item5
    let item6 = this.props.playerData.item6

    // score info
    let kills = this.props.playerData.kills
    let deaths = this.props.playerData.deaths
    let assists = this.props.playerData.assists
    
    // figure out how to keep this updated with version decimal discrepency 
    let itemBaseURL = `https://raw.communitydragon.org/12.22/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/`;

    let items = [
      this.props.playerData.item0,
      this.props.playerData.item1,
      this.props.playerData.item2,
      this.props.playerData.item3,
      this.props.playerData.item4,
      this.props.playerData.item5,
      this.props.playerData.item6
    ]

    let itemsJson = handleItemIds(items);

    return (
      <li className={win ? "match win" : "match lose"}>
        <div className="match-obj gameinfo">
            <li className={win ? "gamemode win" : "gamemode lose "}>{gameMode}</li>
            <li className="timesince">{timeSince}</li>
            <li className="didwin">{win ? "Victory" : "Defeat"}</li>
            <li className="timelength">{timeLength}</li>
        </div>
        <div className="match-obj champinfo">
          <div className="summoner-info">
            <img className="champimage" src={champIconURL} height="75" width="75" alt="test"/>
            <div className="champlevel">
              {champLevel}
            </div>
            <div className="runes-sums">
              <div className="sums">
                <img className="summonerSpell" src={summoner1URL} height="27" width="27" alt="test"/>
                <img className="summonerSpell" src={summoner2URL} height="27" width="27" alt="test"/>
              </div>
              <div className="runes">
                <img className="runePrimary" src={runePrimaryURL} height="27" width="27" alt="test"/>
                <img className="runeSecondary" src={runeSecondaryURL} height="25" width="25" alt="test"/>
              </div>
            </div>
            <div className="kda">
              <div className="top-kda">
                <p className="kda-num">{kills}</p>
                <p className="slash">/</p>
                <p className="kda-deaths">{deaths}</p>
                <p className="slash">/</p>
                <p className="kda-num">{assists}</p> 
              </div>
              <div className="bot-kda">
                {((kills+assists)/deaths).toFixed(2)}:1 KDA
              </div>
            </div>
          </div>
          <div className="user-items">
            {Object.keys(itemsJson).map((key) =>
              (itemsJson[key] != 0)
                ? <img className="item" key={key} src={itemsJson[key]} height="25" width="25" alt="test"/>
                : <div className={win ? "null-item-win" : "null-item-lose"} key={key}/>
            )}
          </div>
        </div>
      </li>
    );
  }
}

export default PlayerMatch;
