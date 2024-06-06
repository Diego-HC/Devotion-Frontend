import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { OAuthModule } from "angular-oauth2-oidc";
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";

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
import { DashboardMainPageComponent } from "./dashboards/dashboard-main-page/dashboard-main-page.component";
import {
  DashboardTaskListComponent,
  DashboardTaskComponent,
} from "./dashboards/dashboard-task-list/dashboard-task-list.component";
import { WidgetComponent } from "./dashboards/widgets/widget/widget.component";
import { WidgetNumberComponent } from "./dashboards/widgets/widget-number/widget-number.component";
import { CreateWidgetComponent } from "./dashboards/widgets/create-widget/create-widget.component";
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
import { LoadingComponent } from './shared/loading/loading.component';
import {NgOptimizedImage} from "@angular/common";
import { AlertComponent } from './shared/alert/alert.component';
import { CalendarCellComponent } from './tasks/calendar-cell/calendar-cell.component';
import { CalendarTaskComponent } from './tasks/calendar-task/calendar-task.component';
import { TasksLoadingComponent } from './tasks/tasks-loading/tasks-loading.component';
import { ProjectMembersPageComponent } from './projects/project-members-page/project-members-page.component';
import { ConfirmDeletionComponent } from './shared/confirm-deletion/confirm-deletion.component';
import { KanbanCardComponent } from './shared/kanban-card/kanban-card.component';
import { PriorityIconComponent } from './shared/icons/priority-icon/priority-icon.component';
import { CheckmarkIconComponent } from './shared/icons/checkmark-icon/checkmark-icon.component';
import { XIconComponent } from './shared/icons/x-icon/x-icon.component';
import { LeftChevronIconComponent } from './shared/icons/left-chevron-icon/left-chevron-icon.component';
import { ConfirmGoBackComponent } from './shared/confirm-go-back/confirm-go-back.component';
import { NewProjectIconComponent } from './shared/icons/new-project-icon/new-project-icon.component';
import { PencilIconComponent } from './shared/icons/pencil-icon/pencil-icon.component';
import { IconSidebarComponent } from './shared/icon-sidebar/icon-sidebar.component';
import { TaskPreviewComponent} from "./tasks/task-preview/task-preview.component";
import { TaskPreviewInfoComponent } from './tasks/task-preview-info/task-preview-info.component';
import { KanbanSectionComponent } from './kanban-section/kanban-section.component';
import { FullscreenIconComponent } from './shared/icons/fullscreen-icon/fullscreen-icon.component';
import { InvitePageComponent } from './shared/invite-page/invite-page.component';
import { ProtectedLinkComponent } from './shared/protected-link/protected-link.component';
import { InviteDashboardComponent } from './shared/invite-dashboard/invite-dashboard.component';
import { InviteMembersComponent } from './shared/invite-members/invite-members.component';
import { LinkIconComponent } from './shared/icons/link-icon/link-icon.component';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BarChartModule, HeatMapModule, NgxChartsModule, PieChartModule} from "@swimlane/ngx-charts";
import { WidgetPieChartComponent } from './dashboards/widgets/widget-pie-chart/widget-pie-chart.component';
import { WidgetVerticalBarChartComponent } from './dashboards/widgets/widget-vertical-bar-chart/widget-vertical-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
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
    LoadingComponent,
    AlertComponent,
    CalendarCellComponent,
    CalendarTaskComponent,
    TasksLoadingComponent,
    ProjectMembersPageComponent,
    ConfirmDeletionComponent,
    KanbanCardComponent,
    PriorityIconComponent,
    CheckmarkIconComponent,
    XIconComponent,
    LeftChevronIconComponent,
    DashboardMainPageComponent,
    DashboardTaskListComponent,
    DashboardTaskComponent,
    WidgetComponent,
    WidgetNumberComponent,
    CreateWidgetComponent,
    ConfirmGoBackComponent,
    NewProjectIconComponent,
    PencilIconComponent,
    IconSidebarComponent,
    TaskPreviewComponent,
    TaskPreviewInfoComponent,
    KanbanSectionComponent,
    FullscreenIconComponent,
    InvitePageComponent,
    ProtectedLinkComponent,
    InviteDashboardComponent,
    InviteMembersComponent,
    LinkIconComponent,
    WidgetPieChartComponent,
    WidgetVerticalBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    PieChartModule,
    BarChartModule,
    HeatMapModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
