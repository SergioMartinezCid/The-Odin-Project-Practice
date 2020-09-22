import { Component } from '@angular/core';
import { ComputerPlayer } from 'src/domain/ComputerPlayer';
import { GameBoard } from 'src/domain/GameBoard';
import { Player } from 'src/domain/Player';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerTop = null;
  playerBottom = null;
  isActive = false;
  gameResult = '';

  title = 'battleship';

  checkName(name: string): void{
    this.playerBottom = new Player(name, new GameBoard(8, 8));
    this.playerTop = new ComputerPlayer(new GameBoard(8, 8));
    this.playerBottom.board.loadRandom();
    this.playerTop.board.loadRandom();
    Player.setOpponents(this.playerBottom, this.playerTop);
    this.isActive = true;
  }

  endGame(winner: Player): void{
    this.gameResult = `${winner.name} has won the match`;
  }
}
