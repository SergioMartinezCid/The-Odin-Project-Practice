import { Component } from '@angular/core';
import { ComputerPlayer } from 'src/domain/ComputerPlayer';
import { GameBoard } from 'src/domain/GameBoard';
import { Player } from 'src/domain/Player';

const playerTop: Player = new ComputerPlayer(new GameBoard(8, 8));
const playerBottom: Player = new Player('Player 1', new GameBoard(8, 8));
Player.setOpponents(playerTop, playerBottom);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  playerTop = playerTop;
  playerBottom = playerBottom;
  isActive = false;
  title = 'battleship';
}
