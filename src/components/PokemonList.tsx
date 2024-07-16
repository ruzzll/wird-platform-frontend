import { Box, Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import type { Pokemon } from "../features/pokemon/pokemonSlice"
import PokemonCard from "./PokemonCard"
import Search from "./Search"

const Header = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: theme.zIndex.appBar,
  background: theme.palette.background.paper,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  marginRight: theme.spacing(-1),
  marginLeft: theme.spacing(-1),
}))

type PokemonListProps = {
  pokemons: Pokemon[]
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <Box px={{ md: 10, sm: 6, xs: 1 }}>
      <Header>
        <Search />
      </Header>
      <Grid container spacing={2}>
        {pokemons.map(pokemon => (
          <Grid item key={pokemon.name} xs={6} sm={6} md={4} lg={3}>
            <PokemonCard name={pokemon.name} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default PokemonList
