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
    let region = request.params.region;
    let regionCode;
    let name = request.params.name;
    let requestURL = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api_key}`;

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


    fetch(requestURL)
      .then(riotResponse => {
        //console.log(riotResponse);
        // The summoner exists
        console.log("does summoner exist: " + riotResponse["status"]);
        if (riotResponse["status"] <= 299 && riotResponse["status"] >= 200) {
          riotResponse.json().then(summonerData => {
            //console.log(summonerData);
            let puuid = summonerData['puuid'];
            let requestMatchURL = `https://${regionCode}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${api_key}`;
            //console.log(requestMatchURL);
            fetch(requestMatchURL).then(matchIds => {
              //console.log(matchIds);
              matchIds.json().then(matchIdsJSON => {
                let matchIds = {
                  "matches": matchIdsJSON
                }
                return matchIds;
              }).then(res => {
                 let urls = [];
                for (let i = 0; i < 10; i++) {
                  let contentsURL = `https://${regionCode}.api.riotgames.com/lol/match/v5/matches/${res["matches"][i]}?api_key=${api_key}`;
                  urls[i] = contentsURL; 
                }
                Promise.all(urls.map(u=>fetch(u)))
                  .then(responses => Promise.all(responses.map(r => r.json())))
                  .then(results => {
                    console.log(results);
                    let arr = [];
                    for (let i in results) {
                      arr.push([i, results[i]]); 
                    }
                    let json = {
                      "status": matchIds["status"],
                      "puuid": puuid,
                      "matches": results
                    }
                    response.json(json);
                })
              })
            });
          });
        }
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
