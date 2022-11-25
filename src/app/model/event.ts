import { Match } from "./match";

export interface Event {
  id: number;
  name: string;
  region: string;
  season: number;
  start: Date;
  end: Date;
  gameId: number;
  teamIds: number[];
  matches?: Match[] | null;
}
