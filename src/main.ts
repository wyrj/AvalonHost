import Host from './host';

import View from './ui/view';

export default class AvalonHost {
  private _host: Host;

  constructor(rootEl: HTMLElement) {
    this.init(rootEl);
  }

  private init(rootEl: HTMLElement): void {
    this.initHost();
    this.initView(rootEl);
  }

  private initHost(): void {
    this._host = new Host();
  }

  private initView(rootEl: HTMLElement): void {
    const view = new View();
    view.on('play', (attendee) => this._host.play(attendee));
    view.render(rootEl);
  }
}
