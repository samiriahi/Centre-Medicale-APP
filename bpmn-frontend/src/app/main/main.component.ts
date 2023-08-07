import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';  
import { PatientService } from '../service/patient.service';

Chart.register(...registerables);

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})



export class MainComponent implements OnInit  {

  chart!: Chart<'pie', number[], string>;

  constructor(private patientService: PatientService ) { }

  totalPatient: number | undefined  ;
  totalGirl: number | undefined;
  totalMen : number | undefined ;
  totalBoys: number | undefined ;
  totalWoman: number | undefined ;

  ngOnInit(): void {
  
    forkJoin([
      this.patientService.getTotalPatient(),
      this.patientService.getNumberOfGirls(),
      this.patientService.getNumberOfMen(),
      this.patientService.getNumberOfBoys(),
      this.patientService.getNumberOfWomen(),
    ]).subscribe(([totalPatient, totalGirl, totalMen , totalBoys ,totalWoman]) => {
      this.totalPatient = totalPatient;
      this.totalGirl = totalGirl;
      this.totalMen = totalMen;
      this.totalBoys=totalBoys;
      this.totalWoman = totalWoman;
      this.createChart();
    });
  } 

  createChart() {
    console.log(this.totalGirl);
    console.log(this.totalMen);
    console.log(this.totalBoys);
    console.log(this.totalWoman);
    if ( this.totalMen && this.totalWoman  && this.totalBoys  && this.totalGirl) {
      this.chart = new Chart('patientChart', {
        type: 'pie',
        data: {
          labels: [ 'NB Woman', 'nb Men', 'nb Boys', 'nb Girls' ],
          datasets: [
            {
              data: [ this.totalMen, this.totalWoman , this.totalBoys , this.totalGirl],
              backgroundColor: ['#005CFC', '#B8B8B5', '#17C821', '#E80C0C']
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Patient Chart'
            }
          }
        }
      });
    }
  }



}
