import { TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectQuery, setQuery } from "../features/pokemon/pokemonSlice"

const Search = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value))
  }

  return (
    <TextField
      label="Que pokemon buscas?"
      value={query}
      onChange={handleSearch}
      fullWidth
    />
  )
}

export default Search
