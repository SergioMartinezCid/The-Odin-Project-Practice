import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { PomodoroService } from '../pomodoro.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  configurationService: ConfigurationService;
  pomodoroService: PomodoroService;

  constructor(configurationService: ConfigurationService, pomodoroService: PomodoroService) {
    this.configurationService = configurationService;
    this.pomodoroService = pomodoroService;
  }

  ngOnInit(): void {
  }

}
