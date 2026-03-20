import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'q-question-multiple-choice',
  imports: [],
  templateUrl: './question-multiple-choice.component.html',
  styleUrl: './question-multiple-choice.component.scss',
})
export class QuestionMultipleChoiceComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => {

    }, 500);
  }

  Speech(textTTS: string) {
    // TODO: Speech
  }

}
