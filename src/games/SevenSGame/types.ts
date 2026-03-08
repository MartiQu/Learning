export type ZoneId =
  | 'skirot'
  | 'sakartot'
  | 'spodrinat'
  | 'standardizet'
  | 'stiprinat'
  | 'sargat'
  | 'komandas';

export type GamePhase = 'intro' | ZoneId | 'results';

export interface ZoneResult {
  zoneId: ZoneId;
  score: number;
  label: string;
}
