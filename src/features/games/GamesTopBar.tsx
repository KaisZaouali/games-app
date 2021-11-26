import React from "react";
import GameListTitle from "./GameListTitle";
import GameSearch from "./GameSearch";
import styles from "../../shared/Flex.module.css";

interface IGamesTopBar {
  setSearchByGenre: React.Dispatch<React.SetStateAction<string>>;
  setSearchByPlatform: React.Dispatch<React.SetStateAction<string>>;
  searchByGenre: string;
  searchByPlatform: string;
  title: string;
  loading: boolean;
}

const GamesTopBar: React.FC<IGamesTopBar> = ({
  setSearchByGenre,
  setSearchByPlatform,
  searchByGenre,
  searchByPlatform,
  title,
  loading,
}) => {
  return (
    <div className={styles.flexBetween}>
      <GameListTitle title={title} />
      <GameSearch
        onSearch={setSearchByGenre}
        searchText={searchByGenre}
        loading={loading}
        placeholder="Search genre"
        key="genre"
      />
      <GameSearch
        onSearch={setSearchByPlatform}
        searchText={searchByPlatform}
        loading={loading}
        placeholder="Search platform"
        key="platform"
      />
    </div>
  );
};

export default React.memo(GamesTopBar);
