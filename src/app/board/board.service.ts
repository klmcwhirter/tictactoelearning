import { Injectable } from '@angular/core';

import { GameService } from '../game.service';
import { Game, Move, PLAYER_PIECES } from '../game.model';

const EMPTY_SPOTS = () => [Array(3).fill(' '), Array(3).fill(' '), Array(3).fill(' ')];

export class Board {
  id?: number;
  spots?: string[][];
  firstMove?: Move;
  moves?: Move[];
  currentPlayer: number;

  cellOccupied(x: number, y: number): boolean {
    return this.spots[y][x] !== ' ';
  }

  fromGame(game?: Game) {
    this.spots = EMPTY_SPOTS();
    this.firstMove = null;
    if (game) {
      this.moves = game.moves || [];
      this.renderPieces();
      this.updateCurrentPlayer();
    } else {
      this.id = -1;
      this.moves = [];
      this.updateCurrentPlayer();
    }
  }

  placePiece(move: Move) {
    const piece = PLAYER_PIECES[move.playerIndex];
    this.spots[move.y][move.x] = piece;
    if (!this.firstMove) {
      this.firstMove = move;
    }
  }

  renderPieces() {
    this.moves.forEach(m => this.placePiece(m));
  }

  updateCurrentPlayer(): void {
    if (this.moves && this.moves.length > 0) {
      this.currentPlayer = 1 - this.moves[this.moves.length - 1].playerIndex;
    } else {
      this.currentPlayer = 0;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Board = new Board();

  constructor(
    private gameService: GameService
  ) {
    this.gameService.gameSubject
      .subscribe(game => {
        this.board.fromGame(game);
        this.board.updateCurrentPlayer();
      });
  }

  /*
  **x=> 0   1   2   y
  **                |
  **  +---+---+---+ v
  **  | 0 | 1 | 2 | 0
  **  +---+---+---+
  **  | 3 | 4 | 5 | 1
  **  +---+---+---+
  **  | 6 | 7 | 8 | 2
  **  +---+---+---+
  */
  spotFromCoords(x: number, y: number): number {
    return y * 3 + x;
  }
}
