import { Component } from '@angular/core';
import { ComputerPlayer } from 'src/domain/ComputerPlayer';
import { GameBoard } from 'src/domain/GameBoard';
import { Player } from 'src/domain/Player';

const playerTop: Player = new ComputerPlayer(new GameBoard(8, 8));
// playerTop.board.loadRandom();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerTop = playerTop;
  playerBottom = null;
  isActive = false;
  gameResult = '';

  title = 'battleship';

  checkName(name: string): void{
    this.playerBottom = new Player('Player 1', new GameBoard(8, 8));
    // playerBottom.board.loadRandom();
    console.log(name);
    Player.setOpponents(this.playerBottom, playerTop);
  }
}
