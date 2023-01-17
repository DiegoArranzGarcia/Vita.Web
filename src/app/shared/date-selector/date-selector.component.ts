import { ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { faCalendarDay, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { Week } from 'src/app/shared/week-picker/week-picker.component';
import { Month as Month } from 'src/app/shared/month-picker/month-picker.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'vita-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectorComponent),
      multi:true
    }
  ]
})

export class DateSelectorComponent implements ControlValueAccessor, OnInit {

  @Input() dateSelected: { start: Date; end: Date };

  _aimDateIcon = faCalendarDay;
  _addAimDateIcon = faCalendarPlus;

  _options: string[];
  _selectedOption: string;

  onChange = (value) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  public get day(): Date {
    return this._dateSelected?.start;
  }

  public get month(): Month {
    if (!this._dateSelected?.start) return null;

    return { month: this._dateSelected.start.getMonth(), year: this._dateSelected.start.getFullYear() };
  }

  public get week(): Week {
    if (!this._dateSelected?.start) return null;

    return { startDate: this._dateSelected.start, endDate: this._dateSelected.end };
  }

  public get year(): number {
    if (!this._dateSelected?.start) return null;

    return this._dateSelected.start.getFullYear();
  }

  public get _dateSelected() : ({ start: Date, end: Date}) {
    return !!this.dateSelected ?
           ({ start: new Date(this.dateSelected.start), end: new Date(this.dateSelected.end)}) :
           undefined;
  }

  @ViewChild('modal') modal: ModalComponent;

  ngOnInit() {
    this._options = ['Year', 'Month', 'Week', 'Day'];
    this._selectedOption = this.getOption(this._dateSelected);
  }

  writeValue(newValue: any): void {
    this.dateSelected = newValue;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  getOption(date: { start: Date; end: Date }): string {
    if (!date?.start && !date?.end) return 'Day';

    if (
      date.start.getFullYear() == date.end.getFullYear() &&
      date.start.getDate() === 1 &&
      date.start.getMonth() === 0 &&
      date.end.getDate() === 31 &&
      date.end.getMonth() === 11
    )
      return 'Year';

    if (date.start.getDate() == date.end.getDate()) return 'Day';

    if (this.daysBetween(date.start, date.end) === 6) return 'Week';

    return 'Month';
  }

  private daysBetween(start: Date, end: Date) {
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = end.getTime() - start.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  private markAsTouched() {
    if (this.touched)
      return;

    this.onTouched();
    this.touched = true;
  }

  toogleAimDatePicker(event: Event) {
    this.modal.toogle();
    event.preventDefault();
  }

  onSelectedDate(date: Date) {
    this.markAsTouched();
    this.onChange({ start: date, end: date });
    this.modal.toogle();
  }

  onSelectedWeek(week: Week) {
    this.markAsTouched();
    this.onChange({ start: week.startDate, end: week.endDate });
    this.modal.toogle();
  }

  onSelectedYear(year: number) {
    let startOfYear = new Date(year, 0, 1);
    let endOfYear = new Date(year, 11, 31);
    
    this.markAsTouched();
    this.onChange({ start: startOfYear, end: endOfYear });
    this.modal.toogle();
  }

  onSelectedMonth(month: Month) {
    let firstDayOfMonth = new Date(month.year, month.month, 1);
    let lastDayOfMonth = new Date(month.year, month.month + 1, 0);
    let date = { start: firstDayOfMonth, end: lastDayOfMonth };

    this.markAsTouched();
    this.modal.toogle();
    this.onChange(date);
  }
  
}
