function handleSummonerKey(key) {
  let id;
  switch (key) {
    case 21: // barrier
      id = "SummonerBarrier";
      break;
    case 1: // cleanse
      id = "SummonerBoost";
      break;
    case 14: // ignite
      id = "SummonerDot";
      break;
    case 3: // exhaust
      id = "SummonerExhaust";
      break;
    case 4: // flash
      id = "SummonerFlash";
      break;
    case 6: // ghost
      id = "SummonerHaste";
      break;
    case 7: // heal
      id = "SummonerHeal";
      break;
    case 13: // clarity
      id = "SummonerMana";
      break;
    case 30: // poro recall?
      id = "SummonerPoroRecall";
      break;
    case 31: // poro toss
      id = "SummonerPoroThrow";
      break;
    case 11: // smite
      id = "SummonerSmite";
      break;
    case 39: // snowball urf
      id = "SummonerSnowURFSnowball_Mark";
      break;
    case 32: // snowball
      id = "SummonerSnowball";
      break;
    case 12: // teleport
      id = "SummonerTeleport";
      break;
    case 54: // placeholder
      id = "Summoner_UltBookPlaceholder";
      break;
    case 55: // smite placeholder
      id  = "Summoner_UltBookSmitePlaceholder";
      break;
  }
  return id;
}

export { handleSummonerKey };
