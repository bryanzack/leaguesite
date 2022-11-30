//const express = require('express');
import express from 'express';
const app = express();
import fetch  from 'node-fetch';

let api_key = "RGAPI-20d29057-f339-42fa-8681-a0a7fb4cd231";
  /*
  app.get('/', (request, response) => {
      response.send('<h1>Phonebook</h1>')
  })
  */

 
async function getResponse(url) {
  const response = await fetch(url);
  response.json().then(responseJSON => {
    return responseJSON;
  })
}

  app.get('/users/:region/:name', (request, response) => { 

    // takes initial information from front-end and generates a request url
    let region = request.params.region;
    let regionCode;
    let name = request.params.name;
    let requestURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api_key}`;

    // some endpoints (matchv5) serve groups of regions, this switch handles that
    switch(region) {
      case 'na1':
      case 'br':
      case 'la1':
      case 'la2':
        regionCode = 'americas';
        break;
      case 'kr':
      case 'jp1':
        regionCode = 'asia';
        break;
      case 'eun1':
      case 'euw1':
      case 'tr1':
      case 'ru':
        regionCode = 'europe';
        break;
      case 'oc1':
        regionCode = 'sea';
        break;
    }

    // initial fetch gathers identification info about the player.
    // requestCount: 1
    fetch(requestURL)
      .then(riotResponse => {
        
        // if the response comes back okay, the user exists
        if (riotResponse["status"] <= 299 && riotResponse["status"] >= 200) {
          riotResponse.json().then(summonerData => {

            // id information is parsed from initial request response
            // this is used to form a request url for the id of each of the users last 10 matches
            let puuid = summonerData['puuid'];
            let requestMatchURL = `https://${regionCode}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${api_key}`;
            let requestSummonerURL = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${leagueid}?api_key=${api_key}`;

            // second fetch gathers users last 10 match ids and puts them into json object
            // requestCount: 2
            fetch(requestMatchURL).then(matchIds => {
              matchIds.json().then(matchIdsJSON => {
                let matchIds = {
                  "matches": matchIdsJSON
                }
                return matchIds;
              }).then(res => {
                
                // iterates through the json of matchids and creates an array of urls to be requested based on regionCode, matchId, and api_key
                let urls = [];
                for (let i = 0; i < 10; i++) {
                  let contentsURL = `https://${regionCode}.api.riotgames.com/lol/match/v5/matches/${res["matches"][i]}?api_key=${api_key}`;
                  urls[i] = contentsURL; 
                }
                
                // all 10 request urls are fetched here
                // the final json to be sent is formed
                // requestCount: 12
                Promise.all(urls.map(u=>fetch(u)))
                  .then(responses => Promise.all(responses.map(r => r.json())))
                  .then(results => {
                    console.log(results);
                    let json = {
                      "status": matchIds["status"],
                      "puuid": puuid,
                      "matches": results
                    }

                    // send the response as json
                    response.json(json);
                })
              })
            });
          });
        }
        // if the response is not 2xx, send the status code as json response
        else {
          return response.json({"status": riotResponse["status"]});
        }
      }).catch(e => {
        console.log(e);
      });
  });

  const PORT = 5000
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  });
