import { Winner } from "./winner";

export interface MatchRequest {
  winner?: Winner;
  start: Date;
  end?: Date;
  eventId: number;
  team1Id: number;
  team2Id: number;
}