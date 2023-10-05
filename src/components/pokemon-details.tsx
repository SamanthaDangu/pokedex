import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import "./pokemon-details.css";
import formatType from "../utils/format-type";
import formatGeneration from "../utils/format-generation";
import { Link } from "react-router-dom";

type Props = {
  pokemon: Pokemon;
  pokemonPrev: Pokemon | null;
  pokemonNext: Pokemon | null;
};

const PokemonDetails: FunctionComponent<Props> = ({
  pokemon,
  pokemonPrev,
  pokemonNext,
}) => {
  const [isShiny, setIsShiny] = useState<boolean>();
  const toggleShiny = () => {
    setIsShiny((prevIsShiny) => !prevIsShiny);
  };

  return (
    <div
      className="card col s12"
      style={{
        borderRadius: "2%"
      }}
    >
      <div
        className="col s12 buttons"
        style={{
          padding: "0px",
          marginTop: "16px",
          marginBottom: "16px",
        }}
      >
        {pokemonPrev && (
          <Link
            to={`/pokemons/${pokemonPrev.pokedexId}`}
            className="button col s5 previous left-align"
          >
            <h6 className="button__text">
              {pokemonPrev.name.fr} <span>N°{pokemonPrev.pokedexId}</span>
            </h6>
          </Link>
        )}
        <div className="col s2 "></div>
        {pokemonNext && (
          <Link
            to={`/pokemons/${pokemonNext.pokedexId}`}
            className="button col s5 next right-align"
          >
            <h6 className="button__text">
              {pokemonNext.name.fr} <span>N°{pokemonNext.pokedexId}</span>
            </h6>
          </Link>
        )}
      </div>
      <h2
        className="center"
        style={{
          borderBottom: "3px solid #003060",
          margin: "30px",
          paddingBottom: "16px",
          fontSize: "3rem"
        }}
      >
        {pokemon.name.fr}{" "}
        <span style={{ color: "#616161" }}>N°{pokemon.pokedexId}</span>
      </h2>
      <div className="section">
        {/* Bloc haut gauche */}
        <div className="col s12 m6">
          <div className="card-image">
            <img
              src={isShiny ? pokemon.sprites.shiny : pokemon.sprites.regular}
              alt={pokemon.name.fr}
              style={{ width: "400px", margin: "0 auto" }}
              className="responsive-img"
            />
          </div>
          {pokemon.sprites.shiny && (
            <div className="right-align">
              <button
                onClick={toggleShiny}
                className="btn right-align"
                style={{ backgroundColor: "#2575bb" }}
              >
                Shiny
              </button>
            </div>
          )}

          <section className="section">
            <h5 className="center">Stats de base</h5>
            <div className="row">
              <div className="col s6" style={{ paddingRight: "0" }}>
                <table className="bordered striped">
                  <tbody>
                    <tr>
                      <td className="right-align">PV</td>
                      <td className="center">
                        <strong>{pokemon.stats.hp}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="right-align">Attaque</td>
                      <td className="center">
                        <strong>{pokemon.stats.atk}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="right-align">Défense</td>
                      <td className="center">
                        <strong>{pokemon.stats.def}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col s6" style={{ paddingLeft: "0" }}>
                <table className="bordered striped">
                  <tbody>
                    <tr>
                      <td className="right-align">Attaque Spé</td>
                      <td className="center">
                        <strong>{pokemon.stats.spe_atk}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="right-align">Défense Spé</td>
                      <td className="center">
                        <strong>{pokemon.stats.spe_def}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="right-align">Vitesse</td>
                      <td className="center">
                        <strong>{pokemon.stats.vit}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
        {/* Bloc haut droite */}
        <div className="row">
          <div className="col s12 m6" style={{ paddingLeft: "30px" }}>
            <section
              className="section col s12"
              style={{
                backgroundColor: "#2575bb",
                borderRadius: "10px",
                color: "white",
                padding: "0px"
              }}
            >
              <div className="col s12 m6" style={{padding: "0px"}}>
                <h5>Taille</h5>
                <p>{pokemon.height}</p>
                <h5>Poids</h5>
                <p>{pokemon.weight}</p>
                <h5>Sexe</h5>
                <p>
                  {pokemon.sexe === null && (
                    <i className="material-icons">close</i>
                  )}
                  {pokemon.sexe && pokemon.sexe.male >= 1 && (
                    <i className="material-icons">male</i>
                  )}
                  {pokemon.sexe && pokemon.sexe.female >= 1 && (
                    <i className="material-icons">female</i>
                  )}
                </p>
              </div>
              <div className="col s12 m6" style={{padding: "0px"}}>
                <h5>Catégorie</h5>
                <p>{pokemon.category}</p>
                <h5>Talent</h5>
                <p>
                  {pokemon.talents.map((talent, index) => (
                    <span key={index}>{talent.name} </span>
                  ))}
                </p>
                <h5>Forme régionale</h5>
                <p>
                  {pokemon.forme && pokemon.forme[0]
                    ? Object.values(pokemon.forme[0])[0]
                    : "Non"}
                </p>
              </div>
            </section>
            <section className="section col s12">
              <h5>Région</h5>
              <p>{formatGeneration(pokemon.generation)}</p>
              <h5>Type(s)</h5>
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
              <h5>Faiblesse(s)</h5>
              <div className="row">
                {pokemon.resistances.map((resistance, index) =>
                  resistance.multiplier === 2 ? (
                    <div
                      key={index}
                      className={`col s12 m6 l3 center ${formatType(
                        resistance.name
                      )}`}
                    >
                      {resistance.name}
                    </div>
                  ) : null
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
