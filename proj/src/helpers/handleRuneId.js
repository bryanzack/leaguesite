import runesReforged from '../static/runesReforged.json';
import perks from '../static/perks.json';

function handleRuneSecondary(id) {
  for (let toplevel in runesReforged) {
    if (runesReforged[toplevel].id === id)
      return runesReforged[toplevel].icon;
  }
}

function handleRunePrimary(id) {
  for (let toplevel in perks) {
    if (perks[toplevel].id === id) {
      let iconPath = perks[toplevel].iconPath;
      return iconPath.replace('/lol-game-data/assets/v1/', '');
    }
  }
}

export { handleRuneSecondary, handleRunePrimary }
