import { TestBed } from '@angular/core/testing';

import { SelectUsersService } from './select-users.service';

describe('SelectUsersService', () => {
  let service: SelectUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
