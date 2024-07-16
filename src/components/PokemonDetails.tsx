import { Box, Button, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { Pokemon } from "../features/pokemonDetails/pokemonDetailsSlice"
import {
  deselectPokemon,
  selectDeck,
  selectPokemon,
} from "../features/pokemon/pokemonSlice"
import PokemonTypeLabel from "./PokeminTypeLabel"

const statsMap: { [key: string]: string } = {
  hp: "HP",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque especial",
  "special-defense": "Defensa especial",
  speed: "Velocidad",
}

type PokemonDetailsProps = {
  pokemon: Pokemon
}

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const deck = useAppSelector(selectDeck)

  const handleSelect = () => {
    dispatch(selectPokemon(pokemon.name))
  }

  const handleDeselect = () => {
    dispatch(deselectPokemon(pokemon.name))
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <Box display="flex" justifyContent="space-between" p={{ lg: 10, md: 3 }}>
      <div>
        <Button
          variant="text"
          color="secondary"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Volver
        </Button>
      </div>
      <Box>
        <img
          src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
          alt={pokemon.name}
        />
        <Typography variant="h2" sx={{ textTransform: "capitalize" }}>
          {pokemon.name}
        </Typography>
        <p>Número: {pokemon.id}</p>
        <p>Altura: {pokemon.height}</p>
        <p>Peso: {pokemon.weight}</p>
        <h2>Tipos</h2>
        {pokemon.types.map(type => (
          <PokemonTypeLabel key={type.type.name} type={type.type.name} />
        ))}
        <h2>Estadísticas base</h2>
        <ul>
          {pokemon.stats.map(stat => (
            <li key={stat.stat.name}>
              {statsMap[stat.stat.name]}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </Box>
      <div>
        {deck.includes(pokemon.name) ? (
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleDeselect}
          >
            Remover de la lista
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleSelect}
          >
            Agregar a la lista
          </Button>
        )}
      </div>
    </Box>
  )
}

export default PokemonDetails
