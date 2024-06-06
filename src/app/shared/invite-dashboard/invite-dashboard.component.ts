import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-invite-dashboard',
  template: `
    <ng-container
      *ngIf="projectId !== ''"
    >
      <app-dashboard-main-page
        [projectId]="projectId"
      ></app-dashboard-main-page>
    </ng-container>
  `
})
export class InviteDashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  projectId = "";

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.api.get(`invites/${params["inviteId"]}/`).subscribe((response) => {
        if (response.is_task) {
          return;
        }
        this.projectId = response.resource;
      });
    });
  }
}
