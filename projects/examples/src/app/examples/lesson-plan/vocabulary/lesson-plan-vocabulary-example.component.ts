import { Component } from '@angular/core';
import {
  WordSenseDS,
  WordSenseDTO,
  WordSenseParser,
  wordSenseDTOCollectionMock,
  LessonPlanVocabularyComponentModule
} from "@jamesbenrobb/product";


@Component({
  selector: 'lesson-plan-vocabulary-example',
  template: `
    <lesson-plan-vocabulary
      [dataProvider]="dataProvider">
    </lesson-plan-vocabulary>
  `,
  styleUrls: ['./lesson-plan-vocabulary-example.component.scss'],
  standalone: true,
  imports: [
    LessonPlanVocabularyComponentModule
  ]
})
export class LessonPlanVocabularyExampleComponent {

  dataProvider: WordSenseDS[];

  constructor() {
    this.dataProvider = WordSenseParser.fromDTOArrayToDSArray(wordSenseDTOCollectionMock.default as WordSenseDTO[]);
  }
}
