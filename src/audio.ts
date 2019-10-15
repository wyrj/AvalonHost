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
    tag.addEventListener('pause', () => {
      resolve();
    });
    tag.play();
  });
}

const scripts: Map<AUDIO_FILE, Promise<HTMLAudioElement>> = new Map();
scripts.set(CHARACTER.MERLIN, loadAudio(CHARACTER.MERLIN));
scripts.set(CHARACTER.PERCIVAL, loadAudio(CHARACTER.PERCIVAL));
scripts.set(CHARACTER.MORGANA, loadAudio(CHARACTER.MORGANA));
scripts.set(CHARACTER.MORDRED, loadAudio(CHARACTER.MORDRED));
scripts.set(CHARACTER.OBERON, loadAudio(CHARACTER.OBERON));
scripts.set(TEAM.ALL, loadAudio(TEAM.ALL));
scripts.set(TEAM.RED, loadAudio(TEAM.RED));
scripts.set(OP.AND, loadAudio(OP.AND));
scripts.set(OP.EXCEPT, loadAudio(OP.EXCEPT));
scripts.set(ACTION.OPEN, loadAudio(ACTION.OPEN));
scripts.set(ACTION.CLOSE, loadAudio(ACTION.CLOSE));
scripts.set(ACTION.PUTDOWN, loadAudio(ACTION.PUTDOWN));
scripts.set(ACTION.RAISE, loadAudio(ACTION.RAISE));

export default class AudioPlayer {
  private _player: HTMLAudioElement;

  constructor() {
    this._player = null;
  }

  public async play(file: AUDIO_FILE): Promise<void> {
    const tag = await scripts.get(file);
    this._player = tag;
    await playAudio(tag);
    this._player = null;
  }

  public pause(): void {
    if (!this._player) {
      return;
    }
    this._player.pause();
    this._player.currentTime = 0;
    this._player = null;
  }
}
