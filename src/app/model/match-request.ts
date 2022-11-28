import { Team } from "./team";
import { Winner } from "./winner";

export interface MatchRequest {
  winner?: Winner;
  start: Date;
  end?: Date;
  eventId: number;
  team1: Team;
  team2: Team;
}