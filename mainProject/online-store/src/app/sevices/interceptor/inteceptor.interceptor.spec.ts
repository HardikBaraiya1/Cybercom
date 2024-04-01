import { TestBed } from '@angular/core/testing';

import { InteceptorInterceptor } from './inteceptor.interceptor';

describe('InteceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InteceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InteceptorInterceptor = TestBed.inject(InteceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
