// This helper function exists due to a discrepency in naming for a specific champion
//
//
// https://github.com/RiotGames/developer-relations/issues/693

function handleChampionName(name) {
  if (name === "FiddleSticks") {
    name = "Fiddlesticks";
  }
  return name;
}
export { handleChampionName }
