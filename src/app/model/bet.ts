export interface Bet {
  id: number;
  userId: string;
  matchId: number;
  predictedTeamId: number;
  correctPrediction: Boolean;
  matchFinished: Boolean;
}