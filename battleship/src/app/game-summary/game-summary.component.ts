import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent implements OnInit {
  @Input() gameResult: string;
  disabledControls = false;
  @Output() chosenName = new EventEmitter<string>();

  submitPlayerName(): void{
    const inputName = document.querySelector('#input-name') as HTMLInputElement;
    if (inputName.value.trim() === '' || inputName.value.trim() === 'Computer'){
      alert('The player name cannot be empty nor \'Computer\'');
    }else{
      this.disabledControls = true;
      this.chosenName.emit(inputName.value);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
