import {Component, Input} from '@angular/core';
import {LessonPlanCardComponentModule, LessonPlanSummaryDs, lessonPlanSummaryDTOMock} from "@jamesbenrobb/product";
import {NgClass} from "@angular/common";


@Component({
  selector: 'lesson-plan-card-example',
  template: `
  <div class="example-background">

    <lesson-plan-card [ngClass]="{large: isLarge}"
      class="card"
      [dataProvider]="lessonPlan">
    </lesson-plan-card>

  </div>
  `,
  styleUrls: ['./lesson-plan-card-example.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    LessonPlanCardComponentModule
  ]
})
export class LessonPlanCardExampleComponent {

  @Input() isLarge: boolean = false;

  lessonPlan: LessonPlanSummaryDs = lessonPlanSummaryDTOMock as LessonPlanSummaryDs;
}
