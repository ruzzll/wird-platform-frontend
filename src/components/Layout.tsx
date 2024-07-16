import { Outlet } from "react-router-dom"
import { Box, Grid } from "@mui/material"
import DeckList from "./DeckList"

const Layout = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
      <Grid item xs={4}>
        <Box position="sticky" top={0}>
          <DeckList />
        </Box>
      </Grid>
    </Grid>
  )
}

export default Layout
