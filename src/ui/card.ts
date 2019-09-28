import { CHARACTER } from "../define";

export default class Card {
  private _el: HTMLInputElement;
  private _textEl: HTMLLabelElement;

  private _rendered: boolean;
  private _name: CHARACTER;

  constructor(name: CHARACTER) {
    this._el = null;
    this._textEl = null;

    this._rendered = false;
    this._name = name;
    this.init();
  }

  private init(): void {
    const el = document.createElement('input');
    el.setAttribute('type', 'checkbox');
    this._el = el;

    const textEl = document.createElement('label');
    textEl.textContent = this._name;
    this._textEl = textEl;
  }

  public render(target: HTMLElement): void {
    if (this._rendered) {
      return;
    }
    this._rendered = true;
    const container = target.appendChild(document.createElement('div'));
    container.appendChild(this._el);
    container.appendChild(this._textEl);
  }

  public getName(): CHARACTER {
    return this._name;
  }

  public isChecked(): boolean {
    return this._el.checked;
  }
}
