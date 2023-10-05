import React, { FunctionComponent } from "react";
import PokemonList from "./pages/pokemon-list";
import PokemonsDetail from "./pages/pokemon-detail";
import PageNotFound from "./pages/page-not-found";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

const App: FunctionComponent = () => {
  return (
    <Router>
      <div className="container center" style={{ boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)", padding: "32px", backgroundColor: "#fffde7"}}>
        <header
          className="center"
          style={{
            height: "auto",
          }}
        >
          <Link to="/" className="brand-logo center">
            <img
              className="responsive-img image-pokemon"
              src="./assets/International_Pokémon_logo.svg.png"
              alt="Pokémon_logo"
              style={{width: "80%"}}
            />
          </Link>
        </header>

        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/pokemons" component={PokemonList} />
          <Route path="/pokemons/:id" component={PokemonsDetail} />
          <Route component={PageNotFound} />
        </Switch>

        <footer>
          <p>
            © Pokémon est une marque déposée de The Pokémon Company
            International, Game Freak et Nintendo. Les images appartiennent à
            leur auteur respectif. Site fait par un fan.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
