import { TestBed } from '@angular/core/testing';

import { AdmindataService } from './admindata.service';

describe('AdmindataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmindataService = TestBed.get(AdmindataService);
    expect(service).toBeTruthy();
  });
});
