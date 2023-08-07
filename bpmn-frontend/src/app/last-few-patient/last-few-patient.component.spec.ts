import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastFewPatientComponent } from './last-few-patient.component';

describe('LastFewPatientComponent', () => {
  let component: LastFewPatientComponent;
  let fixture: ComponentFixture<LastFewPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastFewPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastFewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
