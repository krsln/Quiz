import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {AdminCrudComponent} from './components/admin-crud/admin-crud.component';
import {FlashCardsComponent} from './components/flash-cards/flash-cards.component';
import {MultiChoiceComponent} from './components/multi-choice/multi-choice.component';
import {WritingComponent} from './components/writing/writing.component';

const routes: Routes = [
  {
    path: '', data: {breadcrumb: 'Home'},
    children: [
      {path: '', data: {breadcrumb: 'Home'}, component: HomeComponent},
      {path: 'FlashCard', data: {breadcrumb: 'FlashCard'}, component: FlashCardsComponent},
      {path: 'MultipleChoice', data: {breadcrumb: 'MultipleChoice'}, component: MultiChoiceComponent},
      {path: 'Write', data: {breadcrumb: 'Write'}, component: WritingComponent},
      {path: 'CRUD', data: {breadcrumb: 'CRUD'}, component: AdminCrudComponent},
      {path: 'CRUD/:Id', data: {breadcrumb: 'CRUD'}, component: AdminCrudComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
