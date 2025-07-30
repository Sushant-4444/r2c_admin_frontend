import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import LoginPage from "./Pages/LoginPage"
import AdminLayout from "./Layouts/AdminLayout"
import Dashboard from "./Pages/DashBoard"
import Researchers from "./Pages/Researchers"
import Research from "./Pages/Research"
import { AuthProvider } from "./Contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#7b1fa2",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/researchers" element={<Researchers />} />
                      <Route path="/research" element={<Research />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/admin" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
