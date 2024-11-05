import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'

export default function Rules() {
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <List sx={{ '& .MuiListItem-root': { mb: 2 } }}>
        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6" gutterBottom>
                Número mínimo de jugadores
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.secondary">
                Si un equipo no se presenta con al menos 5 jugadores, no
                obtendrá puntos y el equipo rival ganará 3 puntos
                automáticamente.
              </Typography>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6" gutterBottom>
                Saques de banda
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.secondary">
                Está permitido realizar los saques desde la banda utilizando las
                manos.
              </Typography>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={
              <Typography variant="h6" gutterBottom>
                Condiciones meteorológicas
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.secondary">
                En caso de que las condiciones meteorológicas impidan la
                celebración de uno o ambos partidos programados para un lunes,
                la jornada será aplazada en su totalidad.
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  )
}
