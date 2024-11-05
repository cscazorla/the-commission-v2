'use client'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MATCHES } from '../data/matches'
import { calculateTeamStats } from '../utils/standings'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function StandingsTable() {
  const standings = calculateTeamStats(MATCHES)

  return (
    <TableContainer component={Paper}>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <StyledTableCell>Equipo</StyledTableCell>
            <StyledTableCell align="center">PT</StyledTableCell>
            <StyledTableCell align="center">PJ</StyledTableCell>
            <StyledTableCell align="center">PG</StyledTableCell>
            <StyledTableCell align="center">PE</StyledTableCell>
            <StyledTableCell align="center">PP</StyledTableCell>
            <StyledTableCell align="center">GF</StyledTableCell>
            <StyledTableCell align="center">GC</StyledTableCell>
            <StyledTableCell align="center">GA</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((team) => (
            <StyledTableRow key={team.teamId}>
              <StyledTableCell>{team.teamId}</StyledTableCell>
              <StyledTableCell align="center" sx={{ fontWeight: 'bold' }}>
                {team.points}
              </StyledTableCell>
              <StyledTableCell align="center">{team.played}</StyledTableCell>
              <StyledTableCell align="center">{team.won}</StyledTableCell>
              <StyledTableCell align="center">{team.drawn}</StyledTableCell>
              <StyledTableCell align="center">{team.lost}</StyledTableCell>
              <StyledTableCell align="center">{team.goalsFor}</StyledTableCell>
              <StyledTableCell align="center">
                {team.goalsAgainst}
              </StyledTableCell>
              <StyledTableCell align="center">
                {team.goalDifference}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
