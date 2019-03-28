import { Pipe, PipeTransform } from '@angular/core';
import { Game } from './game.model';

@Pipe({
  name: 'gameResult'
})
export class GameResultPipe implements PipeTransform {

  transform(game: Game, args?: any): any {
    const results = ['', 'X Wins', 'O Wins', 'Tie'];
    const rc = results[game.result];
    return rc;
  }

}
