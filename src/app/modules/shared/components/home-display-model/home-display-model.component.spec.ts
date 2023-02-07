import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDisplayModelComponent } from './home-display-model.component';

describe('HomeDisplayModelComponent', () => {
  let component: HomeDisplayModelComponent;
  let fixture: ComponentFixture<HomeDisplayModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDisplayModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDisplayModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
