export interface EventResponse {
  id: number;
  name: string;
  region: string;
  season: number;
  start: Date;
  end: Date;
  gameId: number;
  teamIds: number[];
}
