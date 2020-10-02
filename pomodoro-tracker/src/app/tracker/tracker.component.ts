import { Component, OnInit } from '@angular/core';
import { PomodoroService } from '../pomodoro.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  pomodoroService: PomodoroService;
  constructor(pomodoroService: PomodoroService) {
    this.pomodoroService = pomodoroService;
  }

  ngOnInit(): void {
  }

}
