import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-roadmap',
  template: `
    <div class="flex justify-center items-center">
      <div class="w-full h-full">
      <full-calendar #calendar
           defaultView="dayGridMonth"
           [plugins]="[dayGridPlugin, interactionPlugin]"
           [events]="events"
           [header]="{
             left: 'prev,next today',
             center: 'title',
             right: 'dayGridMonth,dayGridWeek,dayGridDay'
           }"
           [editable]="false"
           [selectable]="false"
           [eventClick]="handleEventClick">
        </full-calendar>
      </div>
    </div>
  `,
  styles: []
})
export class RoadmapComponent implements OnInit {
  @Input() tasks?: any[];
  @Input() taskId: string = '';

  calendar: any;
  events: any[] = [];

  dayGridPlugin = dayGridPlugin;
  interactionPlugin = interactionPlugin;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.tasks?.forEach(task => {
      const start = new Date(task.startDate);
      const end = new Date(task.dueDate);

      this.events.push({
        title: task.name,
        start: start,
        end: end,
        id: task.id,
        extendedProps: {
          status: task.status,
          description: task.description
        }
      });
    });
  }

  handleEventClick(info: any) {
    const taskId = info.event.extendedProps.id;
    this.router.navigate(['/task', taskId]);
  }
}