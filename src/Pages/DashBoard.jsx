// import { Grid, Box, List, ListItem, ListItemText, ListItemIcon, Typography, Paper, Avatar } from "@mui/material"
// import {
//   People,
//   Description,
//   TrendingUp,
//   Timeline,
//   FiberManualRecord,
//   Add,
//   Assessment,
//   Notifications,
// } from "@mui/icons-material"
// import StatsCard from "../Components/StatsCard"
// import PageHeader from "../Components/PageHeaders"

// const stats = [
//   {
//     title: "Total Researchers",
//     value: "24",
//     change: "+2 from last month",
//     icon: People,
//     color: "#1976d2",
//     bgColor: "#e3f2fd",
//     progress: 85,
//   },
//   {
//     title: "Active Research",
//     value: "156",
//     change: "+12 from last month",
//     icon: Description,
//     color: "#2e7d32",
//     bgColor: "#e8f5e8",
//     progress: 92,
//   },
//   {
//     title: "Completed Studies",
//     value: "89",
//     change: "+8 from last month",
//     icon: TrendingUp,
//     color: "#7b1fa2",
//     bgColor: "#f3e5f5",
//     progress: 78,
//   },
//   {
//     title: "System Activity",
//     value: "98.5%",
//     change: "Uptime this month",
//     icon: Timeline,
//     color: "#f57c00",
//     bgColor: "#fff3e0",
//     progress: 98.5,
//   },
// ]

// const recentActivity = [
//   { id: 1, action: "New researcher registered", user: "Dr. Sarah Johnson", time: "2 hours ago" },
//   { id: 2, action: "Research paper submitted", user: "Dr. Michael Chen", time: "4 hours ago" },
//   { id: 3, action: "Data analysis completed", user: "Dr. Emily Davis", time: "6 hours ago" },
//   { id: 4, action: "New research project created", user: "Dr. James Wilson", time: "1 day ago" },
// ]

// const quickActions = [
//   // { title: "Add New Researcher", description: "Register a new researcher account", icon: Add, color: "#1976d2" },
//   {
//     title: "Review Pending Research",
//     description: "Check submissions awaiting approval",
//     icon: Assessment,
//     color: "#2e7d32",
//   },
//   // { title: "Generate Reports", description: "Create system usage reports", icon: Notifications, color: "#7b1fa2" },
// ]

// const Dashboard = () => {
//   return (
//     <Box>
//       <PageHeader title="Dashboard" subtitle="Welcome to the research management admin panel" />

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={6} lg={3} key={index}>
//             <StatsCard {...stat} />
//           </Grid>
//         ))}
//       </Grid>

//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={7}>
//           <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0", p: 3 }}>
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//               Recent Activity
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
//               Latest actions in the system
//             </Typography>
//             <List sx={{ p: 0 }}>
//               {recentActivity.map((activity, index) => (
//                 <ListItem
//                   key={activity.id}
//                   sx={{
//                     px: 0,
//                     py: 2,
//                     borderBottom: index < recentActivity.length - 1 ? "1px solid #f0f0f0" : "none",
//                   }}
//                 >
//                   <ListItemIcon sx={{ minWidth: 40 }}>
//                     <FiberManualRecord sx={{ color: "#1976d2", fontSize: 12 }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary={
//                       <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                         {activity.action}
//                       </Typography>
//                     }
//                     secondary={
//                       <Typography variant="body2" sx={{ color: "#666" }}>
//                         {activity.user}
//                       </Typography>
//                     }
//                   />
//                   <Typography variant="body2" sx={{ color: "#999", fontSize: "0.875rem" }}>
//                     {activity.time}
//                   </Typography>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         <Grid item xs={12} lg={5}>
//           <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0", p: 3 }}>
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
//               Quick Actions
//             </Typography>
//             <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
//               Common administrative tasks
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               {quickActions.map((action, index) => (
//                 <Paper
//                   key={index}
//                   elevation={0}
//                   sx={{
//                     p: 3,
//                     border: "1px solid #e0e0e0",
//                     borderRadius: 2,
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       backgroundColor: "#f8f9fa",
//                       borderColor: action.color,
//                       transform: "translateX(4px)",
//                     },
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Avatar
//                       sx={{ width: 40, height: 40, backgroundColor: `${action.color}15`, color: action.color, mr: 2 }}
//                     >
//                       <action.icon sx={{ fontSize: 20 }} />
//                     </Avatar>
//                     <Box>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
//                         {action.title}
//                       </Typography>
//                       <Typography variant="body2" sx={{ color: "#666" }}>
//                         {action.description}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Paper>
//               ))}
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }

// export default Dashboard



import React, { useState, useEffect } from "react"
import { Grid, Box, List, ListItem, ListItemText, ListItemIcon, Typography, Paper, Avatar, CircularProgress, Card, CardContent } from "@mui/material"
import {
  TrendingUp,
  Assessment,
  QuestionAnswer,
  SmartToy,
  CheckCircleOutline,
} from "@mui/icons-material"
import { auth } from "../../firebaseConfig"; // Assuming firebaseConfig is in this location

// --- Helper Components (defined locally) ---

const StatsCard = ({ title, value, change, icon: Icon, color, bgColor }) => (
  <Card elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0", height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ width: 48, height: 48, backgroundColor: bgColor, color: color, mr: 2 }}>
          <Icon />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{value}</Typography>
          <Typography variant="body2" sx={{ color: "#666" }}>{title}</Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: "#999" }}>{change}</Typography>
    </CardContent>
  </Card>
);

const PageHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>
    <Typography variant="subtitle1" sx={{ color: "#666" }}>{subtitle}</Typography>
  </Box>
);


// --- Analytics Processing Functions ---

function getAnalytics(chatHistory, studyClicks) {
  const studyAnalytics = (studyClicks || "")
    .trim()
    .split('\n')
    .map(line => {
      const match = line.match(/Study: (.*?) \(ID: .*?\) - Clicks: (\d+)/);
      if (match) return { study: match[1].trim(), clicks: parseInt(match[2], 10) };
      return null;
    })
    .filter(Boolean);

  const totalUserMessages = ((chatHistory || "").match(/"sender": "user"/g) || []).length;
  const totalBotMessages = ((chatHistory || "").match(/"sender": "bot"/g) || []).length;

  const botErrorPatterns = [/I'm sorry/gi, /does not contain/gi, /doesn't mention/gi, /Error: Study not found/gi];
  let botErrorCount = 0;
  botErrorPatterns.forEach(pattern => {
    botErrorCount += ((chatHistory || "").match(pattern) || []).length;
  });

  return {
    userEngagement: { totalUserMessages, totalBotMessages },
    botPerformance: {
      botErrorCount,
      successRate: totalBotMessages > 0 ? (((totalBotMessages - botErrorCount) / totalBotMessages) * 100).toFixed(2) : "0.00",
    },
    studyPopularity: studyAnalytics.sort((a, b) => b.clicks - a.clicks),
  };
}

function processApiResponse(apiResponse) {
  if (!apiResponse || !apiResponse.chatHistory || !apiResponse.studyClicks) {
    console.error("Invalid API response format:", apiResponse);
    return getAnalytics("", ""); // Return default empty analytics
  }
  const { chatHistory, studyClicks } = apiResponse;
  return getAnalytics(chatHistory, studyClicks);
}


// --- Main Dashboard Component ---

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIdToken = async () => {
      const user = auth.currentUser;
      if (user) return user.getIdToken();
      throw new Error("No user is authenticated.");
    };

    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getIdToken();
        const response = await fetch("https://r2c.iiitd.edu.in/superapi/logs", {
          headers: {
            "Content-Type": "application/json",
            "id-token": token,
          },
        });

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const apiResponse = await response.json();
        const data = processApiResponse(apiResponse);
        setAnalyticsData(data);
      } catch (err) {
        console.error("Failed to fetch or process logs:", err);
        setError(err.message);
        setAnalyticsData(getAnalytics("", "")); // Set empty data on error
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchLogs();
      } else {
        setError("Please log in to view analytics.");
        setLoading(false);
        setAnalyticsData(getAnalytics("", "")); // Set empty data if not logged in
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const stats = analyticsData ? [
    { title: "Total User Messages", value: analyticsData.userEngagement.totalUserMessages, change: "Across all sessions", icon: QuestionAnswer, color: "#1976d2", bgColor: "#e3f2fd" },
    { title: "Total Bot Responses", value: analyticsData.userEngagement.totalBotMessages, change: "Across all sessions", icon: SmartToy, color: "#2e7d32", bgColor: "#e8f5e8" },
    { title: "Bot Success Rate", value: `${analyticsData.botPerformance.successRate}%`, change: `${analyticsData.botPerformance.botErrorCount} errors`, icon: CheckCircleOutline, color: "#7b1fa2", bgColor: "#f3e5f5" },
    { title: "Popular Studies", value: analyticsData.studyPopularity.length, change: "Based on user clicks", icon: TrendingUp, color: "#f57c00", bgColor: "#fff3e0" },
  ] : [];

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /></Box>;
  }

  return (
    <Box>
      <PageHeader title="Analytics Dashboard" subtitle="Insights from user interaction logs" />

      {error && <Typography color="error" sx={{ mb: 2 }}>Error: {error}</Typography>}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0", p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Study Popularity</Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>Most clicked research studies</Typography>
            <List sx={{ p: 0 }}>
              {analyticsData?.studyPopularity.length > 0 ? (
                analyticsData.studyPopularity.map((study, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 2, borderBottom: index < analyticsData.studyPopularity.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 30, height: 30, bgcolor: '#e3f2fd', color: '#1976d2', fontSize: '0.875rem' }}>{index + 1}</Avatar>
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>{study.study}</Typography>} />
                    <Typography variant="body2" sx={{ color: "#333", fontWeight: 700 }}>{study.clicks} Clicks</Typography>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "#999", textAlign: 'center', py: 4 }}>No study click data available.</Typography>
              )}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Paper elevation={0} sx={{ borderRadius: 3, border: "1px solid #e0e0e0", p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Quick Actions</Typography>
            <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>Common administrative tasks</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Paper elevation={0} sx={{ p: 3, border: "1px solid #e0e0e0", borderRadius: 2, cursor: "pointer", transition: "all 0.3s ease", "&:hover": { backgroundColor: "#f8f9fa", borderColor: "#2e7d32", transform: "translateX(4px)" } }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar sx={{ width: 40, height: 40, backgroundColor: `#2e7d3215`, color: "#2e7d32", mr: 2 }}><Assessment sx={{ fontSize: 20 }} /></Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>Review Pending Research</Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>Check submissions awaiting approval</Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard

