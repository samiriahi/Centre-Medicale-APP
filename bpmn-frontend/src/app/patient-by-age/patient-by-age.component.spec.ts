import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientByAgeComponent } from './patient-by-age.component';

describe('PatientByAgeComponent', () => {
  let component: PatientByAgeComponent;
  let fixture: ComponentFixture<PatientByAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientByAgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientByAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
