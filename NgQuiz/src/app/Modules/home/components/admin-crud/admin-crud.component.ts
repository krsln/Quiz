import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router, RouterLink} from "@angular/router";

import {QuizItem} from '../../../../Models';
import {QuizService} from '../../../../Shared/services/quiz.service';
import {FormsModule} from '@angular/forms';
import {Highlight} from 'ngx-highlightjs';
import {FilterPipe} from '../../../../Shared/pipes/filter.pipe';

@Component({
  selector: 'app-admin-crud',
  imports: [
    RouterLink,
    FormsModule,
    Highlight,
    FilterPipe
  ],
  templateUrl: './admin-crud.component.html',
  styleUrl: './admin-crud.component.scss',
})
export class AdminCrudComponent implements OnInit, OnDestroy {
  Subscription!: Subscription;
  Items: QuizItem[] = [];
  Item: QuizItem = {Id: 0, Term: '', Definition: ''};
  filterText: string = "";

  constructor(private route: ActivatedRoute, private router: Router,
              private quizService: QuizService) {
  }

  ngOnInit(): void {
    this.Subscription = this.quizService.GetAll().subscribe(res => {
      this.Items = res.Data;
    });

    this.route.params.subscribe(params => {
      // console.log(params, +params['Id']);
      const id = +params['Id'];
      if (id && this.Items.length > 0) {
        const selected = this.Items.find(x => x.Id === id);
        if (selected) this.Item = selected;
      }
    });

  }

  stringify = (): string => JSON.stringify(this.Item, null, '\t');

  Save() {
    if (!!this.Item.Term && !!this.Item.Definition) {

      if (this.Item.Id === 0) {
        this.Items?.push(this.Item);
        this.quizService.Add(this.Item);
      } else {
        this.quizService.Update(this.Item);
      }

      this.Item = {Id: 0, Term: '', Definition: ''};
      this.router.navigate(['/Home/CRUD'], {relativeTo: this.route}).then();
    }
  }

  onDelete(item: QuizItem) {
    this.quizService.Delete(item.Id);
  }

  ngOnDestroy(): void {
    if (this.Subscription) {
      this.Subscription.unsubscribe();
    }
  }
}
