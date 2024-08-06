import {Component, Input} from '@angular/core';
import {
  LessonPlanGridComponentModule,
  LessonPlanSummaryDs,
  lessonPlanSummaryDTOCollectionMock, MyLibraryLessonPlanCardComponentModule
} from "@jamesbenrobb/product";
import {NgClass} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";


@Component({
  selector: 'lesson-plan-grid-example',
  template: `
    <div class="grid-wrapper" [ngClass]="{'grey-bg': showMyLibraryCard}">

      <lesson-plan-grid class="grid"
        [dataProvider]="dataProvider"
        [header]="header"
        [title]="title"
        [showHero]="showHero && !showMyLibraryCard"
        [fiveCardLayout]="fancyLayout && !showMyLibraryCard"
        [itemTemplate]="showMyLibraryCard ? itemTemplate : undefined"
        (lessonPlanSelected)="onLessonPlanSelect($event)">

        <ng-template let-item="item" #itemTemplate>

          <my-library-lesson-plan-card
            [dataProvider]="item"
            [menu]="menu">

            <mat-menu #menu="matMenu"
                      [overlapTrigger]="false"
                      [xPosition]="'before'">

              <button mat-menu-item
                      [disableRipple]="true"
                      (click)="onDuplicateClick(item)">Duplicate</button>

              <button mat-menu-item class="destructive"
                      disableRipple="true"
                      (click)="onDeleteClick(item)">Delete</button>

            </mat-menu>

          </my-library-lesson-plan-card>

        </ng-template>

      </lesson-plan-grid>

    </div>
  `,
  styleUrls: ['./lesson-plan-grid-example.component.scss'],
  standalone: true,
  imports: [
    LessonPlanGridComponentModule,
    MyLibraryLessonPlanCardComponentModule,
    NgClass,
    MatMenuModule
  ]
})
export class LessonPlanGridExampleComponent {

  public dataProvider: LessonPlanSummaryDs[] = lessonPlanSummaryDTOCollectionMock.default as LessonPlanSummaryDs[];

  @Input() header = 'Header';
  @Input() title = 'Title';

  @Input() showHero: boolean = false;
  @Input() fancyLayout: boolean = false;
  @Input() showMyLibraryCard: boolean = false;

  onLessonPlanSelect(item: LessonPlanSummaryDs): void {
    console.log('Selected:', item);
  }

  public onDuplicateClick(item: LessonPlanSummaryDs): void {
      console.log('Duplcate:', item);
  }

  public onDeleteClick(item: LessonPlanSummaryDs): void {
    console.log('Delete:', item);
  }
}
