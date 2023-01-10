/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GoalAimDateComponent } from './goal-aim-date.component';

describe('GoalCardAimDateComponent', () => {
  let component: GoalAimDateComponent;
  let fixture: ComponentFixture<GoalAimDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalAimDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalAimDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
