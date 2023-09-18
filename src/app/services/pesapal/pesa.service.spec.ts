import { TestBed } from '@angular/core/testing';

import { PesaService } from './pesa.service';

describe('PesaService', () => {
  let service: PesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
