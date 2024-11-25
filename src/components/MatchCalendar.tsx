import { Box, Card, CardContent, Typography } from '@mui/material'
import { MATCHES } from '../data/matches'
import { Goal } from '../types/league'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatGoals(goals: Goal[]): string {
  const goalsByPlayer = goals.reduce((acc, goal) => {
    const playerName = goal.scorer
    if (!acc[playerName]) {
      acc[playerName] = { count: 0, isOwnGoal: goal.isOwnGoal ?? false }
    }
    acc[playerName].count++
    return acc
  }, {} as Record<string, { count: number, isOwnGoal: boolean }>)

  return Object.entries(goalsByPlayer)
    .map(([player, { count, isOwnGoal }]) => {
      const goals = count > 1 ? ` (${count})` : ''
      return isOwnGoal ? `${player} (p.p.)${goals}` : `${player}${goals}`
    })
    .join(', ')
}

export default function MatchCalendar() {
  const matches = MATCHES
  const matchesByDate = matches.reduce((acc, match) => {
    const date = match.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(match)
    return acc
  }, {} as Record<string, typeof matches>)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {Object.entries(matchesByDate)
        .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
        .map(([date, dateMatches]) => (
          <Box key={date}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                Jornada {dateMatches[0].matchDay}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {formatDate(date)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
              {dateMatches.map((match) => (
                <Card
                  key={match.id}
                  sx={{ bgcolor: '#fafafa' }}
                >
                  <CardContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
                      {match.time}h
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Home Team */}
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-end',
                        }}
                      >
                        <Typography variant="h6">{match.homeTeamId}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatGoals(match.homeGoals)}
                        </Typography>
                      </Box>

                      {/* Score */}
                      <Box
                        sx={{
                          px: 3,
                          py: 1,
                          borderRadius: 1,
                          mx: 4,
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          {match.played
                            ? `${match.homeGoals.length} - ${match.awayGoals.length}`
                            : 'vs'
                          }
                        </Typography>
                      </Box>

                      {/* Away Team */}
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Typography variant="h6">{match.awayTeamId}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatGoals(match.awayGoals)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        ))}
    </Box>
  )
}
