import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  username = 'Anonymous';
  volume = 1;
  constructor() { }
}
