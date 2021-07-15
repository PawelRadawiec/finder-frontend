import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ErrorState } from '../store/error/error.state';

import { ErrorStateMatcherHelperService } from './error-state-matcher-helper.service';

describe('ErrorStateMatcherHelperService', () => {
  let service: ErrorStateMatcherHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ErrorState])
      ],
      providers: [ErrorStateMatcherHelperService]
    });
    service = TestBed.inject(ErrorStateMatcherHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
