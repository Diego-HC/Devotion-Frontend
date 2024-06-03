import { Component } from '@angular/core';
import { StoreService } from "../../store.service";

@Component({
  selector: 'app-invite-members',
  template: `
    <p>
      invite-members works!
    </p>
  `
})
export class InviteMembersComponent {
  constructor(
    private store: StoreService
  ) { }
}
