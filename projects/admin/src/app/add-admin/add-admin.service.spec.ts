import { TestBed } from '@angular/core/testing';

import { AddAdminService } from './add-admin.service';

describe('AddAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddAdminService = TestBed.get(AddAdminService);
    expect(service).toBeTruthy();
  });
});
