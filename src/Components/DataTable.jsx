"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Typography,
} from "@mui/material"

const DataTable = ({ columns, data, actions, emptyMessage = "No data available" }) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #e0e0e0" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"} sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                  {column.label}
                </TableCell>
              ))}
              {actions && (
                <TableCell align="right" sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  sx={{
                    "&:hover": { backgroundColor: "#f8f9fa" },
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || "left"}>
                      {column.render ? column.render(row[column.id], row) : row[column.id]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="right">
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                        {actions.map((action, actionIndex) => (
                          <Tooltip key={actionIndex} title={action.tooltip}>
                            <IconButton
                              size="small"
                              onClick={() => action.onClick(row)}
                              sx={{
                                color: action.color || "#1976d2",
                                "&:hover": {
                                  backgroundColor: action.hoverColor || "#e3f2fd",
                                },
                              }}
                            >
                              <action.icon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default DataTable
