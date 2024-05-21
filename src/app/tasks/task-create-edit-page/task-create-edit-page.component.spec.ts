
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreateEditPageComponent } from './task-create-edit-page.component';

import { of } from "rxjs";
import { HttpClientModule } from "@angular/common/http";
import { OAuthModule } from "angular-oauth2-oidc";
import { ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "../../api.service";
import { StoreService } from "../../store.service";
import { LeftChevronIconComponent } from "../../shared/icons/left-chevron-icon/left-chevron-icon.component";
import { CheckmarkIconComponent } from "../../shared/icons/checkmark-icon/checkmark-icon.component";
import { PriorityIconComponent } from "../../shared/icons/priority-icon/priority-icon.component";
import { SearchSelectComponent } from "../../shared/search-select/search-select.component";

describe('TaskCreateEditPageComponent', () => {
  let component: TaskCreateEditPageComponent;
  let fixture: ComponentFixture<TaskCreateEditPageComponent>;
  let mockApiService: any;
  let mockStoreService: any;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj(["post"]);
    mockStoreService = {
      task: {},
      taskPostBody: jasmine.createSpy("taskPostBody"),
      membersPool: [{}],
    };

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        OAuthModule.forRoot(),
        ReactiveFormsModule
      ],
      declarations: [
        TaskCreateEditPageComponent,
        LeftChevronIconComponent,
        CheckmarkIconComponent,
        PriorityIconComponent,
        SearchSelectComponent,
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: StoreService, useValue: mockStoreService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCreateEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a subtask', () => {
    const task = {
      name: 'Test Task',
      description: 'Test Description',
      priority: 1,
      start_date: new Date(),
      due_date: new Date(),
      assignee: 'Test Assignee'
    };

    mockApiService.post.and.returnValue(of(task));
    mockStoreService.taskPostBody.and.returnValue(task);

    component.taskForm.setValue(task);
    component.onSubmit();

    expect(mockApiService.post).toHaveBeenCalledWith('tasks/', task);
    expect(mockStoreService.taskPostBody).toHaveBeenCalled();
    expect(component.taskForm.valid).toBeTrue();
  });
});
