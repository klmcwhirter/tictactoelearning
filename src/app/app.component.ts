import { Component, OnInit } from '@angular/core';

import {
  GameResult,
  numHumanPlayers,
  ParseEnum,
  PLAYER_PIECES,
  PlayerKind,
  PlayerKinds
} from './game.model';
import { GameService } from './game.service';
import { BoardService } from './board/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  DEBUG = false;

  PLAYER_PIECES = PLAYER_PIECES;
  PlayerKinds = PlayerKinds;
  numHumanPlayers = numHumanPlayers;

  players = [
    { number: 0, name: '', kind: PlayerKind.Human },
    { number: 1, name: '', kind: PlayerKind.Human }
  ];

  constructor(
    private boardService: BoardService,
    private gameService: GameService
  ) {
  }

  ngOnInit() {
  }

  gameResult(): string {
    const results = ['', 'X Wins!', 'O Wins!', 'Tie'];
    const rc = `  *** ${results[this.gameService.game.result]} ***`;
    return rc;
  }

  onEnd() {
    this.gameService.end();
  }

  onStart() {
    this.gameService.start(this.players);
  }
}
