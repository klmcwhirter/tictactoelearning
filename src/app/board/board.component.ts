import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  colors = {
    '': '',
    'X': 'piece-red',
    'O': 'piece-blue'
  };

  constructor(
    private boardService: BoardService,
    private gameService: GameService
  ) { }

  ngOnInit() {
  }

  onPlacePiece(x: number, y: number) {
    // console.log(x, y);
    if (!this.gameService.game.complete && !this.boardService.board.cellOccupied(x, y)) {
      this.gameService.move(this.boardService.board.currentPlayer, this.boardService.spotFromCoords(x, y));
    }
  }
}
