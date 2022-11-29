import { Bet } from "./bet";
import { Comment } from "./comment";
import { Rating } from "./rating";

export interface User {
  id: string;
  username: string;
  enabled: boolean
  emailVerified: boolean;
  email: string;
  firstName: string;
  lastName: string;
  createdTimestamp: number;
  bets: Bet[];
  comments: Comment[];
  ratings: Rating[];
}