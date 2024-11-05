import { Player } from './players';

export enum Team {
  RED = "Rojo",
  WHITE = "Blanco",
  BLUE = "Azul",
  GREEN = "Verde"
}

export interface TeamConfig {
  id: Team;
  players: Player[];
}

export const TEAMS: TeamConfig[] = [
  {
    id: Team.BLUE,
    players: [
      Player.ALVARO_CORNEJO,
      Player.JOSE_LUIS_FERNANDEZ,
      Player.LUIS_CABEZA,
      Player.THOMAS_LAWRENCE,
      Player.CARLOS_SANCHEZ,
      Player.JOSE_RAMON,
      Player.BORJA_MORENO,
      Player.JAVI_CIA
    ]
  },
  {
    id: Team.GREEN,
    players: [
      Player.CURRO_FM,
      Player.KALI,
      Player.DANI_MARTIN,
      Player.JOSE_ANTONIO_MERA,
      Player.RAFAEL_FM,
      Player.MIGUEL_LAGUILLO,
      Player.BORJA_CALZADILLA,
      Player.POLI
    ]
  },
  {
    id: Team.RED,
    players: [
      Player.RAFA_LOPEZ,
      Player.ANGEL_ROMERO,
      Player.CARLOS_PAJARO,
      Player.EZEQUIEL,
      Player.JOSE_CIA,
      Player.PEDRO_RODRIGUEZ,
      Player.DANI_NAVARRO,
      Player.JAIME_RUFO
    ]
  },
  {
    id: Team.WHITE,
    players: [
      Player.ANGEL_AGUADO,
      Player.ALBERTO_MARCA,
      Player.JORGE_PASTOR,
      Player.ALFONSO_OLLERO,
      Player.CASIMIRO_OLTRA,
      Player.BORJA_PARIAS,
      Player.HILARIO,
      Player.ALBERTO_FERNANDEZ
    ]
  }
];
