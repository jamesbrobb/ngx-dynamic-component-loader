import {Component, Input} from '@angular/core';
import {
  LessonPlanDS,
  LessonPlanDTO,
  LessonPlanHeaderComponentModule,
  lessonPlanMock,
  LessonPlanParser
} from "@jamesbenrobb/product";


@Component({
  selector: 'lesson-plan-header-example',
  template: `
    <lesson-plan-header
      [dataProvider]="lessonPlan">
    </lesson-plan-header>
  `,
  styleUrls: ['./lesson-plan-header-example.component.scss'],
  standalone: true,
  imports: [
    LessonPlanHeaderComponentModule
  ]
})
export class LessonPlanHeaderExampleComponent {

  lessonPlan: LessonPlanDS;

  private _parser: LessonPlanParser;

  constructor(parser: LessonPlanParser) {
      this._parser = parser;
      this.lessonPlan = this._parser.fromDTOToDS(lessonPlanMock as LessonPlanDTO);
  }
}
