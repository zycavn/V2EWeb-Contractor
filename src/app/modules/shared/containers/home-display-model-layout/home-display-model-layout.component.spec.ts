import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDisplayModelLayoutComponent } from './home-display-model-layout.component';

describe('HomeDisplayModelLayoutComponent', () => {
  let component: HomeDisplayModelLayoutComponent;
  let fixture: ComponentFixture<HomeDisplayModelLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDisplayModelLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDisplayModelLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
