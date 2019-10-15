export enum CHARACTER {
  MERLIN = 'merlin',
  PERCIVAL = 'percival',
  MORGANA = 'morgana',
  MORDRED = 'mordred',
  OBERON = 'oberon',
  ASSASSIN = 'assassin'
};

export enum TEAM {
  ALL = 'all',
  RED = 'red',
  BLUE = 'blue'
};

export type ATTENDEE = {[name in CHARACTER]?: boolean};

export enum OP {
  AND = 'and',
  EXCEPT = 'except',
}

export enum ACTION {
  OPEN = 'open',
  CLOSE = 'close',
  PUTDOWN = 'putdown',
  RAISE = 'raise',
}

export type AUDIO_FILE = CHARACTER | TEAM | OP | ACTION;
