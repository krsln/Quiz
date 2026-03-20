import { Component } from '@angular/core';
import {
  QuestionWrittenComponent
} from '../../../../Libs/question/components/question-written/question-written.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-writing',
  imports: [
    QuestionWrittenComponent,
    RouterLink
  ],
  templateUrl: './writing.component.html',
  styleUrl: './writing.component.scss',
})
export class WritingComponent {}
