import items from '../static/items.json';
import versions from '../static/versions.json';

const version = versions[0];

function handleItemIds(itemArray) {
  // figure out how to update this consistently with decimal discrepency
  let baseURL = `https://raw.communitydragon.org/12.22/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/`;
  let resultJson = {}
  for (let i = 0; i < itemArray.length; i++) {
    if (itemArray[i] === 0)
      resultJson[i] = 0;
    for (const item in items) {
      if (items[item]["id"] === itemArray[i]) {
        // turns this: 	"/lol-game-data/assets/DATA/Items/Icons2D/3084_Overlords_Bloodmail.png"
        // into this : 	"3084_Overlords_Bloodmail.png"
        resultJson[i] = (baseURL + (items[item]["iconPath"]).replace(/^.+\//, '')).toLowerCase();  
        break;
      } 
    }
    
  }

  return resultJson;
}

export { handleItemIds }
