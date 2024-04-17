import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

import { SubprojectsComponent } from "./projects/subprojects/subprojects.component";
import { SubprojectCardComponent } from "./projects/subproject-card/subproject-card.component";
import { BreadcrumbsComponent } from "./shared/breadcrumbs/breadcrumbs.component";
import { ViewPageComponent } from "./projects/view-page/view-page.component";
import { MainPageComponent } from "./projects/main-page/main-page.component";
import { CreateEditPageComponent } from "./projects/create-edit-page/create-edit-page.component";

import { TaskMainPageComponent } from "./tasks/task-main-page/task-main-page.component";
import { TaskCreateEditPageComponent } from "./tasks/task-create-edit-page/task-create-edit-page.component";
import { TableComponent } from "./tasks/table/table.component";
import { KanbanComponent } from "./tasks/kanban/kanban.component";
import { CalendarComponent } from "./tasks/calendar/calendar.component";
import { RoadmapComponent } from "./tasks/roadmap/roadmap.component";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { BadgeComponent } from './shared/badge/badge.component';
import { DevotionLogoComponent } from './shared/icons/devotion-logo/devotion-logo.component';
import { DashboardIconComponent } from './shared/icons/dashboard-icon/dashboard-icon.component';
import { ProjectsIconComponent } from './shared/icons/projects-icon/projects-icon.component';
import { FilesIconComponent } from './shared/icons/files-icon/files-icon.component';
import { PlusIconComponent } from './shared/icons/plus-icon/plus-icon.component';
import { IconComponent } from './shared/icon/icon.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { SearchSelectComponent } from './shared/search-select/search-select.component';
import { TableIconComponent } from './shared/icons/table-icon/table-icon.component';
import { KanbanIconComponent } from './shared/icons/kanban-icon/kanban-icon.component';
import { CalendarIconComponent } from './shared/icons/calendar-icon/calendar-icon.component';
import { RoadmapIconComponent } from './shared/icons/roadmap-icon/roadmap-icon.component';
import { DevotionIsoComponent } from './shared/icons/devotion-iso/devotion-iso.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    SubprojectsComponent,
    SubprojectCardComponent,
    BreadcrumbsComponent,
    ViewPageComponent,
    MainPageComponent,
    CreateEditPageComponent,
    TaskMainPageComponent,
    TaskCreateEditPageComponent,
    TableComponent,
    KanbanComponent,
    CalendarComponent,
    RoadmapComponent,
    LandingPageComponent,
    LoginComponent,
    BadgeComponent,
    DevotionLogoComponent,
    DashboardIconComponent,
    ProjectsIconComponent,
    FilesIconComponent,
    PlusIconComponent,
    IconComponent,
    ProjectCardComponent,
    SearchSelectComponent,
    TableIconComponent,
    KanbanIconComponent,
    CalendarIconComponent,
    RoadmapIconComponent,
    DevotionIsoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
