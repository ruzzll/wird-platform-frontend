import { useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  fetchPokemons,
  selectAllPokemons,
  selectPokemonError,
  selectPokemonStatus,
  selectQuery,
} from "../features/pokemon/pokemonSlice"
import PokemonList from "../components/PokemonList"

const HomePage = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)
  const pokemons = useAppSelector(selectAllPokemons)
  const status = useAppSelector(selectPokemonStatus)
  const error = useAppSelector(selectPokemonError)

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => pokemon.name.startsWith(query))
  }, [pokemons, query])

  useEffect(() => {
    if (status === "idle") {
      const promise = dispatch(fetchPokemons())
      // return () => promise.abort() // TODO: implement abort in production
    }
  }, [status, dispatch])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  return <PokemonList pokemons={filteredPokemons} />
}

export default HomePage
