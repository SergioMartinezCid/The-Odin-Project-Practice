import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBookAddComponent } from './app-book-add.component';

describe('AppBookAddComponent', () => {
  let component: AppBookAddComponent;
  let fixture: ComponentFixture<AppBookAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBookAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
