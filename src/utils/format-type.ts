const formatType = (type: string): string => {
  let color: string;

  switch (type) {
    case "Feu":
      color = "red lighten-1";
      break;
    case "Eau":
      color = "blue lighten-1";
      break;
    case "Plante":
      color = "green lighten-1";
      break;
    case "Insecte":
      color = "lime darken-1";
      break;
    case "Normal":
      color = "grey lighten-3";
      break;
    case "Vol":
      color = "blue lighten-3";
      break;
    case "Poison":
      color = "deep-purple accent-1";
      break;
    case "Fée":
      color = "pink lighten-4";
      break;
    case "Psy":
      color = "pink accent-1";
      break;
    case "Électrik":
      color = "yellow lighten-2";
      break;
    case "Combat":
      color = "deep-orange";
      break;
    case "Sol":
      color = "brown lighten-2";
      break;
    case "Roche":
    color = "lime darken-2";
    break;
    case "Acier":
    color = "cyan darken-1";
    break;
    case "Glace":
    color = "light-blue lighten-4";
    break;
    case "Spectre":
    color = "brown lighten-3";
    break;
    case "Dragon":
    color = "indigo lighten-3";
    break;
    case "Ténèbres":
    color = "grey";
    break;
    default:
      color = "grey";
      break;
  }

  return `chip ${color}`;
};

export default formatType;
