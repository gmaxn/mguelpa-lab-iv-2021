import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistrationFormComponent } from './admin-registration-form.component';

describe('AdminRegistrationFormComponent', () => {
  let component: AdminRegistrationFormComponent;
  let fixture: ComponentFixture<AdminRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
