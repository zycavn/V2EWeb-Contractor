import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayModelComponent } from './display-model.component';

describe('DisplayModelComponent', () => {
  let component: DisplayModelComponent;
  let fixture: ComponentFixture<DisplayModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
