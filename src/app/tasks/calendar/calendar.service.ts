import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() { }

  public static dayMilliseconds = 24 * 60 * 60 * 1000;

  normalizedDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  lastLastSunday(): Date {
    const today = new Date();
    const delta = (today.getDay() + 7) * CalendarService.dayMilliseconds;
    const lastSunday = new Date(today.getTime() - delta);
    return this.normalizedDate(lastSunday)
  }

  generateCalendarMatrix(): {matrix: CalendarCellData[][], today: number[]} {
    const today = new Date();
    const lastSunday = this.lastLastSunday();
    const matrix: CalendarCellData[][] = [];
    for (let i = 0; i < 5; i++) {
      const week: CalendarCellData[] = [];
      for (let j = 0; j < 7; j++) {
        const date = new Date(
          lastSunday.getTime() + (i * 7 + j) * CalendarService.dayMilliseconds);
        week.push({ date: date, tasks: [] });
      }
      matrix.push(week);
    }

    const delta = Math.floor((today.getTime() - lastSunday.getTime()) / CalendarService.dayMilliseconds);
    const calendarRow = Math.floor(delta / 7);
    const calendarCol = delta % 7;

    return { matrix: matrix, today: [calendarRow, calendarCol] };
  }
}
