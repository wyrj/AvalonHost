import {CHARACTER, TEAM, ATTENDEE, OP, ACTION, AUDIO_FILE} from './define';
import AudioPlayer from './audio';

function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}

export default class Host {
  private _openInterval: number;
  private _attendee: ATTENDEE;
  private _player: AudioPlayer;

  constructor(inteval?: number) {
    this._openInterval = inteval || 3;
    this._player = new AudioPlayer();
  }

  public async play(attendee: ATTENDEE): Promise<void> {
    this._attendee = attendee;

    await this.closeEyes([TEAM.ALL]);
    await sleep(1);
    await this.redRound();
    await sleep(1);
    await this.merlinRound();
    await sleep(1);
    if (this.hasPercival()) {
      await this.percivalRound();
      await sleep(1);
    }
    await this.openEyes([TEAM.ALL]);
  }

  private hasPercival(): boolean {
    return this._attendee[CHARACTER.PERCIVAL];
  }

  private hasMordred(): boolean {
    return this._attendee[CHARACTER.MORDRED];
  }

  private hasOberon(): boolean {
    return this._attendee[CHARACTER.OBERON];
  }

  private async redRound(): Promise<void> {
    const oberon = this.hasOberon() ? [CHARACTER.OBERON] : [];
    await this.raiseHand([TEAM.RED], oberon);
    await this.openEyes([TEAM.RED], oberon);
    await sleep(this._openInterval);
    await this.closeEyes([TEAM.RED]);
    await this.putDownHand([TEAM.RED]);
  }

  private async merlinRound(): Promise<void> {
    const mordred = this.hasMordred() ? [CHARACTER.MORDRED] : [];
    await this.raiseHand([TEAM.RED], mordred);
    await this.openEyes([CHARACTER.MERLIN]);
    await sleep(this._openInterval);
    await this.closeEyes([CHARACTER.MERLIN]);
    await this.putDownHand([TEAM.RED]);
  }

  private async percivalRound(): Promise<void> {
    await this.raiseHand([CHARACTER.MERLIN, CHARACTER.MORGANA]);
    await this.openEyes([CHARACTER.PERCIVAL]);
    await sleep(this._openInterval);
    await this.closeEyes([CHARACTER.PERCIVAL]);
    await this.putDownHand([CHARACTER.MERLIN, CHARACTER.MORGANA]);
  }

  private async openEyes(who: Array<CHARACTER | TEAM>, exception?: Array<CHARACTER>): Promise<void> {
    await this.doAction(who, exception || [], ACTION.OPEN);
  }

  private async closeEyes(who: Array<CHARACTER | TEAM>): Promise<void> {
    await this.doAction(who, [], ACTION.CLOSE);
  }

  private async raiseHand(who: Array<CHARACTER | TEAM>, exception?: Array<CHARACTER>): Promise<void> {
    await this.doAction(who, exception || [], ACTION.RAISE);
  }

  private async putDownHand(who: Array<CHARACTER | TEAM>): Promise<void> {
    await this.doAction(who, [], ACTION.PUTDOWN);
  }

  private async doAction(who: Array<CHARACTER | TEAM>, exception: Array<CHARACTER>, action: ACTION): Promise<void> {
    const seq: Array<AUDIO_FILE> = [who[0]];
    for (let i = 1; i < who.length; i++) {
      seq.push(OP.AND, who[i]);
    }
    if (exception.length > 0) {
      seq.push(OP.EXCEPT, ...exception);
    }
    seq.push(action);
    await this._player.play(seq);
  }
}
