enum CHARACTER {
  MERLIN = 'merlin',
  PERCIVAL = 'percival',
  MORGANA = 'morgana',
  MORDRED = 'mordred',
  OBERON = 'oberon',
  ASSASSIN = 'assassin'
};

enum TEAM {
  ALL = 'all',
  RED = 'red',
  BLUE = 'blue'
}

type ATTENDEE = {[name in CHARACTER]?: boolean};

function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}

export default class AvalonHost {
  private _openInterval: number;
  private _attendee: ATTENDEE;

  constructor(inteval: number) {
    this._openInterval = inteval || 3;
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

  private async merlinRound(): void {
    const mordred = this.hasMordred() ? [CHARACTER.MORDRED] : [];
    await this.raiseHand([TEAM.RED], mordred);
    await this.openEyes([CHARACTER.MERLIN]);
    await sleep(this._openInterval);
    await this.closeEyes([CHARACTER.MERLIN]);
    await this.putDownHand([TEAM.RED]);
  }

  private async percivalRound(): void {
    await this.raiseHand([CHARACTER.MERLIN, CHARACTER.MORGANA]);
    await this.openEyes([CHARACTER.PERCIVAL]);
    await sleep(this._openInterval);
    await this.closeEyes([CHARACTER.PERCIVAL]);
    await this.putDownHand([CHARACTER.MERLIN, CHARACTER.MORGANA]);
  }

  private async openEyes(who: Array<CHARACTER | TEAM>, exception?: Array<CHARACTER>): Promise<void> {
    const exceptionString = (exception && exception.length) > 0 ? `except ${exception.join(' ')}` : '';
    console.log(`${who.join(' ')} ${exceptionString} open eyes.`);
  }

  private async closeEyes(who: Array<CHARACTER | TEAM>): Promise<void> {
    console.log(`${who.join(' ')} close eyes.`);
  }

  private async raiseHand(who: Array<CHARACTER | TEAM>, exception?: Array<CHARACTER>): Promise<void> {
    const exceptionString = (exception && exception.length) > 0 ? `except ${exception.join(' ')}` : '';
    console.log(`${who.join(' ')} ${exceptionString} raise hand.`);
  }

  private async putDownHand(who: Array<CHARACTER | TEAM>): Promise<void> {
    console.log(`${who.join(' ')} put down hand.`);
  }
}
