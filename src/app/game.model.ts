
export const PLAYER_PIECES = ['X', 'O'];

export class Move {
  playerIndex: number;
  spot: number;
}

export enum PlayerKind {
  Human = 0,
  Rules = 1,
  Learning = 2,
  Random = 3
}

export interface Player {
  number: number;
  name: string;
  kind: PlayerKind;
}

export enum GameResult {
  None = 0,
  XWins = 1,
  OWins = 2,
  Tie = 3
}

export class Game {
  id: number;
  moves: Move[];
  numMoves: number;
  players: Player[];
  playerNames: string;
  startDate: Date;
  endDate?: Date;
  complete: boolean;
  result: GameResult;

  constructor(game?: Game) {
    if (game) {
      this.id = game.id;
      this.moves = game.moves;
      this.numMoves = game.numMoves;
      this.players = game.players;
      this.players.forEach(p => p.kind = +p.kind);
      this.playerNames = game.players.map(p => p.name).join(', ');
      this.startDate = game.startDate;
      this.endDate = game.endDate;
      this.complete = game.complete;
      this.result = game.result;
    }
  }

}

export function numHumanPlayers(players: Player[]): number { return players ? players.filter(p => p.kind <= PlayerKind.Human).length : 0; }

export function ParseEnum(T: object): string[] { return Object.keys(T).filter(k => !isNaN(Number(T[k]))); }

export const PlayerKinds = ParseEnum(PlayerKind).map(k => ({ name: k, value: PlayerKind[k] }));
