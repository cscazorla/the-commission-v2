import { Match, PlayerStats, TeamStats } from '../types/league'
import { Player } from '../types/players'
import { Team } from '../types/teams'



export function calculateTeamStats(matches: Match[]): TeamStats[] {
  // Initialize stats for all teams
  const stats = new Map<Team, TeamStats>()

  // Initialize all teams with default values
  Object.values(Team).forEach((teamId) => {
    stats.set(teamId, {
      teamId: teamId as Team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    })
  })

  // Process only played matches
  matches
    .filter(match => match.played)
    .forEach((match) => {
      const homeStats = stats.get(match.homeTeamId)!
      const awayStats = stats.get(match.awayTeamId)!

      const homeGoals = match.homeGoals.length
      const awayGoals = match.awayGoals.length

      // Update played games
      homeStats.played += 1
      awayStats.played += 1

      // Update goals
      homeStats.goalsFor += homeGoals
      homeStats.goalsAgainst += awayGoals
      awayStats.goalsFor += awayGoals
      awayStats.goalsAgainst += homeGoals

      // Update wins/draws/losses and points
      if (homeGoals > awayGoals) {
        homeStats.won += 1
        awayStats.lost += 1
        homeStats.points += 3
      } else if (awayGoals > homeGoals) {
        awayStats.won += 1
        homeStats.lost += 1
        awayStats.points += 3
      } else {
        homeStats.drawn += 1
        awayStats.drawn += 1
        homeStats.points += 1
        awayStats.points += 1
      }

      // Update goal differences
      homeStats.goalDifference = homeStats.goalsFor - homeStats.goalsAgainst
      awayStats.goalDifference = awayStats.goalsFor - awayStats.goalsAgainst
    })

  return Array.from(stats.values()).sort(sortTeams)
}

function sortTeams(a: TeamStats, b: TeamStats): number {
  if (b.points !== a.points) return b.points - a.points
  if (b.goalDifference !== a.goalDifference)
    return b.goalDifference - a.goalDifference
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
  return String(a.teamId).localeCompare(String(b.teamId))
}

export interface PlayerStatsWithMatchDays extends PlayerStats {
  teamId: Team
  matchDayGoals: { [key: number]: number }
}

export function calculatePlayerStats(
  matches: Match[]
): PlayerStatsWithMatchDays[] {
  const playerStats = new Map<Player, PlayerStatsWithMatchDays>()
  const playerTeams = new Map<Player, Team>()

  matches.forEach((match) => {
    // Track home team players
    match.homeGoals
      .filter((goal) => !goal.isOwnGoal)
      .forEach((goal) => {
        playerTeams.set(goal.scorer, match.homeTeamId)
        const stats = getOrCreatePlayerStats(
          playerStats,
          goal.scorer,
          match.homeTeamId
        )
        stats.goals += 1
        stats.matchDayGoals[match.matchDay] =
          (stats.matchDayGoals[match.matchDay] || 0) + 1
      })

    // Track away team players
    match.awayGoals
      .filter((goal) => !goal.isOwnGoal)
      .forEach((goal) => {
        playerTeams.set(goal.scorer, match.awayTeamId)
        const stats = getOrCreatePlayerStats(
          playerStats,
          goal.scorer,
          match.awayTeamId
        )
        stats.goals += 1
        stats.matchDayGoals[match.matchDay] =
          (stats.matchDayGoals[match.matchDay] || 0) + 1
      })
  })

  return Array.from(playerStats.values())
    .sort((a, b) => {
      if (b.goals !== a.goals) {
        return b.goals - a.goals
      }
      return a.playerId.localeCompare(b.playerId)
    })
    .filter((player) => player.goals > 0)
}

function getOrCreatePlayerStats(
  statsMap: Map<Player, PlayerStatsWithMatchDays>,
  playerId: Player,
  teamId: Team
): PlayerStatsWithMatchDays {
  if (!statsMap.has(playerId)) {
    statsMap.set(playerId, {
      playerId,
      teamId,
      goals: 0,
      matchDayGoals: {},
    })
  }
  return statsMap.get(playerId)!
}
