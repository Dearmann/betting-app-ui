export interface EventRequest {
  name: string;
  region?: string;
  season?: number;
  start?: Date;
  end?: Date;
  gameId: number;
}