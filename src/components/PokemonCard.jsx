
import { Link } from "react-router-dom";

function PokemonCard({ name, url }) {
  const number = url.split("/").filter(Boolean).pop();

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`;

  return (
    <div className="pokemon-card">
      <img
        src={imageUrl}
        alt={name}
        className="pokemon-image"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      <p className="pokemon-number">
        #{String(number).padStart(3, "0")}
      </p>

      <h2 className="pokemon-name">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h2>

      <Link
        to={`/pokemon/${name}`}
        className="details-button"
      >
        View Details →
      </Link>
    </div>
  );
}

export default PokemonCard;
