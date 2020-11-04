import { TestBed } from '@angular/core/testing';

import { DzukoFormService } from './dzuko-form.service';

describe('DzukoFormService', () => {
  let service: DzukoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DzukoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
