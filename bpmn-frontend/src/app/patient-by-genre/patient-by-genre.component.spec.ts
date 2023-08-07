import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientByGenreComponent } from './patient-by-genre.component';

describe('PatientByGenreComponent', () => {
  let component: PatientByGenreComponent;
  let fixture: ComponentFixture<PatientByGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientByGenreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientByGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
