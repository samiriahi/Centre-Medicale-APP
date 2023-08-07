import { TestBed } from '@angular/core/testing';

import { BpmnService } from './bpmn.service';

describe('BpmnService', () => {
  let service: BpmnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpmnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
