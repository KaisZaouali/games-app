import React from "react";
import { Divider } from "antd";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getGamesByPlaytime,
  getGamesByPlayer,
  clearErrors,
  selectGamesStore,
} from "./gamesSlice";
import { useErrors } from "../../shared/hooks";
import GamesSection from "./GamesSection";
import { IQueryParams } from "../../shared/services";
import { PayloadAction } from "@reduxjs/toolkit";
import styles from "./Games.module.css";

const Games: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { errors, gamesByPlayer, gamesByPlaytime, loading } =
    useAppSelector(selectGamesStore);
  useErrors(errors, () => dispatch(clearErrors()));

  const onSearchByPlaytime = React.useCallback(
    (queryParams: IQueryParams): Promise<PayloadAction<any>> =>
      dispatch(getGamesByPlaytime(queryParams)),
    [dispatch]
  );
  const onSearchByPlayer = React.useCallback(
    (queryParams: IQueryParams): Promise<PayloadAction<any>> =>
      dispatch(getGamesByPlayer(queryParams)),
    [dispatch]
  );

  return (
    <div className={styles.root}>
      <GamesSection
        title="Top games by playtime"
        gameList={gamesByPlaytime}
        loading={loading.getGamesByPlaytimeLoading}
        onSearch={onSearchByPlaytime}
        additionalColumns={[
          {
            title: "Total play time",
            dataIndex: "totalPlayTime",
            key: "totalPlayTime",
          },
        ]}
      />
      <Divider />
      <GamesSection
        title="Top games by player"
        gameList={gamesByPlayer}
        loading={loading.getGamesByPlayerLoading}
        onSearch={onSearchByPlayer}
        additionalColumns={[
          {
            title: "Number of players",
            dataIndex: "totalPlayers",
            key: "totalPlayers",
          },
        ]}
      />
    </div>
  );
};

export default Games;
