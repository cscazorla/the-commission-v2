'use client'

import { Box } from '@mui/material'
import Header from '../components/Header'
import LeagueTabs from '../components/LeagueTabs'

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        padding: {
          xs: 2,
          sm: 4,
        },
      }}
    >
      <Header />
      <LeagueTabs />
    </Box>
  )
}
