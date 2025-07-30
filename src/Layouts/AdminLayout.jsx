"use client"

import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
} from "@mui/material"
import { Dashboard, People, Description, Logout, Menu as MenuIcon, AdminPanelSettings } from "@mui/icons-material"
import { useAuth } from "../Contexts/AuthContext"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Dashboard },
  { name: "Users", href: "/admin/researchers", icon: People },
  { name: "Research", href: "/admin/research", icon: Description },
]

const drawerWidth = 280

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { logout } = useAuth()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ height: "100%", background: "linear-gradient(180deg, #1976d2 0%, #1565c0 100%)" }}>
      <Box sx={{ p: 3, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            margin: "0 auto 12px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <AdminPanelSettings sx={{ fontSize: 30, color: "white" }} />
        </Avatar>
        <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
          Research Admin
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 0.5 }}>
          Management Portal
        </Typography>
      </Box>

      <List sx={{ px: 2, py: 3 }}>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.href}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  color: isActive ? "#1976d2" : "rgba(255, 255, 255, 0.9)",
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.95)" : "transparent",
                  "&:hover": {
                    backgroundColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Box sx={{ position: "absolute", bottom: 20, left: 16, right: 16 }}>
        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.1)" }} />
        <Button
          fullWidth
          startIcon={<Logout />}
          onClick={logout}
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            borderRadius: 2,
          }}
          variant="outlined"
        >
          Logout
        </Button>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {isMobile && (
        <AppBar position="fixed" sx={{ background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" }}>
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <AdminPanelSettings sx={{ mr: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Research Admin
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 8, md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout
