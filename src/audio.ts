import {CHARACTER, TEAM, OP, ACTION, AUDIO_FILE} from './define';

function loadAudio(src: string): Promise<HTMLAudioElement> {
  const tag = document.body.appendChild(document.createElement('audio'));
  return new Promise((resolve, reject) => {
    tag.addEventListener('canplaythrough', () => {
      resolve(tag);
    });
    tag.onerror = reject;
    tag.src = `./file/${src}.mp3`;
  });
}

function playAudio(tag: HTMLAudioElement): Promise<void> {
  return new Promise((resolve) => {
    tag.addEventListener('ended', () => resolve());
    tag.play();
  });
}

export default class AudioPlayer {
  private _player: HTMLAudioElement;
  private _scripts: Map<AUDIO_FILE, Promise<HTMLAudioElement>>;
  private _playing: boolean;
  private _sequence: Array<AUDIO_FILE>;

  constructor() {
    this._player = null;
    this._scripts = new Map();
    this._scripts.set(CHARACTER.MERLIN, loadAudio(CHARACTER.MERLIN));
    this._scripts.set(CHARACTER.PERCIVAL, loadAudio(CHARACTER.PERCIVAL));
    this._scripts.set(CHARACTER.MORGANA, loadAudio(CHARACTER.MORGANA));
    this._scripts.set(CHARACTER.MORDRED, loadAudio(CHARACTER.MORDRED));
    this._scripts.set(CHARACTER.OBERON, loadAudio(CHARACTER.OBERON));
    this._scripts.set(TEAM.ALL, loadAudio(TEAM.ALL));
    this._scripts.set(TEAM.RED, loadAudio(TEAM.RED));
    this._scripts.set(OP.AND, loadAudio(OP.AND));
    this._scripts.set(OP.EXCEPT, loadAudio(OP.EXCEPT));
    this._scripts.set(ACTION.OPEN, loadAudio(ACTION.OPEN));
    this._scripts.set(ACTION.CLOSE, loadAudio(ACTION.CLOSE));
    this._scripts.set(ACTION.PUTDOWN, loadAudio(ACTION.PUTDOWN));
    this._scripts.set(ACTION.RAISE, loadAudio(ACTION.RAISE));

    this._playing = false;
    this._sequence = [];
  }

  public async play(sequence: Array<AUDIO_FILE>): Promise<void> {
    this._sequence = sequence;
    this._playing = true;
    await this._play();
    this._playing = false;
  }

  public stop(): void {
    this._playing = false;
    if (this._player) {
      this._player.pause();
      this._player = null;
    }
  }

  private async _play(): Promise<void> {
    if (this._playing && this._sequence.length > 0) {
      await this._playOne();
      await this._play();
    }
  }

  private async _playOne(): Promise<void> {
    const key = this._sequence.shift();
    const loading = this._scripts.get(key);
    if (!loading) {
      return;
    }

    const tag = await loading;
    this._player = tag;
    await playAudio(tag);
    this._player = null;
  }
}
