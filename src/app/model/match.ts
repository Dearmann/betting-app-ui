import { Bet } from "./bet";
import { Comment } from "./comment";
import { Rating } from "./rating";
import { Team } from "./team";
import { Winner } from "./winner";

export interface Match {
  id: number;
  winner: Winner;
  start: Date;
  end: Date;
  eventId: number;
  team1: Team;
  team2: Team;
  bets: Bet[];
  comments: Comment[];
  ratings: Rating[];
}