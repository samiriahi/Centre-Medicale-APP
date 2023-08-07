import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BpmnStep } from '../model/BpmnStep';

@Injectable({
  providedIn: 'root'
})
export class BpmnService {
  private url = 'http://localhost:8080/api/bpmnsteps'; // Remplacez avec l'URL de votre endpoint Spring Boot

  constructor(private http: HttpClient) { }

  saveBpmnStep(bpmnSteps: any[]): Observable<any> {
    return this.http.post(this.url, bpmnSteps);
  }
  processData(simulationArray: any[]): Observable<any> {
    // Effectuez les opérations nécessaires avant l'enregistrement des données, si nécessaire

    const bpmnSteps: BpmnStep[] = simulationArray.map((item: any) => {
      const bpmnStep: BpmnStep = {
        name: item.name,
        type: item.type,
        // Définissez les autres propriétés de l'entité BpmnStep
      };
      return bpmnStep;
    });

    return this.http.post<any>('/api/bpmnsteps', bpmnSteps); // Envoyez les données au backend
  }
}
