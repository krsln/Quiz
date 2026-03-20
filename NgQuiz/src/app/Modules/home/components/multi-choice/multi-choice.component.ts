import { Component } from '@angular/core';
import {
  QuestionMultipleChoiceComponent
} from '../../../../Libs/question/components/question-multiple-choice/question-multiple-choice.component';

@Component({
  selector: 'app-multi-choice',
  imports: [
    QuestionMultipleChoiceComponent
  ],
  templateUrl: './multi-choice.component.html',
  styleUrl: './multi-choice.component.scss',
})
export class MultiChoiceComponent {}
