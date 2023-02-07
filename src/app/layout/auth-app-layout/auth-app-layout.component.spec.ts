import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAppLayoutComponent } from './auth-app-layout.component';

describe('AuthAppLayoutComponent', () => {
  let component: AuthAppLayoutComponent;
  let fixture: ComponentFixture<AuthAppLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthAppLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAppLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
