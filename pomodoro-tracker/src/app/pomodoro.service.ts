import { Injectable } from '@angular/core';
import { Clock } from 'src/domain/Clock';
import { CompletedPomodoro } from 'src/domain/CompletedPomodoro';
import { Pomodoro } from 'src/domain/Pomodoro';
import { Scheme } from 'src/domain/Scheme';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService implements Observer{
  addedPomodoros = new Array<Pomodoro>();
  completedPomodoros = new Array<CompletedPomodoro>();
  createdSchemes = [new Scheme(25 * 60, 5 * 60, 15 * 60, 4)];
  clock = new Clock(this.createdSchemes[0], this.addedPomodoros, this.completedPomodoros);

  constructor() { }

  update(): void {
    throw new Error('Method not implemented.');
  }
}
