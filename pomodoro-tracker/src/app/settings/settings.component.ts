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
  parseInt = parseInt;

  constructor(configurationService: ConfigurationService, pomodoroService: PomodoroService) {
    this.configurationService = configurationService;
    this.pomodoroService = pomodoroService;
  }

  updateVolume(percentage: number): void{
    this.configurationService.volume = Math.min(Math.max(percentage / 100, 0), 1);
    this.pomodoroService.notificationAudio.volume = this.configurationService.volume;
    this.pomodoroService.playAudio();
  }

  ngOnInit(): void {
  }

}
