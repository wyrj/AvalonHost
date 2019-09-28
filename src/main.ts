import Host from './host';
import {CHARACTER, ATTENDEE} from './define';

import Card from './ui/card';

export default class AvalonHost {
  private _host: Host;

  private _cards: Array<Card>;
  private _playBtn: HTMLButtonElement;

  constructor() {
    this.init();
  }

  private init(): void {
    this.initHost();
    this.initCards();
    this.initButton();
  }

  private initHost(): void {
    this._host = new Host();
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
    for (let card of this._cards) {
      card.render(target);
    }
    target.appendChild(this._playBtn);
  }

  public play(): void {
    const attendee: ATTENDEE = {};
    for (let card of this._cards) {
      attendee[card.getName()] = card.isChecked();
    }
    this._host.play(attendee);
  }
}
