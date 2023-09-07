import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import "./pokemon-card.css";
import formatType from "../utils/format-type";
import { useHistory } from "react-router-dom";

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
};

const PokemonCard: FunctionComponent<Props> = ({
  pokemon,
  borderColor = "#003060",
}) => {
  const [color, setColor] = useState<string>();
  const history = useHistory();

  const showBorder = () => {
    setColor(borderColor);
  };
  const hideBorder = () => {
    setColor("#f5f5f5");
  };

  const goToPokemon = (id: number) => {
    history.push(`/pokemons/${id}`);
  };

  return (
    <div
      className="col s6 m4"
      onClick={() => goToPokemon(pokemon.pokedexId)}
      onMouseEnter={showBorder}
      onMouseLeave={hideBorder}
    >
      <div className="card horizontal" style={{ borderColor: color, borderRadius: "5px" }}>
        <div className="card-image">
          <img src={pokemon.sprites.regular} alt={pokemon.sprites.regular} className="responsive-img"/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p className="right-align">n°{pokemon.pokedexId}</p>
            <div className="section">
              <h5>{pokemon.name.fr}</h5>
              <p>{pokemon.name.jp}</p>
            </div>
          </div>
            <div className="right-align">
              {pokemon &&
                pokemon.types &&
                pokemon.types.map((type) => (
                  <span key={type.name} className={formatType(type.name)}>
                    {type.name} <img src={type.image} alt={type.name} className="responsive-img" />
                  </span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
