import React, { FunctionComponent } from "react";
import Pokemon from "../models/pokemon";
import formatType from "../utils/format-type";
import { Link } from "react-router-dom";

type Props = {
  pokemon: Pokemon;
};

const PokemonCard: FunctionComponent<Props> = ({ pokemon }) => {
  return (
    <div>
      <Link to={`${pokemon.pokedex_id}`}>
        <div className="card-top">
          <img
            src={pokemon.sprites.regular}
            alt={pokemon.name.fr}
            className="responsive-img"
          />
        </div>
        <div className="section">
          <h5 style={{ color: "white" }}>
            {pokemon.name.fr} <span>N°{pokemon.pokedex_id}</span>
          </h5>
          <div>
            {pokemon.types.map((type, index) => (
              <span key={index} className={formatType(type.name)}>
                {type.name}{" "}
                <img
                  src={type.image}
                  alt={type.name}
                  className="responsive-img"
                />
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
