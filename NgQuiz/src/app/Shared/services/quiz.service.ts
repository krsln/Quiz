import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {IResponse, QuizItem} from '../../Models';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuizService {

  private Data: BehaviorSubject<QuizItem[]> = new BehaviorSubject<QuizItem[]>([]);

  TestData: QuizItem[] = [
    {Id: 1, Term: 'One', Definition: 'One - Bir'},
    {Id: 2, Term: 'Two', Definition: 'Two - İki'},
    {Id: 3, Term: 'Three', Definition: 'Three - Üç'},
    {Id: 4, Term: 'Four', Definition: 'Four - Dört'},
    {
      Id: 5, Term: 'Dil nedir?',
      Definition: 'bir toplumu oluşturan kişilerin duygu ve düşüncelerini, ses ve anlam bakımından geçerli ortak öğeler ve kurallardan yararlanarak başkalarına aktarmasını sağlayan, çok yönlü ve gelişmiş bir sistemdir.'
    },
  ];

  constructor(protected http: HttpClient) {
    this.Data.next(this.TestData.slice());
  }

  GetAll(): Observable<IResponse<QuizItem[]>> {
    // return this.http.post<IResponse<QuizItem[]>>(this.State.Urls.Star, {});
    return this.Data.pipe(map((data) => {
      const ret: IResponse<QuizItem[]> = {
        State: null,
        Data: data
      };
      return ret;
    }));
  }

  Get(id: number): Observable<IResponse<QuizItem>> {
    // return this.http.get<IResponse<QuizItem>>(`${this.State.Urls.Star}/${id}`);
    return new Observable<IResponse<QuizItem>>((observer) => {
      setTimeout(() => {
        const data: IResponse<QuizItem> = {
          State: null,
          Data: this.TestData.slice().find(x => x.Id === id)!
        };
        observer.next(data);
      }, 50);
    });
  }

  Add(star: QuizItem) {
    // return this.http.post<IResponse<QuizItem>>(this.State.Urls.Add, star).subscribe((res) => {
    //   console.log('Add', res);
    // });
  }

  Update(star: QuizItem) {
    // return this.http.post<IResponse<QuizItem>>(this.State.Urls.Update, star).subscribe((res) => {
    //   console.log('Update', res);
    // });
  }

  Delete(id: number) {
    // return this.http.get<IResponse<boolean>>(`${this.State.Urls.Delete}/${id}`).subscribe((res) => {
    //   console.log('Delete', res);
    // });
  }
}
