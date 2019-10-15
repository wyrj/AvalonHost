import Host from './host';
import {ATTENDEE} from './define';

import View from './ui/view';

export default class AvalonHost {
  private _host: Host;

  constructor(rootEl: HTMLElement) {
    this.init(rootEl);
  }

  private init(rootEl: HTMLElement): void {
    this.initView(rootEl);
  }

  private initView(rootEl: HTMLElement): void {
    const view = new View();
    view.on('play', (attendee) => this.play(attendee));
    view.on('pause', () => this.pause());
    view.render(rootEl);
  }

  private play(attendee: ATTENDEE): void {
    if (this._host) {
      this._host.pause();
    }
    this._host = new Host(attendee);
    this._host.play();
  }

  private pause(): void {
    if (!this._host) {
      return;
    }
    this._host.pause();
    this._host = null;
  }
}
