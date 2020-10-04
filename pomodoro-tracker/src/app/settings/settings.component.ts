import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  configurationService: ConfigurationService;
  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
  }

  ngOnInit(): void {
  }

}
