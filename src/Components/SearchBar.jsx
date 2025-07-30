"use client"

import { TextField, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material"

const SearchBar = ({ value, onChange, placeholder = "Search...", ...props }) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="small"
      sx={{
        minWidth: 300,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: "#666" }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default SearchBar
