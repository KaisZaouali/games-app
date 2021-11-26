import { Input } from "antd";
import React from "react";

interface IGameSearch {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  placeholder: string;
  searchText: string;
}

const GameSearch: React.FC<IGameSearch> = ({
  onSearch,
  loading,
  placeholder,
  searchText,
}) => {
  return (
    <Input.Search
      placeholder={placeholder}
      onSearch={onSearch}
      loading={loading}
      allowClear
      style={{ width: 200 }}
    />
  );
};

export default React.memo(GameSearch);
