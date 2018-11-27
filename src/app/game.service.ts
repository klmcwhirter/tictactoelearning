import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Game, Move, Player } from './game.model';

const baseUrl = 'http://tttlapi-dev1/api/v1/games';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game = new Game();
  gameSubject = new Subject<Game>();

  get players(): Player[] { return this.game.players; }

  constructor(
    private httpClient: HttpClient
  ) { }

  getGame(id: number): void {
    this.httpClient.get<Game>(`${baseUrl}/${id}`)
      .subscribe(game => {
        this.game = new Game(game);
      }, (error => console.log(error)));
  }

  start(players: Player[]): void {
    this.httpClient.post<Game>(`${baseUrl}/start`, players)
      .subscribe(game => {
        this.game = new Game(game);
        this.gameSubject.next(this.game);
      }, (error => console.log(error)));
  }

  end(): void {
    this.httpClient.patch<Game>(`${baseUrl}/${this.game.id}/end`, '')
      .subscribe(game => {
        this.game = new Game(game);
        this.gameSubject.next(this.game);
      }, (error => console.log(error)));
  }

  move(playerIndex: number, x: number, y: number) {
    this.httpClient.patch<Game>(`${baseUrl}/${this.game.id}/move`, <Move>{ playerIndex: playerIndex, x: x, y: y })
      .subscribe(game => {
        this.game = new Game(game);
        this.gameSubject.next(this.game);
      }, (error => console.log(error)));
  }
}
