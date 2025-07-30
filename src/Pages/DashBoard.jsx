import { Grid, Box, List, ListItem, ListItemText, ListItemIcon, Typography, Paper, Avatar } from "@mui/material"
import {
  People,
  Description,
  TrendingUp,
  Timeline,
  FiberManualRecord,
  Add,
  Assessment,
  Notifications,
} from "@mui/icons-material"
import StatsCard from "../Components/StatsCard"
import PageHeader from "../Components/PageHeaders"

const stats = [
  {
    title: "Total Researchers",
    value: "24",
    change: "+2 from last month",
    icon: People,
    color: "#1976d2",
    bgColor: "#e3f2fd",
    progress: 85,
  },
  {
    title: "Active Research",
    value: "156",
    change: "+12 from last month",
    icon: Description,
    color: "#2e7d32",
    bgColor: "#e8f5e8",
    progress: 92,
  },
  {
    title: "Completed Studies",
    value: "89",
    change: "+8 from last month",
    icon: TrendingUp,
    color: "#7b1fa2",
    bgColor: "#f3e5f5",
    progress: 78,
  },
  {
    title: "System Activity",
    value: "98.5%",
    change: "Uptime this month",
    icon: Timeline,
    color: "#f57c00",
    bgColor: "#fff3e0",
    progress: 98.5,
  },
]

const recentActivity = [
  { id: 1, action: "New researcher registered", user: "Dr. Sarah Johnson", time: "2 hours ago" },
  { id: 2, action: "Research paper submitted", user: "Dr. Michael Chen", time: "4 hours ago" },
  { id: 3, action: "Data analysis completed", user: "Dr. Emily Davis", time: "6 hours ago" },
  { id: 4, action: "New research project created", user: "Dr. James Wilson", time: "1 day ago" },
]

const quickActions = [
  // { title: "Add New Researcher", description: "Register a new researcher account", icon: Add, color: "#1976d2" },
  {
    title: "Review Pending Research",
    description: "Check submissions awaiting approval",
    icon: Assessment,
    color: "#2e7d32",
  },
  // { title: "Generate Reports", description: "Create system usage reports", icon: Notifications, color: "#7b1fa2" },
]

const Dashboard = () => {
  return (
    <Box>
      <PageHeader title="Dashboard" subtitle="Welcome to the research management admin panel" />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0", p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Recent Activity
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
              Latest actions in the system
            </Typography>
            <List sx={{ p: 0 }}>
              {recentActivity.map((activity, index) => (
                <ListItem
                  key={activity.id}
                  sx={{
                    px: 0,
                    py: 2,
                    borderBottom: index < recentActivity.length - 1 ? "1px solid #f0f0f0" : "none",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <FiberManualRecord sx={{ color: "#1976d2", fontSize: 12 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {activity.action}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {activity.user}
                      </Typography>
                    }
                  />
                  <Typography variant="body2" sx={{ color: "#999", fontSize: "0.875rem" }}>
                    {activity.time}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0", p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              Quick Actions
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
              Common administrative tasks
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {quickActions.map((action, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f8f9fa",
                      borderColor: action.color,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ width: 40, height: 40, backgroundColor: `${action.color}15`, color: action.color, mr: 2 }}
                    >
                      <action.icon sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {action.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
