import { Component, OnInit } from '@angular/core';

import {
  numHumanPlayers,
  PLAYER_PIECES,
  GameResult,
} from './game.model';
import { GameService } from './game.service';
import { CapabilitiesService } from './capabilities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  PLAYER_PIECES = PLAYER_PIECES;
  numHumanPlayers = numHumanPlayers;
  strategies = ['Human'];

  numGames = 0;
  winsX = 0;
  winsO = 0;
  ties = 0;

  displayedColumns = ['id', 'playerNames', 'numMoves', 'result'];

  players = [
    { number: 0, name: '', strategy: 'Human' },
    { number: 1, name: '', strategy: 'Human' }
  ];

  constructor(
    public capabilitiesService: CapabilitiesService,
    public gameService: GameService
  ) {
    this.capabilitiesService.capabilities$
      .subscribe(caps => {
        this.strategies = caps.strategies;
      });
    this.capabilitiesService.getCapabilities();

    this.gameService.games$
      .subscribe(games => {
        this.numGames = games.length;
        this.winsX = games.filter(g => g.result === GameResult.XWins).length / this.numGames;
        this.winsO = games.filter(g => g.result === GameResult.OWins).length / this.numGames;
        this.ties = games.filter(g => g.result === GameResult.Tie).length / this.numGames;
      });
  }

  ngOnInit() {
    this.gameService.getGames();
  }

  onBlur(event) {
    if (event.target.value) {
      this.gameService.getGame(event.target.value);
      event.target.value = '';
    }
  }

  onEnd() {
    this.gameService.end();
  }

  onStart() {
    this.gameService.start(this.players);
  }
}

