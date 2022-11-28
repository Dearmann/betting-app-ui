import { Bet } from "./bet";
import { Comment } from "./comment";
import { Rating } from "./rating";

export interface User {
  keycloakId: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAtTimestamp: number;
  bets: Bet[];
  comments: Comment[];
  ratings: Rating[];
}