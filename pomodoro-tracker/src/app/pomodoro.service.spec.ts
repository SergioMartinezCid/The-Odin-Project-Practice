import { TestBed } from '@angular/core/testing';

import { PomodoroService} from './pomodoro.service';

describe('PomodoroServiceService', () => {
  let service: PomodoroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomodoroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
