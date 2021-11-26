import axios, { AxiosResponse } from "axios";
import {
  baseApiUrl,
  gamesService,
  addQueryParams,
  IQueryParams,
} from "../../shared/services";

export const getGamesByPlaytimeAsync = async (
  queryParams: IQueryParams
): Promise<AxiosResponse["data"]> => {
  const result = await axios.get(
    baseApiUrl + gamesService.getGamesByPlaytime + addQueryParams(queryParams)
  );
  return result.data;
};

export const getGamesByPlayerAsync = async (
  queryParams: IQueryParams
): Promise<AxiosResponse["data"]> => {
  const result = await axios.get(
    baseApiUrl + gamesService.getGamesByPlayer + addQueryParams(queryParams)
  );
  return result.data;
};
