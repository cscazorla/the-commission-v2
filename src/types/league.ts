import { Player } from './players'
import { Team } from './teams'

export interface Goal {
  scorer: Player
  isOwnGoal?: boolean
}

export interface Match {
  id: string
  matchDay: number
  date: string
  time: string
  played: boolean
  homeTeamId: Team
  awayTeamId: Team
  homeGoals: Goal[]
  awayGoals: Goal[]
}

export interface TeamStats {
  teamId: Team
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
}

export interface PlayerStats {
  playerId: Player
  goals: number
}

export interface LeagueData {
  matches: Match[]
}
