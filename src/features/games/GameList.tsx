import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";
import { Game } from "./gamesSlice";

interface IGamesList {
  gameList: Game[];
  loading: boolean;
  additionalColumns: ColumnsType<Game>;
}

const GameList: React.FC<IGamesList> = ({
  gameList,
  loading,
  additionalColumns,
}) => {
  const columns = [
    {
      title: "Game",
      dataIndex: "game",
      key: "game",
    },
    {
      title: "Platforms",
      dataIndex: "platforms",
      key: "platforms",
      render: (platforms: string[]): string => platforms.join(", "),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    ...additionalColumns,
  ];
  return (
    <Table
      columns={columns}
      dataSource={gameList}
      loading={loading}
      rowKey={(row) => row.game}
    />
  );
};

export default React.memo(GameList);
