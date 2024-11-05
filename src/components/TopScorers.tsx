'use client'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MATCHES } from '../data/matches'
import { calculatePlayerStats } from '../utils/standings'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 'bold',
    padding: '8px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    padding: '6px',
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& > *': {
    height: '40px',
  }
}))

export default function TopScorers() {
  const scorers = calculatePlayerStats(MATCHES)
  const matchDays = Array.from(
    new Set(MATCHES.map((match) => match.matchDay))
  ).sort((a, b) => a - b)

  return (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <StyledTableCell>Jugador</StyledTableCell>
            <StyledTableCell>Equipo</StyledTableCell>
            <StyledTableCell align="center">Goles</StyledTableCell>
            {matchDays.map((day) => (
              <StyledTableCell key={day} align="center">
                J{day}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {scorers.map((player) => (
            <StyledTableRow key={player.playerId}>
              <StyledTableCell>{player.playerId}</StyledTableCell>
              <StyledTableCell>{player.teamId}</StyledTableCell>
              <StyledTableCell align="center">{player.goals}</StyledTableCell>
              {matchDays.map((day) => (
                <StyledTableCell key={day} align="center">
                  {player.matchDayGoals[day] || '-'}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
