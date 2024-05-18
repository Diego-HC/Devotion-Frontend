import { Component, Input, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import GSTC, { Config, GSTCResult } from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';

@Component({
  selector: 'app-roadmap',
  template: `
    <div class="container">
      <div #gstcElement></div>
    </div>
  `,
  styles: [`
    .status-badge {
      padding: 0.2em 0.5em;
      border-radius: 3px;
      font-size: 0.9em;
      color: white;
      display: inline-block;
    }
    .status-badge.not-started {
      background-color: black;
    }
    .status-badge.doing {
      background-color: yellow;
      color: black;
    }
    .status-badge.in-review {
      background-color: orange;
    }
    .status-badge.done {
      background-color: green;
    }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
    }
    .gantt-container {
      width: 100%;
      max-width: 1200px;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class RoadmapComponent implements OnInit {
  @Input() tasks?: any[];
  @Input() taskId: string = '';
  @ViewChild('gstcElement', { static: true }) gstcElement!: ElementRef;

  gstc!: GSTCResult;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.tasks && this.tasks.length > 0) {
      const state = GSTC.api.stateFromConfig(this.generateConfig());
      this.gstc = GSTC({
        element: this.gstcElement.nativeElement,
        state,
      });
    }
  }

  generateConfig(): Config {
    const rows: { [key: string]: any } = {};
    const items: { [key: string]: any } = {};

    this.tasks?.forEach((task, index) => {
      const rowId = GSTC.api.GSTCID(task.id.toString());
      rows[rowId] = {
        id: rowId,
        label: task.name,
      };

      const itemId = GSTC.api.GSTCID(task.id.toString());
      items[itemId] = {
        id: itemId,
        label: this.getTaskLabel(task.status),
        time: {
          start: new Date(task.startDate).getTime(),
          end: new Date(task.dueDate).getTime(),
        },
        rowId: rowId,
      };
    });

    const columns = {
      percent: 100,
      resizer: {
        inRealTime: true,
      },
      data: {
        [GSTC.api.GSTCID('label')]: {
          id: GSTC.api.GSTCID('label'),
          data: 'label',
          expander: true,
          isHtml: true,
          width: 230,
          minWidth: 100,
          header: {
            content: 'Tarea',
          },
        },
      },
    };

    return {
      licenseKey:
        '====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====',
      list: {
        rows,
        columns,
      },
      chart: {
        items,
      },
      plugins: [TimelinePointer(), Selection()],
    };
  }

  getTaskLabel(status: number): string {
    switch (status) {
      case 0:
        return '<span class="status-badge not-started">NOT STARTED</span>';
      case 1:
        return '<span class="status-badge doing">DOING</span>';
      case 2:
        return '<span class="status-badge in-review">IN REVIEW</span>';
      case 3:
        return '<span class="status-badge done">DONE</span>';
      default:
        return '';
    }
  }

  navigateToTask(taskId: string) {
    this.router.navigate(['/task', taskId]);
  }

  getFormattedDates(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate()) {
      return `${start.getDate()} ${this.getMonthName(start.getMonth())} ${start.getFullYear()}`;
    } else {
      return `${start.getDate()} ${this.getMonthName(start.getMonth())} ${start.getFullYear()} - ${end.getDate()} ${this.getMonthName(end.getMonth())} ${end.getFullYear()}`;
    }
  }

  getMonthName(monthIndex: number): string {
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return monthNames[monthIndex];
  }
}
