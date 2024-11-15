import { TestBed } from '@angular/core/testing';

import { RajaOngkirService } from './raja-ongkir.service';

describe('RajaOngkirService', () => {
  let service: RajaOngkirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RajaOngkirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
