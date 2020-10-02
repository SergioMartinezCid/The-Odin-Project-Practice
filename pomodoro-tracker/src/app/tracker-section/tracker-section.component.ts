import { Component, OnInit, Input } from '@angular/core';
import { Pomodoro } from 'src/domain/Pomodoro';
import { PomodoroItem } from 'src/domain/PomodoroItem';
import { PomodoroService } from '../pomodoro.service';

@Component({
  selector: 'app-tracker-section',
  templateUrl: './tracker-section.component.html',
  styleUrls: ['./tracker-section.component.css']
})
export class TrackerSectionComponent implements OnInit {
  @Input() pomodoroItems: Array<PomodoroItem>;
  @Input() subtype: string;

  inputCategory = '';
  inputDescription = '';

  pomodoroService: PomodoroService;
  constructor(pomodoroService: PomodoroService) {
    this.pomodoroService = pomodoroService;
  }

  increasePomodoroCount(pomodoro: PomodoroItem, count: number): void{
    if (count < 0 && pomodoro.count <= -1 * count){
      this.removeItem(pomodoro);
    } else {
      pomodoro.count = pomodoro.count + count;
    }
    this.pomodoroService.update();
  }

  markAsDone(item: PomodoroItem): void{
    if (! (item instanceof Pomodoro)){
      return;
    }

    const pomodoro = item as Pomodoro;
    this.pomodoroService.completedPomodoros.push(pomodoro.markAsDone(this.pomodoroService.clock.scheme.getPeriodDuration()));
    if (pomodoro.count === 0){
      this.removeItem(item);
    }
    this.pomodoroService.update();
  }

  reAdd(item: PomodoroItem): void{
    this.pomodoroService.addedPomodoros.push(new Pomodoro(item.category, item.description, 1));
  }

  removeItem(item: PomodoroItem): void{
      this.pomodoroItems.splice(this.pomodoroItems.indexOf(item), 1);
  }

  updateTitle(pomodoros: Array<PomodoroItem>): string{
    return  `${this.subtype.toUpperCase()} · ${pomodoros.reduce((curr, acc) => curr + acc.count, 0)}`;
  }

  addPomodoro(): void{
    if (this.inputCategory.trim() !== '' || this.inputDescription.trim() !== ''){
      this.pomodoroItems.push(new Pomodoro(this.inputCategory, this.inputDescription, 1));
    }
  }

  ngOnInit(): void {
  }

}
