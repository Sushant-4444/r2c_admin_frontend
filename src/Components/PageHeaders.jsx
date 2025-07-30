import { Box, Typography } from "@mui/material"

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h6" sx={{ color: "#666", fontWeight: 400 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && action}
    </Box>
  )
}

export default PageHeader
