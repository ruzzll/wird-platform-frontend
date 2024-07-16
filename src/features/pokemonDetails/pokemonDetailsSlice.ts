import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../config/axios"

export interface Pokemon {
  id: string
  name: string
  order: number
  height: number
  weight: number
  types: {
    slot: number
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
    }
  }[]
}

interface PokemonState {
  pokemon?: Pokemon
  status: "idle" | "loading" | "failed" | "success"
  error: string | null
}

const initialState: PokemonState = {
  pokemon: undefined,
  status: "idle",
  error: null,
}

export const fetchPokemon = createAsyncThunk(
  "pokemonDetails/fetchPokemon",
  async (name: string) => {
    const response = await axios.get<Pokemon>(`/pokemon/${name}`)
    return response.data
  },
)

const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.status = "loading"
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "success"
        state.pokemon = action.payload
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message ?? null
      })
  },
  selectors: {
    selectPokemonDetails: state => state.pokemon,
    selectPokemonDetailsStatus: state => state.status,
    selectPokemonDetailsError: state => state.error,
  },
})

export const {
  selectPokemonDetails,
  selectPokemonDetailsStatus,
  selectPokemonDetailsError,
} = pokemonDetailsSlice.selectors

export default pokemonDetailsSlice
