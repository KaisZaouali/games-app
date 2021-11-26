// export const baseApiUrl: string = "http://localhost:3005/";
export const baseApiUrl: string = "api/";

export const gamesService: { [key: string]: string } = {
  getGamesByPlaytime: "games/playtime",
  getGamesByPlayer: "games/players",
};

export interface IQueryParams {
  genre?: string;
  platform?: string;
}

export const addQueryParams = (queryParams: IQueryParams): string => {
  const { genre, platform } = queryParams;
  let queryParamsUrl = "";
  if ((genre && genre !== "") || (platform && platform !== ""))
    queryParamsUrl += "?";
  if (genre && genre !== "") {
    queryParamsUrl += "genre=" + genre;
    if (platform && platform !== "") queryParamsUrl += "&";
  }
  if (platform && platform !== "") queryParamsUrl += "platform=" + platform;
  return queryParamsUrl;
};
