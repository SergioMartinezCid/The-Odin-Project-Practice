import { Component, OnInit } from '@angular/core';
import { PomodoroService} from '../pomodoro.service';

@Component({
  selector: 'app-tracker-clock',
  templateUrl: './tracker-clock.component.html',
  styleUrls: ['./tracker-clock.component.css']
})
export class TrackerClockComponent implements OnInit {
  pomodoroService: PomodoroService;
  Math = Math;

  constructor(pomodoroService: PomodoroService) {
    this.pomodoroService = pomodoroService;
  }

  ngOnInit(): void {
  }

}
