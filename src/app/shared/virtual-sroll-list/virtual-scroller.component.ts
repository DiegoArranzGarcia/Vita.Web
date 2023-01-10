import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'vita-virtual-scroller',
    templateUrl: './virtual-scroller.component.html',
    styleUrls: ['./virtual-scroller.component.sass'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
  })

export class VirtualScroller { 
  @Input() items: any[];
  @Input() itemTemplate: TemplateRef<any>;
}
  