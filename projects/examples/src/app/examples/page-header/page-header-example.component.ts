import {Component, Input, OnChanges} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {PageHeaderComponentModule, OVERLAY_COLORS, FALLBACK_COLORS} from "@jamesbenrobb/product";


@Component({
  selector: 'page-header-example',
  template: `
<page-header
  [title]="title"
  [fallbackSeed]="fallbackSeed"
  [fallbackColor]="fallbackColor"
  [overlayColor]="overlayColor"
  [imageUrl]="imageUrl">

  <ng-container class="page-header-top-slot">

    <div class="slot-content"
         [style.height.px]="topSlotContentHeight"
         [style.border-width.px]="topSlotBorderWidth">
    </div>

  </ng-container>

  <ng-container class="page-header-content-slot">

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

    <div *ngIf="contentSlotBorderWidth"
         class="slot-content"
         [style.height.px]="contentSlotContentHeight"
         [style.border-width.px]="contentSlotBorderWidth">
    </div>

  </ng-container>

</page-header>
`,
  styleUrls: ['./page-header-example.scss']
})
export class PageHeaderExampleComponent implements OnChanges {

  @Input() title?: string;
  @Input() fallbackSeed?: string;
  @Input() fallbackColor?: FALLBACK_COLORS;
  @Input() overlayColor: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
  @Input() imageUrl?: string;
  @Input() imageSize?: string;

  @Input() topSlotContentHeight: number = 0;
  @Input() contentSlotContentHeight: number = 0;

  public topSlotBorderWidth: number = 0;
  public contentSlotBorderWidth: number = 0;


  ngOnChanges(): void {
    this.topSlotBorderWidth = this._getBorderWidth(this.topSlotContentHeight);
    this.contentSlotBorderWidth = this._getBorderWidth(this.contentSlotContentHeight);
  }

  private _getBorderWidth(height: number): number {

    if (height === 0 || isNaN(height)) {
      return 0;
    }

    if (height === 1) {
      return 0.5;
    }

    return 1;
  }
}


@NgModule({
  imports: [
    CommonModule,
    PageHeaderComponentModule
  ],
  declarations: [
    PageHeaderExampleComponent
  ]
})
export class PageHeaderExampleComponentModule  {}
