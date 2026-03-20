import {Component, input, model, output, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlashCard} from '../../../../Models';

@Component({
  selector: 'q-flash-card',
  imports: [CommonModule],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FlashCardComponent {
  /** The card data */
  card = input.required<FlashCard>();

  /** Two-way flip state controlled by parent */
  isFlipped = model<boolean>(false);

  /** Events for parent */
  onSpeak = output<'front' | 'back'>();
  onFavorite = output<void>();
  onEdit = output<void>();

  flip(): void {
    this.isFlipped.update(v => !v);
  }

  speak(side: 'front' | 'back'): void {
    this.onSpeak.emit(side);
  }
}
