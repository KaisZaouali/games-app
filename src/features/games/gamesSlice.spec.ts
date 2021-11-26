import gamesReducer, { clearErrors, initialState } from "./gamesSlice";

const game = {
  game: "Among Us",
  genre: "Multiplayer",
  platforms: ["PC", "Android"],
  totalPlayTime: 5000,
  totalPlayers: 1,
};

const errorMessage = "error";

const getGamesByPlaytime = () => ({
  pending: { type: "games/getGamesByPlaytime/pending" },
  fulfilled: { type: "games/getGamesByPlaytime/fulfilled", payload: [game] },
  rejected: {
    type: "games/getGamesByPlaytime/rejected",
    error: { message: errorMessage },
  },
});
const getGamesByPlayer = () => ({
  pending: { type: "games/getGamesByPlayer/pending" },
  fulfilled: { type: "games/getGamesByPlayer/fulfilled", payload: [game] },
  rejected: {
    type: "games/getGamesByPlayer/rejected",
    error: { message: errorMessage },
  },
});

describe("Games Reducer", () => {
  it("should handle initial state", () => {
    expect(gamesReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle get game list by playtime", () => {
    // pending state
    const pending = gamesReducer(initialState, getGamesByPlaytime().pending);
    expect(pending.loading.getGamesByPlaytimeLoading).toEqual(true);

    // fulfilled state
    const fulfilled = gamesReducer(
      {
        ...initialState,
        loading: { ...initialState.loading, getGamesByPlaytimeLoading: true },
      },
      getGamesByPlaytime().fulfilled
    );
    expect(fulfilled.gamesByPlaytime).toEqual([game]);
    expect(fulfilled.loading.getGamesByPlaytimeLoading).toEqual(false);

    // rejected state
    const rejected = gamesReducer(
      {
        ...initialState,
        loading: { ...initialState.loading, getGamesByPlaytimeLoading: true },
      },
      getGamesByPlaytime().rejected
    );
    expect(rejected.errors.getGamesByPlaytimeErrors).toEqual(errorMessage);
    expect(rejected.loading.getGamesByPlaytimeLoading).toEqual(false);
  });

  it("should handle get game list by players", () => {
    // pending state
    const pending = gamesReducer(initialState, getGamesByPlayer().pending);
    expect(pending.loading.getGamesByPlayerLoading).toEqual(true);

    // fulfilled state
    const fulfilled = gamesReducer(
      {
        ...initialState,
        loading: { ...initialState.loading, getGamesByPlayerLoading: true },
      },
      getGamesByPlayer().fulfilled
    );
    expect(fulfilled.gamesByPlayer).toEqual([game]);
    expect(fulfilled.loading.getGamesByPlayerLoading).toEqual(false);

    // rejected state
    const rejected = gamesReducer(
      {
        ...initialState,
        loading: { ...initialState.loading, getGamesByPlayerLoading: true },
      },
      getGamesByPlayer().rejected
    );
    expect(rejected.errors.getGamesByPlayerErrors).toEqual(errorMessage);
    expect(rejected.loading.getGamesByPlayerLoading).toEqual(false);
  });

  it("should handle clearErrors", () => {
    const actual = gamesReducer(
      {
        ...initialState,
        errors: {
          ...initialState.errors,
          getGamesByPlayerErrors: errorMessage,
        },
      },
      clearErrors()
    );
    expect(actual.errors).toEqual(initialState.errors);
  });
});
