'use client'

import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Paper,
  Typography,
} from '@mui/material'
import { onValue, ref, set } from 'firebase/database'
import { useEffect, useState } from 'react'
import { database } from '../lib/firebase'
import { Player } from '../types/players'
import { Team, TEAMS } from '../types/teams'

const teamColors: Record<Team, string> = {
  [Team.BLUE]: '#1a237e',
  [Team.GREEN]: '#1b5e20',
  [Team.RED]: '#b71c1c',
  [Team.WHITE]: '#212121',
}

// Helper to get enum key from Player enum
const getPlayerKey = (player: Player): keyof typeof Player => {
  return Object.keys(Player).find(key => Player[key as keyof typeof Player] === player) as keyof typeof Player
}

// Create initial state with all players set to false
const createInitialAttendance = (): Record<keyof typeof Player, boolean> => {
  // Create object with all Player enum keys initialized to false
  return Object.fromEntries(
    Object.keys(Player).map(key => [key, false])
  ) as Record<keyof typeof Player, boolean>
}

export default function Attendance() {
  const [attendance, setAttendance] = useState<Record<keyof typeof Player, boolean>>(createInitialAttendance())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const attendanceRef = ref(database, 'attendance')
      const unsubscribe = onValue(
        attendanceRef,
        (snapshot) => {
          const data = snapshot.val()
          setAttendance(() => ({
            ...createInitialAttendance(),
            ...data
          }))
          setLoading(false)
        },
        (error) => {
          setError(error.message)
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setLoading(false)
    }
  }, [])

  const handleToggle = async (player: Player) => {
    try {
      console.log('player', player)
      const playerKey = getPlayerKey(player)
      const newValue = !attendance[playerKey]
      await set(ref(database, `attendance/${playerKey}`), newValue)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update attendance')
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ p: 2, color: 'error.main' }}>
        <Typography>Error: {error}</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          md: '1fr 1fr 1fr 1fr',
        },
        gap: 2,
      }}
    >
      {TEAMS.map((team) => (
        <Paper
          key={team.id}
          elevation={0}
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              pb: 1,
              borderBottom: '2px solid',
              borderColor: teamColors[team.id],
              color: teamColors[team.id],
              fontWeight: 'bold',
            }}
          >
            {team.id}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {team.players.map((player) => (
              <FormControlLabel
                key={player}
                control={
                  <Checkbox
                    checked={!!attendance[getPlayerKey(player)]}
                    onChange={() => handleToggle(player)}
                  />
                }
                label={player}
              />
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  )
}
