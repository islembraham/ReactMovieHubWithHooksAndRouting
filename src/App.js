import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { data } from "./data";
import {  useState } from "react";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Search from "./Pages/Search/Search";
import { Container } from "@material-ui/core";
import TransitionsModal from "./components/ContentModal/ContentModal";

function App() {

  const [movies, setMovies] = useState(data);
  
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Container>
          <Switch>
            <Route
              path="/"
              render={() => <Movies movies={movies} setMovies={setMovies} />}
              exact
            />
            <Route
              path="/search"
              render={() => <Search movies={movies} setMovies={setMovies} />}
              exact
            />
            <Route
              path="/modal/:id"
              render={() => <TransitionsModal movies={movies} setMovies={setMovies}/>}
            /> 
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
