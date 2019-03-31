import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../environments/environment';

import { Game, Move, Player } from './game.model';

const baseUrl = `${environment.baseUri}/api/v1/games`;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game = new Game();
  gameSubject = new Subject<Game>();
  gamesSubject = new Subject<Game[]>();
  games$ = this.gamesSubject.asObservable();

  get players(): Player[] { return this.game.players; }

  constructor(
    private httpClient: HttpClient
  ) { }

  getGame(id: number): void {
    this.httpClient.get<Game>(`${baseUrl}/${id}`)
      .subscribe(game => {
        this.game = new Game(game);
        this.gameSubject.next(this.game);
      }, (error => console.log(error)));
  }

  getGames(): void {
    this.httpClient.get<Game[]>(`${baseUrl}`)
      .subscribe(
        games => {
          games.forEach(g => {
            g.numMoves = g.moves.length;
            g.playerNames = g.players.map(p => `${p.name} (${p.strategy})`).join(', ');
          });
          games = games.sort((a: Game, b: Game) => b.id - a.id);
          this.gamesSubject.next(games);
        },
        (error => console.log(error))
      );
  }

  start(players: Player[]): void {
    this.httpClient.post<Game>(`${baseUrl}/start`, players)
      .subscribe(game => {
        this.game = new Game(game);
        this.gameSubject.next(this.game);
        this.getGames();
      }, (error => console.log(error)));
  }

  end(): void {
    this.httpClient.patch<Game>(`${baseUrl}/${this.game.id}/end`, '')
      .subscribe(game => {
        this.game = new Game(game);
        this.gameSubject.next(this.game);
        this.getGames();
      }, (error => console.log(error)));
  }

  move(playerIndex: number, spot: number) {
    this.httpClient.patch<Game>(`${baseUrl}/${this.game.id}/move`, <Move>{ playerIndex: playerIndex, spot: spot })
      .subscribe(game => {
        this.game = new Game(game);
        this.gameSubject.next(this.game);
        this.getGames();
      }, (error => console.log(error)));
  }
}
