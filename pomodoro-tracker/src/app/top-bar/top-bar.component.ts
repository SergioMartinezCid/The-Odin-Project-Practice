import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() toggle: boolean;
  @Output() toggleChange = new EventEmitter<boolean>();
  configurationService: ConfigurationService;

  constructor(configurationService: ConfigurationService) {
    this.configurationService = configurationService;
  }

  toggleSettings(): void{
    this.toggle = !this.toggle;
    this.toggleChange.emit(this.toggle);
  }

  ngOnInit(): void {
  }

}
