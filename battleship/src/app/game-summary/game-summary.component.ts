import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-summary',
  templateUrl: './game-summary.component.html',
  styleUrls: ['./game-summary.component.css']
})
export class GameSummaryComponent implements OnInit {
  @Input() gameResult: string;
  @Output() chosenName = new EventEmitter<string>();
  buttonText = 'Submit name and start game';

  submitPlayerName(): void{
    const inputName = document.querySelector('#input-name') as HTMLInputElement;
    if (inputName.value.trim() === '' || inputName.value.trim() === 'Computer'){
      alert('The player name cannot be empty nor \'Computer\'');
    }else{
      this.buttonText = 'Submit name and restart game';
      this.chosenName.emit(inputName.value);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
