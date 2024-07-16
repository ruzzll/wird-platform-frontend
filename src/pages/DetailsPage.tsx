import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  fetchPokemon,
  selectPokemonDetails,
  selectPokemonDetailsError,
  selectPokemonDetailsStatus,
} from "../features/pokemonDetails/pokemonDetailsSlice"
import PokemonDetails from "../components/PokemonDetails"

const DetailsPage = () => {
  const dispatch = useAppDispatch()
  const { name } = useParams()
  const status = useAppSelector(selectPokemonDetailsStatus)
  const error = useAppSelector(selectPokemonDetailsError)
  const pokemon = useAppSelector(selectPokemonDetails)

  useEffect(() => {
    // if (status === 'idle') {
    const promise = dispatch(fetchPokemon(name as string))
    // return () => promise.abort(); // TODO: implement abort in production
    // }
  }, [name, dispatch])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "failed") {
    return <div>Error: {error}</div>
  }

  if (!pokemon) {
    return null
  }

  return <PokemonDetails pokemon={pokemon} />
}

export default DetailsPage
