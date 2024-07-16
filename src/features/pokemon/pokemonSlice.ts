import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/axios"
import { snackActions } from "../../utils/SnackbarUtils"

export interface Pokemon {
  name: string
  url: string
}

interface FetchPokemonsResponse {
  results: Pokemon[]
}

interface PokemonState {
  pokemons: Pokemon[]
  status: "idle" | "loading" | "failed" | "success"
  error: string | null
  deck: string[]
  query: string
}

const initialState: PokemonState = {
  pokemons: [],
  status: "idle",
  error: null,
  deck: [],
  query: "",
}

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response =
      await axios.get<FetchPokemonsResponse>("/pokemon?limit=150")
    return response.data.results
  },
)

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    selectPokemon: (state, action) => {
      if (state.deck.length >= 6) {
        snackActions.error("Solo puedes seleccionar 6 pokemones")
        return
      }

      if (!state.deck.includes(action.payload)) {
        state.deck.push(action.payload)
      }
    },
    deselectPokemon: (state, action) => {
      state.deck = state.deck.filter(name => name !== action.payload)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "success"
        state.pokemons = action.payload
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })
  },
  selectors: {
    selectAllPokemons: state => state.pokemons,
    selectPokemonStatus: state => state.status,
    selectPokemonError: state => state.error,
    selectDeck: state => state.deck,
    selectQuery: state => state.query,
  },
})

export const { selectPokemon, deselectPokemon, setQuery } = pokemonSlice.actions
export const {
  selectAllPokemons,
  selectPokemonStatus,
  selectPokemonError,
  selectDeck,
  selectQuery,
} = pokemonSlice.selectors

export default pokemonSlice
