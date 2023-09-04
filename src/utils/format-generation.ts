const formatGeneration = (generation: number): string => {
  let generationName: string;

  switch (generation) {
    case 1:
      generationName = "Kanto";
      break;
    case 2:
      generationName = "Johto";
      break;
    case 3:
      generationName = "Hoenn";
      break;
    case 4:
      generationName = "Sinnoh";
      break;
    case 5:
      generationName = "Unys";
      break;
    case 6:
      generationName = "Kalos";
      break;
    case 7:
      generationName = "Alola";
      break;
    case 8:
      generationName = "Galar";
      break;
    case 9:
      generationName = "Paldea";
      break;
    default:
      generationName = "Unknown"; 
    }
  
    return `${generationName}`;
};

export default formatGeneration;
