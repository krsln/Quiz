import {Injectable, signal} from '@angular/core';
import {FlashCard} from '../../Models';

@Injectable({providedIn: 'root'})
export class FlashCardService {
  private cardsSignal = signal<FlashCard[]>([
    {id: '1', front: 'What is the capital of Turkey?', back: 'Ankara', isFavorite: true},
    {id: '2', front: 'What does HTTP stand for?', back: 'HyperText Transfer Protocol'},
    {id: '3', front: '2 + 2 = ?', back: '4'},
    // ... istediğin kadar ekle
  ]);

  getDeck() {
    return this.cardsSignal.asReadonly();
  }

  // Gerçek projede: HttpClient + effect ile yükle
}
