import {Component, Input} from "@angular/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {
  LessonPlanSummaryDs,
  lessonPlanSummaryDTOMock,
  MyLibraryLessonPlanCardComponentModule
} from "@jamesbenrobb/product";

@Component({
  selector: 'my-library-lesson-plan-card-example',
  template: `
    <my-library-lesson-plan-card class="card"
       [dataProvider]="lessonPlan"
       [menu]="displayMenu ? menu : undefined">

      <mat-menu #menu="matMenu">

        <button mat-menu-item
                (click)="onDoSomethingClick(lessonPlan)">Do something</button>

        <button mat-menu-item
                (click)="onDoSomethingElseClick(lessonPlan)">Do something else</button>

      </mat-menu>

    </my-library-lesson-plan-card>
  `,
  styleUrls: ['./my-library-lesson-plan-card-example.scss'],
  standalone: true,
  imports: [
    MatMenuModule,
    MatButtonModule,
    MyLibraryLessonPlanCardComponentModule
  ]
})
export class MyLibraryLessonPlanCardExampleComponent {

  @Input() displayMenu: boolean = false;

  lessonPlan: LessonPlanSummaryDs = lessonPlanSummaryDTOMock as LessonPlanSummaryDs;


  public onDoSomethingClick(item: LessonPlanSummaryDs): void {
    console.log('onDoSomethingClick', item);
  }

  public onDoSomethingElseClick(item: LessonPlanSummaryDs): void {
    console.log('onDoSomethingElseClick', item);
  }
}
