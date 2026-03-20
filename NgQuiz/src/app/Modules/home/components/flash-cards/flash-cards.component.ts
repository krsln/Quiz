import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {QuizItem} from '../../../../Models';
import {QuizService} from '../../../../Shared/services/quiz.service';
import {FlashCardComponent} from '../../../../Libs/flash-card/components/flash-card/flash-card.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-flash-cards',
  imports: [
    FlashCardComponent,
    RouterLink
  ],
  templateUrl: './flash-cards.component.html',
  styleUrl: './flash-cards.component.scss',
})
export class FlashCardsComponent implements OnInit, OnDestroy {
  Subscription!: Subscription;
  Items: QuizItem[] = [];
  CardItems: { front: string; back: string; }[] = [];
  cardState!: { index: number; percent: number; } ;

  constructor(private quizService: QuizService,) {
  }

  ngOnInit(): void {
    this.Subscription = this.quizService.GetAll().subscribe(res => {
      this.Items = res.Data;

      this.CardItems = this.Items.map(x => {
        return {front: x.Term, back: x.Definition};
      });
      this.cardState = {index: 0, percent: 100 / this.CardItems.length};

    });

  }

  ngOnDestroy(): void {
    if (this.Subscription) {
      this.Subscription.unsubscribe();
    }
  }
}
