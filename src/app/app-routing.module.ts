import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginComponent } from "./login/login.component";
import { ViewPageComponent } from "./projects/view-page/view-page.component";
import { MainPageComponent } from "./projects/main-page/main-page.component";
import { TaskMainPageComponent } from "./tasks/task-main-page/task-main-page.component";
import { CreateEditPageComponent } from "./projects/create-edit-page/create-edit-page.component";
import { TaskCreateEditPageComponent } from "./tasks/task-create-edit-page/task-create-edit-page.component";
import { DashboardMainPageComponent } from "./dashboards/dashboard-main-page/dashboard-main-page.component";
import { DataSourcesMainPageComponent } from "./dashboards/dataSources/data-sources-main-page/data-sources-main-page.component";

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "login", component: LoginComponent },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: ViewPageComponent,
  },
  {
    path: "project/:id",
    component: MainPageComponent,
  },
  {
    path: "dashboard/:id",
    component: DashboardMainPageComponent,
  },
  {
    path: "dashboard/:id/dataSources",
    component: DataSourcesMainPageComponent,
  },
  {
    path: "task/:id",
    component: TaskMainPageComponent,
  },
  {
    path: "new/project",
    component: CreateEditPageComponent,
  },
  {
    path: "new/task",
    component: TaskCreateEditPageComponent,
  },
  {
    path: "edit/project/:id",
    component: CreateEditPageComponent,
  },
  {
    path: "edit/task/:id",
    component: TaskCreateEditPageComponent,
  },
  {
    path: "",
    component: LandingPageComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
