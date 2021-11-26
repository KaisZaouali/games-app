import { Typography } from "antd";
import React from "react";
import styles from "./Games.module.css";

interface IGameListTitle {
  title: string;
}

const GameListTitle: React.FC<IGameListTitle> = ({ title }) => {
  return (
    <Typography.Title level={3} className={styles.title}>
      {title}
    </Typography.Title>
  );
};

export default React.memo(GameListTitle);
