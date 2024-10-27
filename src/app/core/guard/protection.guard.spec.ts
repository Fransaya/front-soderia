import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { protectionGuard } from './protection.guard';

describe('protectionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => protectionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
