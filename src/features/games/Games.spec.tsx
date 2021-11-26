import { mount } from "enzyme";
import { Provider } from "react-redux";
import Games from "./Games";
import gamesReducer, { initialState } from "./gamesSlice";
import { configureStore } from "@reduxjs/toolkit";

Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
  })),
});

describe("Games Component with empty lists", () => {
  const store = configureStore({
    reducer: {
      games: gamesReducer,
    },
  });
  let container = mount(
    <Provider store={store}>
      <Games />
    </Provider>
  );

  it("should component be rendering", () => {
    expect(container.find("Games")?.length).toEqual(1);
  });

  it("should component be rendering a divider", () => {
    expect(container.find("Divider")?.length).toEqual(1);
  });

  it("should component be rendering two lists ", () => {
    expect(container.find("Memo(GamesSection)")?.length).toEqual(2);
  });

  it("should component be rendering two empty lists ", () => {
    expect(container.text().match(/No\sData/g)?.length).toEqual(2);
  });
});

describe("Games Component with a game in both game list", () => {
  const game = {
    game: "Among Us",
    genre: "Multiplayer",
    platforms: ["PC", "Android"],
    totalPlayTime: 5000,
    totalPlayers: 1,
  };
  const gamesStore = configureStore({
    reducer: {
      games: gamesReducer,
    },
  });
  const store = {
    ...gamesStore,
    getState: () => ({
      games: {
        ...initialState,
        gamesByPlaytime: [game],
        gamesByPlayer: [game],
      },
    }),
  };

  let container = mount(
    <Provider store={store}>
      <Games />
    </Provider>
  );

  it("should component be rendering two lists ", () => {
    expect(container.find("Memo(GamesSection)").length).toEqual(2);
  });

  it("should component be rendering no empty lists ", () => {
    expect(container.text().match(/No\sData/g)).toEqual(null);
  });
});
