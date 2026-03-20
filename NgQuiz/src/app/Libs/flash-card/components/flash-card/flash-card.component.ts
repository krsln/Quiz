import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {FlipCardComponent} from '../flip-card/flip-card.component';

@Component({
  selector: 'q-flash-card',
  imports: [
    FlipCardComponent
  ],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.scss',
})
export class FlashCardComponent implements OnInit {
  @Input() CardItems!: { Front: string; Back: string; }[];

  // How to use two-way data binding between components in angular 2?
  @Input() state!: { index: number; percent: number; };
  @Output() stateChange: EventEmitter<{ index: number; percent: number; }> = new EventEmitter();

  flip: string = 'back';
  settings: any;

  constructor() {
  }

  ngOnInit(): void {

    console.log(this.CardItems);
    this.settings = {
      leftSide: true
    };
    this.setPercent();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 32: // Space
        // TODO: flip
        console.log('TODO: flip');
        this.flip = (this.flip === 'back') ? 'front' : 'back';
        break;
      case 37: // ArrowLeft
        // if (this.state.index + 1 !== 1)
        this.Prev();
        break;
      case 39: // ArrowRight
        // if (this.state.index + 1 !== this.CardItems.length)
        this.Next();
        break;
    }
  }

  setPercent() {
    this.state.percent = 100 / this.CardItems.length * (this.state.index + 1);
  }

  Prev(): void {
    if (this.state.index === 0) {
      this.state.index = this.CardItems.length - 1;
    } else {
      this.state.index--;
    }
    this.setPercent();
  }

  Next(): void {
    if (this.state.index === (this.CardItems.length - 1)) {
      this.state.index = 0;
    } else {
      this.state.index++;
    }
    this.setPercent();
  }

  Play(): void {
    this.Next();
  }

  Shuffle(): void {
    this.Prev();
  }
}
