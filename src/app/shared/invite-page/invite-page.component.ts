import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-invite-page',
  template: `
    <ng-container
      *ngIf="projectOrTaskId !== ''"
    >
      <app-main-page
        *ngIf="!isTask"
        [projectId]="projectOrTaskId"
      ></app-main-page>
      <app-task-main-page
        *ngIf="isTask"
        [taskId]="projectOrTaskId"
      ></app-task-main-page>
    </ng-container>
  `
})
export class InvitePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  projectOrTaskId = "";
  isTask = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.api.get(`invites/${params["inviteId"]}/`).subscribe((response) => {
        this.isTask = response.is_task;
        this.projectOrTaskId = response.resource;
      });
    });
  }
}
