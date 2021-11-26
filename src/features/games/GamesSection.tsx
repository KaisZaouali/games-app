import React, { useEffect, useState } from "react";
import GamesTopBar from "./GamesTopBar";
import GameList from "./GameList";
import { Game } from "./gamesSlice";
import { ColumnsType } from "antd/lib/table";
import { IQueryParams } from "../../shared/services";
import { PayloadAction } from "@reduxjs/toolkit";

interface IGamesSection {
  onSearch: (queryParams: IQueryParams) => Promise<PayloadAction<any>>;
  title: string;
  loading: boolean;
  gameList: Game[];
  additionalColumns: ColumnsType<Game>;
}

const GamesSection: React.FC<IGamesSection> = ({
  onSearch,
  title,
  loading,
  gameList,
  additionalColumns,
}) => {
  const [searchByGenre, setSearchByGenre] = useState<string>("");
  const [searchByPlatform, setSearchByPlatform] = useState<string>("");
  useEffect(() => {
    onSearch({ genre: searchByGenre, platform: searchByPlatform });
  }, [onSearch, searchByGenre, searchByPlatform]);
  return (
    <>
      <GamesTopBar
        title={title}
        loading={loading}
        setSearchByGenre={setSearchByGenre}
        setSearchByPlatform={setSearchByPlatform}
        searchByGenre={searchByGenre}
        searchByPlatform={searchByPlatform}
      />
      <GameList
        gameList={gameList}
        loading={loading}
        additionalColumns={additionalColumns}
      />
    </>
  );
};

export default React.memo(GamesSection);
