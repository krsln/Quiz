import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {signal, computed, effect} from '@angular/core';
import {FlashCard, DeckState} from '../../../../Models';
import {FlashCardService} from '../../../../Shared/services/flash-card.service';
import {FlashCardComponent} from '../../../../Libs/flash-card/components/flash-card/flash-card.component';


@Component({
  selector: 'q-flash-card-deck',
  standalone: true,
  imports: [CommonModule, FlashCardComponent],
  templateUrl: './flash-card-deck.component.html',
  styleUrl: './flash-card-deck.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class FlashCardDeckComponent implements OnInit {
  private service = inject(FlashCardService);

  // === STATE ===
  cards = this.service.getDeck();
  state = signal<DeckState>({index: 0, isFlipped: false, isPlaying: false, progress: 0});

  currentCard = computed(() => this.cards()[this.state().index]);
  total = computed(() => this.cards().length);
  progressPercent = computed(() => ((this.state().index + 1) / this.total()) * 100);

  private autoPlayInterval: any = null;

  ngOnInit() {
    // Keyboard support (professional touch)
    document.addEventListener('keydown', this.handleKeyboard.bind(this));
    this.updateProgress();
  }

  flip() {
    this.state.update(s => ({...s, isFlipped: !s.isFlipped}));
  }

  next() {
    this.animateTransition('right');
    this.state.update(s => ({
      ...s,
      index: s.index === this.total() - 1 ? 0 : s.index + 1,
      isFlipped: false // yeni kartta her zaman arka yüz
    }));
    this.updateProgress();
  }

  prev() {
    this.animateTransition('left');
    this.state.update(s => ({
      ...s,
      index: s.index === 0 ? this.total() - 1 : s.index - 1,
      isFlipped: false
    }));
    this.updateProgress();
  }

  shuffle() {
    // Fisher-Yates + signal update
    const shuffled = [...this.cards()];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // TODO: Service'te cards'ı model yaparsan burada set edersin
    this.state.update(s => ({...s, index: 0, isFlipped: false}));
    console.log('🎲 Deck shuffled!');
  }

  togglePlay() {
    this.state.update(s => ({...s, isPlaying: !s.isPlaying}));
    if (this.state().isPlaying) this.startAutoPlay();
    else this.stopAutoPlay();
  }

  private startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.flip();
      setTimeout(() => this.next(), 3000);
    }, 4500);
  }

  private stopAutoPlay() {
    clearInterval(this.autoPlayInterval);
  }

  private updateProgress() {
    this.state.update(s => ({...s, progress: this.progressPercent()}));
  }

  private handleKeyboard(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      this.flip();
    }
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key.toLowerCase() === 'p') this.togglePlay();
    if (e.key.toLowerCase() === 's') this.shuffle();
  }

  private animateTransition(direction: 'left' | 'right') {
    // CSS class ile fly animasyonunu tetikleyebilirsin (isteğe bağlı)
  }

  // Action handlers
  speak(side: 'front' | 'back') {
    console.log(`🗣️ Speaking ${side}:`, this.currentCard());
  }

  toggleFavorite() {
    console.log('❤️ Favorite toggled');
  }

  edit() {
    console.log('✍️ Edit mode opened');
  }
}
