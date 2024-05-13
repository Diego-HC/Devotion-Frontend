import { TestBed } from '@angular/core/testing';

import { TaskCreateEditService } from './task-create-edit.service';

describe('TaskCreateEditService', () => {
  let service: TaskCreateEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskCreateEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
