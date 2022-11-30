function handleLargestMultikill(largest) {
  let resultText = "";
  switch(largest) {
    case 0:
    case 1:
      return 1;
    case 2:
      return "Double Kill";
    case 3:
      return "Triple Kill";
    case 5:
      return "Penta Kill";
  }
}

export { handleLargestMultikill }
