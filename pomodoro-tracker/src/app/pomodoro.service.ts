import { Injectable } from '@angular/core';
import { Clock } from 'src/domain/Clock';
import { CompletedPomodoro } from 'src/domain/CompletedPomodoro';
import { Pomodoro } from 'src/domain/Pomodoro';
import { Scheme } from 'src/domain/Scheme';
import { Observer } from 'src/domain/Observer';

@Injectable({
  providedIn: 'root'
})
export class PomodoroService implements Observer{

  // addedPomodoros = new Array<Pomodoro>();
  completedPomodoros = new Array<CompletedPomodoro>();
  // createdSchemes = [new Scheme(25 * 60, 5 * 60, 15 * 60, 4)];
  addedPomodoros = [new Pomodoro('c1', 'First Pomodoro Twice', 2), new Pomodoro('c2', 'Second Pomodoro Thrice', 3)];
  createdSchemes = [new Scheme(3 * 60, 1 * 60, 2 * 60, 3)];
  clock = new Clock(this.createdSchemes[0], this.addedPomodoros, this.completedPomodoros);
  currentTime = this.clock.getCurrentTime();
  isBreak = this.clock.scheme.isPeriodBreak();
  isPaused = this.clock.isPaused();
  currentTitle = this.getTitle();

  constructor() {
    this.clock.registerObserver(this);
  }

  update(): void {
    this.currentTime = this.clock.getCurrentTime();
    this.isPaused = this.clock.isPaused();
    this.currentTitle = this.getTitle();

    if (this.isBreak !== this.clock.scheme.isPeriodBreak()){
      this.isBreak = this.clock.scheme.isPeriodBreak();
      if (this.isBreak && this.addedPomodoros.length > 1 && this.addedPomodoros[0].count === 0){
        this.addedPomodoros.splice(0, 1);
      }
    }
  }

  getTitle(): string{
    if (this.addedPomodoros.length > 0 && !this.isBreak){
      return  this.addedPomodoros[0].description;
    } else {
      return '';
    }
  }
}
