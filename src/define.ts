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