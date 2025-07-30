"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Avatar,
  Typography,
  Chip,
  // ADDED: Import for pagination
  TablePagination
} from "@mui/material"
import { Person, Email } from "@mui/icons-material"
import PageHeader from "../Components/PageHeaders"
import DataTable from "../Components/DataTable"
// ADDED: Assuming you have a SearchBar component like in previous examples
import SearchBar from "../Components/SearchBar"
import { auth } from "../../firebaseConfig"

const Researchers = () => {
  const [researchers, setResearchers] = useState([])
  // ADDED: State for search term
  const [searchTerm, setSearchTerm] = useState("")
  // ADDED: State for pagination
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const getIdToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    throw new Error("No user logged in")
  }

  useEffect(() => {
    const fetchResearchers = async () => {
      try {
        const token = await getIdToken()

        const response = await fetch("http://localhost:5000/users/users", {
          headers: {
            "Content-Type": "application/json",
            "id-token": token,
          },
        })

        const data = await response.json()
        const formatted = data.map((user, index) => ({
          id: user.id || index,
          name: user.displayName || "N/A",
          email: user.email || "N/A",
          phone: user.contactInfo?.phone || "",
          status: user.role === "admin" ? "admin" : user.role,
          joined: user.createdAt
            ? new Date(user.createdAt._seconds * 1000).toLocaleDateString() 
            : "N/A",
        }))
        console.log("Researchers Data:", formatted);
        setResearchers(formatted)
      } catch (err) {
        console.error("Failed to fetch users:", err)
      }
    }
    fetchResearchers()
  }, [])

  // ADDED: Pagination handler functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // ADDED: Filtering logic based on search term
  const filteredResearchers = researchers.filter(
    (researcher) =>
        (researcher.name && researcher.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (researcher.email && researcher.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (researcher.phone && researcher.phone.includes(searchTerm))
  );

  // ADDED: Slicing logic for pagination
  const paginatedData = filteredResearchers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    {
      id: "name",
      label: "Name",
      render: (value) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: "#1976d2" }}>
            <Person />
          </Avatar>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      id: "email",
      label: "Email",
      render: (value) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Email sx={{ fontSize: 16, color: "#666", mr: 1 }} />
          <Typography variant="body2">{value}</Typography>
        </Box>
      ),
    },
    {
      id: "phone",
      label: "Phone",
      render: (value) => (
        <Typography variant="body2" sx={{ color: "#666" }}>
          {value || 'N/A'}
        </Typography>
      ),
    },
    {
      id: "status",
      label: "Role",
      render: (value) => (
        <Chip
          label={value}
          color={value === "admin" ? "primary" : "default"}
          size="small"
          sx={{ fontWeight: 600, textTransform: "capitalize" }}
        />
      ),
    },
    {
      id: "joined",
      label: "Joined",
      render: (value) => (
        <Typography variant="body2" sx={{ color: "#666" }}>
          {value}
        </Typography>
      ),
    },
  ]

  return (
    <Box>
      <PageHeader
        title="Researchers"
        subtitle="View and manage registered users"
      />

      {/* MODIFIED: Added a header with dynamic count and search bar */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          All Researchers ({filteredResearchers.length})
        </Typography>
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by name, email, etc." />
      </Box>

      {/* MODIFIED: Pass paginated data to the table */}
      <DataTable columns={columns} data={paginatedData} />

      {/* ADDED: Pagination component */}
      <TablePagination
        component="div"
        count={filteredResearchers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  )
}

export default Researchers