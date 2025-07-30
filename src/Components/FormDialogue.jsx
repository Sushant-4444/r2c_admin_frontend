"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography,
  Box,
} from "@mui/material"

const FormDialog = ({ open, onClose, title, subtitle, children, onSubmit, submitText = "Save", loading = false }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {subtitle && <DialogContentText sx={{ mb: 3, color: "#666" }}>{subtitle}</DialogContentText>}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>{children}</Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={onClose} sx={{ color: "#666" }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={loading}
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
            },
          }}
        >
          {loading ? "Saving..." : submitText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
