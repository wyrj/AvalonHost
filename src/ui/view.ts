import {CHARACTER, ATTENDEE} from '../define';

import Card from './card';

import EventEmitter3 from 'eventemitter3';

export default class View extends EventEmitter3 {
  private _cards: Array<Card>;
  private _playBtn: HTMLButtonElement;

  constructor() {
    super();
    this.init();
  }

  private init(): void {
    this.initCards();
    this.initButton();
  }

  private initCards(): void {
    this._cards = [
      new Card(CHARACTER.PERCIVAL),
      new Card(CHARACTER.MORDRED),
      new Card(CHARACTER.OBERON),
    ];
  }

  private initButton(): void {
    const button = document.createElement('button');
    button.textContent = 'Play';
    button.addEventListener('click', () => this.play());
    this._playBtn = button;
  }

  public render(target: HTMLElement): void {
    const container = target.appendChild(document.createElement('div'));
    for (let card of this._cards) {
      card.render(container);
    }
    container.appendChild(this._playBtn);
  }

  public play(): void {
    const attendee: ATTENDEE = {};
    for (let card of this._cards) {
      attendee[card.getName()] = card.isChecked();
    }
    this.emit('play', attendee);
  }
}
