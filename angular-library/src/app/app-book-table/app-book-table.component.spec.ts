import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBookTableComponent } from './app-book-table.component';

describe('AppBookTableComponent', () => {
  let component: AppBookTableComponent;
  let fixture: ComponentFixture<AppBookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBookTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
