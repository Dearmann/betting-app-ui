import { MatchItem } from "./match-item";

export interface Event {
  id: number;
  name: string;
  region: string;
  season: number;
  start: Date;
  end: Date;
  gameId: number;
  teamIds: number[];
  matches?: MatchItem | null;
}
