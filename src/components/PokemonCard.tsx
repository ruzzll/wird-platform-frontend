import { Link } from "react-router-dom"
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import {
  deselectPokemon,
  selectDeck,
  selectPokemon,
} from "../features/pokemon/pokemonSlice"

const StyledCard = styled(Card)({
  position: "relative",
})

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}))

type PokemonCardProps = {
  name: string
}

const PokemonCard = ({ name }: PokemonCardProps) => {
  const dispatch = useAppDispatch()
  const deck = useAppSelector(selectDeck)

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(selectPokemon(name))
  }

  const handleDeselect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    dispatch(deselectPokemon(name))
  }

  return (
    <StyledCard>
      <CardActionArea component={Link} to={`/${name}`}>
        <CardMedia
          component="img"
          height="140"
          // image={`https://img.pokemondb.net/artwork/${name}.jpg`}
          // image={`https://img.pokemondb.net/sprites/black-white/anim/normal/${name}.gif`}
          image={`https://img.pokemondb.net/artwork/avif/${name}.avif`}
          alt={name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      {deck.includes(name) ? (
        <StyledFab size="small" color="error" onClick={handleDeselect}>
          <DeleteIcon />
        </StyledFab>
      ) : (
        <StyledFab size="small" color="primary" onClick={handleSelect}>
          <AddIcon />
        </StyledFab>
      )}
    </StyledCard>
  )
}

export default PokemonCard
