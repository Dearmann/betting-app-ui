export interface Team {
  id: number;
  name: string;
  logoUrl: string;
  gameId: number;
  matchesAsTeam1: number[];
  matchesAsTeam2: number[];
}