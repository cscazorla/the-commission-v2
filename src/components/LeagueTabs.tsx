'use client'

import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import Attendance from './Attendance'
import MatchCalendar from './MatchCalendar'
import StandingsTable from './StandingsTable'
import TopScorers from './TopScorers'

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.common.black,
    height: 3,
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between',
    },
  },
}))

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  '&.Mui-selected': {
    color: theme.palette.common.black,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 12,
    minWidth: 'unset',
    padding: '12px 4px',
    minHeight: 'unset',
  },
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function LeagueTabs() {
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const getTabLabel = (label: string) => {
    if (!isMobile) return label
    // Shorter labels for mobile
    switch (label) {
      case 'Clasificación':
        return 'Liga'
      case 'Goleadores':
        return 'Goles'
      case 'Calendario':
        return 'Calendario'
      case 'Normas':
        return 'Reglas'
      case 'Asistencia':
        return 'Asistencia'
      default:
        return label
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="league tabs"
          variant="fullWidth"
        >
          <StyledTab label={getTabLabel('Clasificación')} />
          <StyledTab label={getTabLabel('Goleadores')} />
          <StyledTab label={getTabLabel('Calendario')} />
          <StyledTab label={getTabLabel('Asistencia')} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StandingsTable />
        {/* <Rules /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TopScorers />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MatchCalendar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Attendance />
      </CustomTabPanel>
    </Box>
  )
}
