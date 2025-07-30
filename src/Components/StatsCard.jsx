import { Card, CardContent, Typography, Box, Avatar, LinearProgress } from "@mui/material"

const StatsCard = ({ title, value, change, icon: Icon, color, bgColor, progress }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: bgColor,
              color: color,
              mr: 2,
            }}
          >
            <Icon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
              {value}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#f0f0f0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: color,
              borderRadius: 3,
            },
            mb: 1,
          }}
        />
        <Typography variant="body2" sx={{ color: "#666" }}>
          {change}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StatsCard
