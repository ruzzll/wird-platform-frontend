import { Box, Grid, Typography } from "@mui/material"
import { useAppSelector } from "../app/hooks"
import { selectDeck } from "../features/pokemon/pokemonSlice"
import PokemonCard from "./PokemonCard"

const DeckList = () => {
  const deck = useAppSelector(selectDeck)

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ textTransform: "uppercase", textAlign: "center", py: 8 }}
      >
        Listos para el combate
      </Typography>
      {deck.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          width="100%"
        >
          <Typography>Lista vacia, no hay ningun pokemon listo</Typography>
        </Box>
      )}
      <Grid container spacing={2}>
        {deck.map(name => (
          <Grid item key={name} xs={12} sm={6}>
            <PokemonCard name={name} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default DeckList
