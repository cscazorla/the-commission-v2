import { Box } from '@mui/material'
import Image from 'next/image'

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 0,
      }}
    >
      <Image
        src="/logo.svg"
        alt="The Commission Logo"
        width={120}
        height={120}
        priority
      />
    </Box>
  )
}
