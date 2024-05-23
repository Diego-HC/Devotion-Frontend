import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDeletionComponent} from './confirm-deletion.component';
import {Router} from "@angular/router";
import {ApiService} from '../../api.service';
import {StoreService} from '../../store.service';

describe('ConfirmDeletionComponent', () => {
  let component: ConfirmDeletionComponent;
  let fixture: ComponentFixture<ConfirmDeletionComponent>;

  const taskId = "b3045125-c471-4c40-bcc3-6ec1ca9edc9f";
  let mockRouter = {
    navigateByUrl: jasmine.createSpy("navigateByUrl"),
  };
  const mockStoreService = {
    task: {
      id: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      assignee: {
        id: "",
        name: "",
        email: "",
        isLeader: false
      },
      priority: 0,
      status: 0,
      parentProject: "",
      parentTask: ""
    } as Task,
    showConfirmDeletion: false,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeletionComponent],
      imports: [Router],
      providers: [
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', ['delete'])
        },
        {
          provide: StoreService,
          useValue: jasmine.createSpyObj('StoreService', ['showConfirmDeletion'])
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
