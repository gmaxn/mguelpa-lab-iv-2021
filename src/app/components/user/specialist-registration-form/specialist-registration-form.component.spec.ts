import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistRegistrationFormComponent } from './specialist-registration-form.component';

describe('SpecialistRegistrationFormComponent', () => {
  let component: SpecialistRegistrationFormComponent;
  let fixture: ComponentFixture<SpecialistRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistRegistrationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
