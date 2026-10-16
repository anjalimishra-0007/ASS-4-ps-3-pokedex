import PokemonDetails from "./components/PokemonDetails";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import PokemonList from "./components/PokemonList";
import "./App.css";

function Home() {
  return (
    <section className="hero">
      <p className="hero-label">YOUR POKÉMON WORLD</p>

      <h1>Discover Your Favourite Pokémon</h1>

      <p className="hero-description">
        Explore Pokémon, learn about their abilities,
        and discover their stats.
      </p>

      <Link to="/pokemon" className="open-button">
        Open Pokédex →
      </Link>
    </section>
  );
}

function NotFound() {
  return (
    <div className="status">
      <h1>404 - Page Not Found</h1>
      <Link to="/" className="details-button">
        Go Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="*" element={<NotFound />} />
        <Route
  path="/pokemon/:name"
  element={<PokemonDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
