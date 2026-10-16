
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Pokémon from the PokeAPI
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=50"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon. Please try again.");
        }

        const data = await response.json();
        setPokemon(data.results);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokémon by name
  const filteredPokemon = pokemon.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Loading message
  if (loading) {
    return <h2 className="status">Loading Pokémon...</h2>;
  }

  // Error message
  if (error) {
    return (
      <main className="pokemon-page">
        <h2 className="status">Error: {error}</h2>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="pokemon-page">
      <h1>Explore Pokémon</h1>
      <p>Discover your favourite Pokémon!</p>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="search-input"
      />

      {/* Pokémon cards */}
      <div className="pokemon-grid">
        {filteredPokemon.map((item) => (
          <PokemonCard
            key={item.name}
            name={item.name}
            url={item.url}
          />
        ))}
      </div>

      {/* Empty search results */}
      {filteredPokemon.length === 0 && (
        <p className="status">
          No Pokémon found. Try another name!
        </p>
      )}
    </main>
  );
}

export default PokemonList;

