
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function PokemonDetails() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPokemon() {
      setLoading(true);
      setError("");
      setPokemon(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Pokémon not found! Please try again.");
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPokemon();

    return () => controller.abort();
  }, [name, retry]);

  // Loading state
  if (loading) {
    return (
      <main className="status">
        <h2>Loading Pokémon details...</h2>
      </main>
    );
  }

  // Error state with Try Again button
  if (error) {
    return (
      <main className="status">
        <h2>{error}</h2>

        <button
          className="retry-button"
          onClick={() => setRetry((count) => count + 1)}
        >
          Try Again
        </button>

        <br />

        <Link to="/pokemon" className="details-button">
          Back to Pokédex
        </Link>
      </main>
    );
  }

  if (!pokemon) {
    return null;
  }

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  function formatName(value) {
    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <main className="pokemon-details">
      <Link to="/pokemon" className="back-link">
        ← Back to Pokédex
      </Link>

      <div className="details-card">
        {image ? (
          <img
            src={image}
            alt={pokemon.name}
            className="details-image"
          />
        ) : (
          <p>Image not available</p>
        )}

        <p className="pokemon-number">
          #{String(pokemon.id).padStart(3, "0")}
        </p>

        <h1>{formatName(pokemon.name)}</h1>

        <div className="type-list">
          {pokemon.types.map((item) => (
            <span className="type-badge" key={item.type.name}>
              {formatName(item.type.name)}
            </span>
          ))}
        </div>

        <div className="pokemon-measurements">
          <p>
            <strong>Height</strong>
            <span>{pokemon.height / 10} m</span>
          </p>

          <p>
            <strong>Weight</strong>
            <span>{pokemon.weight / 10} kg</span>
          </p>
        </div>

        <h2>Base Stats</h2>

        <div className="stats-list">
          {pokemon.stats.map((item) => (
            <div className="stat-row" key={item.stat.name}>
              <span className="stat-name">
                {formatName(item.stat.name)}
              </span>

              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{
                    width: `${Math.min(
                      (item.base_stat / 255) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>

              <span className="stat-value">
                {item.base_stat}
              </span>
            </div>
          ))}
        </div>

        <button
          className="retry-button"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </main>
  );
}

export default PokemonDetails;

