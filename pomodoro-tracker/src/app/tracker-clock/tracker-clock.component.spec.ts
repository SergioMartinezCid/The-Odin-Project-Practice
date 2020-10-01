import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerClockComponent } from './tracker-clock.component';

describe('TrackerClockComponent', () => {
  let component: TrackerClockComponent;
  let fixture: ComponentFixture<TrackerClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
