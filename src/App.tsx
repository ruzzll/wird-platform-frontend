import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/:name",
        Component: DetailsPage,
      },
    ],
  },
])

const theme = createTheme()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App
