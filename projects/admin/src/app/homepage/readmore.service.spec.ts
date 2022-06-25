import { TestBed } from '@angular/core/testing';

import { ReadmoreService } from './readmore.service';



describe('ReadmoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadmoreService = TestBed.get(ReadmoreService);
    expect(service).toBeTruthy();
  });
});
