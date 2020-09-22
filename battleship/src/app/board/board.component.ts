import { Component, OnInit, Input, ANALYZE_FOR_ENTRY_COMPONENTS, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/domain/Player';
import { Ship } from 'src/domain/Ship';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() hidden: boolean;
  @Input() active: boolean;
  @Input() tableId: string;
  @Input() player: Player;
  @Output() winner = new EventEmitter<Player>();

  getBackgroundColor(ship: [number, Ship]): string{
    if (ship != null && ship[1].isHit(ship[0])){
      return 'red';
    }

    if (this.hidden){
      return 'gray';
    }

    if (ship == null){
      return 'blue';
    }

    return 'black';
  }

  getCellContent(x: number, y: number): string{
    if (this.player.board.checkedBoard[x][y] && (this.player.board.placedBoard[x][y] == null ||
      !this.player.board.placedBoard[x][y][1].isHit(this.player.board.placedBoard[x][y][0]))){
        return 'X';
    }
    return '';
  }

  manageCellClick(x: number, y: number): void{
    if (!this.active){
      return;
    }

    try {
      this.player.receiveAttack(x, y);
    } catch (error) {
      alert(error.message);
    }
    if (this.player.board.isSunk()){
      this.winner.emit(this.player.opponent);
    }else if (this.player.opponent.board.isSunk()){
      this.winner.emit(this.player);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
