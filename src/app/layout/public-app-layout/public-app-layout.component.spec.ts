import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAppLayoutComponent } from './public-app-layout.component';

describe('PublicAppLayoutComponent', () => {
  let component: PublicAppLayoutComponent;
  let fixture: ComponentFixture<PublicAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicAppLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
