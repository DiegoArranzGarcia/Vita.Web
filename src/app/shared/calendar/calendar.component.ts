import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export interface CalendarDay {
  date: Date;
  otherMonth: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
  monthWeek: number;
}

@Component({
  selector: 'vita-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class Calendar implements OnInit {
  readonly _faIconArrowLeft = faArrowLeft;
  readonly _faIconArrowRight = faArrowRight;
  readonly _weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  readonly _months: string[] = [
    'January',
    'Febrary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  readonly _daysInAWeek: number = 7;

  _firstDayOfWeek: number = 0;
  _calendarWeekDays: string[];
  _calendarWeeks: CalendarWeek[];

  _currentMonth: number;
  _currentYear: number;

  ngOnInit() {
    let referenceDate = this.getReferenceDate();

    this._currentMonth = referenceDate.getMonth();
    this._currentYear = referenceDate.getFullYear();

    this.populateCalendarWeekDays();
    this.populateCalendarWeeks();
  }

  protected getReferenceDate() {
    return new Date();
  }

  onDayClicked(day: CalendarDay, week: CalendarWeek) {}

  isSelectedDay(day: CalendarDay) {}

  isSelectedWeek(week: CalendarWeek) {}

  onNextMonth() {
    let nextMonth = this.getNextMonthAndYear(this._currentMonth, this._currentYear);
    this._currentMonth = nextMonth.month;
    this._currentYear = nextMonth.year;
    this.populateCalendarWeeks();
  }

  onPreviousMonth() {
    let previous = this.getPreviousMonthAndYear(this._currentMonth, this._currentYear);
    this._currentMonth = previous.month;
    this._currentYear = previous.year;
    this.populateCalendarWeeks();
  }

  private populateCalendarWeeks() {
    this._calendarWeeks = [];
    let daysInMonth = this.getDaysInMonth(this._currentMonth, this._currentYear);
    let firstDayOfMonthWeekDay = this.getFirstDayOfMonthWeekDay(this._currentMonth, this._currentYear);
    let monthRows = Math.ceil((daysInMonth + firstDayOfMonthWeekDay) / 7);

    for (let monthRow = 0; monthRow < monthRows; monthRow++) {
      if (this.isFirstWeek(monthRow)) {
        this._calendarWeeks.push(this.populateFirstWeek());
        continue;
      }

      if (this.isLastWeek(monthRow, monthRows)) {
        this._calendarWeeks.push(this.populateLastweek(monthRow));
        continue;
      }

      this._calendarWeeks.push(this.populateWeek(monthRow));
    }
  }

  private populateFirstWeek(): CalendarWeek {
    let days: CalendarDay[] = [];
    let prev = this.getPreviousMonthAndYear(this._currentMonth, this._currentYear);
    let prevMonthDaysLength = this.getDaysInMonth(prev.month, prev.year);
    let firstDayOfMonthWeekDay = this.getFirstDayOfMonthWeekDay(this._currentMonth, this._currentYear);

    for (let day = prevMonthDaysLength - firstDayOfMonthWeekDay + 1; day <= prevMonthDaysLength; day++) {
      days.push({
        date: new Date(prev.year, prev.month, day),
        otherMonth: true,
      });
    }

    let remainingDaysLength = this._daysInAWeek - days.length;
    for (let index = 0; index < remainingDaysLength; index++) {
      days.push({
        date: new Date(this._currentYear, this._currentMonth, index + 1),
        otherMonth: false,
      });
    }

    return { days: days, monthWeek: 0 };
  }

  private populateWeek(monthWeek: number): CalendarWeek {
    let days: CalendarDay[] = [];

    let lastPopulatedWeek = this._calendarWeeks[monthWeek - 1];
    let lastPopulatedDay = lastPopulatedWeek.days[lastPopulatedWeek.days.length - 1].date.getDate();

    for (let index = 0; index < this._daysInAWeek; index++) {
      days.push({
        date: new Date(this._currentYear, this._currentMonth, lastPopulatedDay + 1 + index),
        otherMonth: false,
      });
    }

    return { days: days, monthWeek: monthWeek };
  }

  private populateLastweek(monthRow: number): CalendarWeek {
    let days: CalendarDay[] = [];
    let daysInMonth = this.getDaysInMonth(this._currentMonth, this._currentYear);
    let nextMonth = this.getNextMonthAndYear(this._currentMonth, this._currentYear);
    let lastPopulatedWeek = this._calendarWeeks[this._calendarWeeks.length - 1];
    let lastPopulatedDay = lastPopulatedWeek.days[lastPopulatedWeek.days.length - 1].date.getDate();

    for (let index = 0; lastPopulatedDay + index + 1 <= daysInMonth; index++) {
      days.push({
        date: new Date(this._currentYear, this._currentMonth, lastPopulatedDay + 1 + index),
        otherMonth: false,
      });
    }

    let remainingDaysLength = this._daysInAWeek - days.length;
    for (let index = 0; index < remainingDaysLength; index++) {
      days.push({
        date: new Date(nextMonth.year, nextMonth.month, 1 + index),
        otherMonth: true,
      });
    }

    return { days: days, monthWeek: monthRow };
  }

  private populateCalendarWeekDays() {
    this._calendarWeekDays = [];
    for (let index = 0; index < this._daysInAWeek; index++) {
      let dayIndex = (this._firstDayOfWeek + index) % 7;
      let weekDay = this._weekDays[dayIndex];
      this._calendarWeekDays.push(weekDay);
    }
  }

  private isFirstWeek(index: number) {
    return index == 0;
  }

  private isLastWeek(index: number, monthRows: number) {
    return index + 1 == monthRows;
  }

  private getFirstDayOfMonthWeekDay(month: number, year: number) {
    let firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
  }

  private getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  private getPreviousMonthAndYear(month: number, year: number) {
    if (month === 0) return { month: 11, year: year - 1 };

    return { month: month - 1, year: year };
  }

  private getNextMonthAndYear(month: number, year: number) {
    if (month === 11) return { month: 0, year: year + 1 };

    return { month: month + 1, year: year };
  }
}
