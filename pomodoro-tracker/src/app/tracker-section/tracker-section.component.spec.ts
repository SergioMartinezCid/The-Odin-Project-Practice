import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerSectionComponent } from './tracker-section.component';

describe('TrackerSectionComponent', () => {
  let component: TrackerSectionComponent;
  let fixture: ComponentFixture<TrackerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
