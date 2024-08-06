import {Component} from '@angular/core';
import {LessonPlanHeroComponentModule, LessonPlanSummaryDs, lessonPlanSummaryDTOMock} from "@jamesbenrobb/product";


@Component({
    selector: 'lesson-plan-hero-example',
    template: `
      <lesson-plan-hero
        class="card"
        [dataProvider]="lessonPlan">
      </lesson-plan-hero>
    `,
    styleUrls: ['./lesson-plan-hero-example.component.scss'],
  standalone: true,
  imports: [
    LessonPlanHeroComponentModule
  ]
})
export class LessonPlanHeroExampleComponent {
  lessonPlan: LessonPlanSummaryDs =  lessonPlanSummaryDTOMock as LessonPlanSummaryDs;
}
