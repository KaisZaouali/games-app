import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getGamesByPlaytimeAsync, getGamesByPlayerAsync } from "./gamesAPI";

export interface Game {
  game: string;
  genre: string;
  platforms: string[];
  totalPlayTime: number;
  totalPlayers: number;
}

export interface GamesState {
  gamesByPlaytime: Game[];
  gamesByPlayer: Game[];
  loading: {
    getGamesByPlaytimeLoading: boolean;
    getGamesByPlayerLoading: boolean;
  };
  errors: {
    getGamesByPlaytimeErrors: string | undefined;
    getGamesByPlayerErrors: string | undefined;
  };
}

export const initialState: GamesState = {
  gamesByPlaytime: [],
  gamesByPlayer: [],
  loading: {
    getGamesByPlaytimeLoading: false,
    getGamesByPlayerLoading: false,
  },
  errors: {
    getGamesByPlaytimeErrors: undefined,
    getGamesByPlayerErrors: undefined,
  },
};

export const getGamesByPlaytime = createAsyncThunk(
  "games/getGamesByPlaytime",
  getGamesByPlaytimeAsync
);

export const getGamesByPlayer = createAsyncThunk(
  "games/getGamesByPlayer",
  getGamesByPlayerAsync
);

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.errors = initialState.errors;
    },
  },
  extraReducers: (builder) => {
    builder
      // get games by playtime
      .addCase(getGamesByPlaytime.pending, (state) => {
        state.loading.getGamesByPlaytimeLoading = true;
      })
      .addCase(getGamesByPlaytime.fulfilled, (state, action) => {
        state.gamesByPlaytime = action.payload;
        state.loading.getGamesByPlaytimeLoading = false;
      })
      .addCase(getGamesByPlaytime.rejected, (state, action) => {
        state.errors.getGamesByPlaytimeErrors = action.error.message;
        state.loading.getGamesByPlaytimeLoading = false;
      })
      // get games by player
      .addCase(getGamesByPlayer.pending, (state) => {
        state.loading.getGamesByPlayerLoading = true;
      })
      .addCase(getGamesByPlayer.fulfilled, (state, action) => {
        state.gamesByPlayer = action.payload;
        state.loading.getGamesByPlayerLoading = false;
      })
      .addCase(getGamesByPlayer.rejected, (state, action) => {
        state.errors.getGamesByPlayerErrors = action.error.message;
        state.loading.getGamesByPlayerLoading = false;
      });
  },
});

export const { clearErrors } = gamesSlice.actions;

export const selectGamesStore = (state: RootState) => state.games;

export default gamesSlice.reducer;
