// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { 
// // //   Box, 
// // //   Avatar, 
// // //   Typography, 
// // //   Chip, 
// // //   Dialog, 
// // //   DialogTitle, 
// // //   DialogContent, 
// // //   DialogActions, 
// // //   Button, 
// // //   IconButton, 
// // //   Tooltip,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // //   TablePagination 
// // // } from "@mui/material"
// // // import { Visibility, CalendarToday, Person, Description, CheckCircle, Cancel } from "@mui/icons-material"
// // // import PageHeader from "../Components/PageHeaders"
// // // import SearchBar from "../Components/SearchBar"
// // // import DataTable from "../Components/DataTable"
// // // import { auth } from "../../firebaseConfig"

// // // const Research = () => {
// // //   const [research, setResearch] = useState([])
// // //   const [searchTerm, setSearchTerm] = useState("")
// // //   const [selectedResearch, setSelectedResearch] = useState(null)
// // //   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
// // //   const [loading, setLoading] = useState(true)

// // //   const [statusFilter, setStatusFilter] = useState("all")
// // //   const [researcherFilter, setResearcherFilter] = useState("all")
// // //   const [researchersList, setResearchersList] = useState([])
  
// // //   const [page, setPage] = useState(0)
// // //   const [rowsPerPage, setRowsPerPage] = useState(5)

// // //   const API_BASE_URL = "http://localhost:5000";

// // //   const getIdToken = async () => {
// // //     const user = auth.currentUser;
// // //     if (user) {
// // //       return user.getIdToken();
// // //     }
// // //     throw new Error("No user logged in")
// // //   }

// // //   useEffect(() => {
// // //     const fetchResearch = async () => {
// // //       try {
// // //         setLoading(true)
// // //         const token = await getIdToken()

// // //         const response = await fetch(`${API_BASE_URL}/studies`, {
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             "id-token": token,
// // //           },
// // //         })

// // //         if (!response.ok) {
// // //           throw new Error(`HTTP error! status: ${response.status}`)
// // //         }

// // //         const data = await response.json()
        
// // //         const transformedData = data.studies?.map((study, index) => ({
// // //           id: study._id || index,
// // //           title: study.title || "Untitled Research",
// // //           researcher: study.researcher_id || "Unknown Researcher",
// // //           department: "Research Department",
// // //           status: study.approved ? "published" : "in-progress",
// // //           createdDate: study.created_at 
// // //             ? new Date(study.created_at).toLocaleDateString()
// // //             : "N/A",
// // //           lastModified: study.updated_at 
// // //             ? new Date(study.updated_at).toLocaleDateString()
// // //             : "N/A",
// // //           description: study.abstract || study.brief_description || "No description available",
// // //           tags: study.genres || ["Research"],
// // //           abstract: study.abstract,
// // //           brief_description: study.brief_description,
// // //           patent_status: study.patent_status,
// // //           documents: study.documents || [],
// // //           questions: study.questions || [],
// // //           approved: study.approved
// // //         })) || []

// // //         setResearch(transformedData)
        
// // //         const uniqueResearchers = [...new Set(transformedData.map(r => r.researcher))].filter(r => r !== "Unknown Researcher");
// // //         setResearchersList(uniqueResearchers)

// // //       } catch (err) {
// // //         console.error("Failed to fetch studies:", err)
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }
// // //     fetchResearch()
// // //   }, [])

// // //   const handleChangePage = (event, newPage) => {
// // //     setPage(newPage);
// // //   };

// // //   const handleChangeRowsPerPage = (event) => {
// // //     setRowsPerPage(parseInt(event.target.value, 10));
// // //     setPage(0);
// // //   };

// // //   const filteredResearch = research.filter(
// // //     (item) => {
// // //       const matchesStatus =
// // //         statusFilter === "all" || item.status === statusFilter;

// // //       const matchesResearcher =
// // //         researcherFilter === "all" || item.researcher === researcherFilter;

// // //       const matchesSearch =
// // //         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         item.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //         item.department.toLowerCase().includes(searchTerm.toLowerCase());

// // //       return matchesStatus && matchesResearcher && matchesSearch;
// // //     }
// // //   );

// // //   const paginatedData = filteredResearch.slice(
// // //     page * rowsPerPage,
// // //     page * rowsPerPage + rowsPerPage
// // //   );


// // //   const handleApproveResearch = async (id, currentApprovalStatus) => {
// // //     try {
// // //       const token = await getIdToken()
// // //       const newApprovalStatus = !currentApprovalStatus
      
// // //       const response = await fetch(`${API_BASE_URL}/studies/${id}/approve`, {
// // //         method: 'PATCH',
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           "id-token": token,
// // //         },
// // //         body: JSON.stringify({ approved: newApprovalStatus })
// // //       })

// // //       if (response.ok) {
// // //         setResearch(research.map(r => 
// // //           r.id === id 
// // //             ? { 
// // //                 ...r, 
// // //                 approved: newApprovalStatus,
// // //                 status: newApprovalStatus ? "published" : "in-progress"
// // //               }
// // //             : r
// // //         ))
// // //         console.log(`Study ${newApprovalStatus ? 'approved' : 'unapproved'} successfully`)
// // //       } else {
// // //         console.error("Failed to update approval status")
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating approval status:", error)
// // //     }
// // //   }

// // //   const handleViewResearch = (researchItem) => {
// // //     setSelectedResearch(researchItem)
// // //     setIsViewDialogOpen(true)
// // //   }

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "draft":
// // //         return "default"
// // //       case "in-progress":
// // //         return "primary"
// // //       case "completed":
// // //         return "success"
// // //       case "published":
// // //         return "secondary"
// // //       default:
// // //         return "default"
// // //     }
// // //   }

// // //   const columns = [
// // //     {
// // //       id: "title",
// // //       label: "Research Project",
// // //       render: (value, row) => (
// // //         <Box>
// // //           <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
// // //             {value}
// // //           </Typography>
// // //           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
// // //             {row.tags.slice(0, 2).map((tag) => (
// // //               <Chip
// // //                 key={tag}
// // //                 label={tag}
// // //                 size="small"
// // //                 variant="outlined"
// // //                 sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
// // //               />
// // //             ))}
// // //             {row.tags.length > 2 && (
// // //               <Chip
// // //                 label={`+${row.tags.length - 2}`}
// // //                 size="small"
// // //                 variant="outlined"
// // //                 sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
// // //               />
// // //             )}
// // //           </Box>
// // //         </Box>
// // //       ),
// // //     },
// // //     {
// // //       id: "researcher",
// // //       label: "Researcher",
// // //       render: (value) => (
// // //         <Box sx={{ display: "flex", alignItems: "center" }}>
// // //           <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: "#1976d2" }}>
// // //             <Person fontSize="small" />
// // //           </Avatar>
// // //           <Typography variant="body2" sx={{ fontWeight: 500 }}>
// // //             {value}
// // //           </Typography>
// // //         </Box>
// // //       ),
// // //     },
// // //     {
// // //       id: "department",
// // //       label: "Department",
// // //       render: (value) => (
// // //         <Typography variant="body2" sx={{ fontWeight: 500 }}>
// // //           {value}
// // //         </Typography>
// // //       ),
// // //     },
// // //     {
// // //       id: "status",
// // //       label: "Status",
// // //       render: (value) => (
// // //         <Chip
// // //           label={value.replace("-", " ")}
// // //           color={getStatusColor(value)}
// // //           size="small"
// // //           sx={{ fontWeight: 600, textTransform: "capitalize" }}
// // //         />
// // //       ),
// // //     },
// // //     {
// // //       id: "createdDate",
// // //       label: "Created",
// // //       render: (value) => (
// // //         <Box sx={{ display: "flex", alignItems: "center" }}>
// // //           <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
// // //           <Typography variant="body2" sx={{ color: "#666" }}>
// // //             {value}
// // //           </Typography>
// // //         </Box>
// // //       ),
// // //     },
// // //     {
// // //       id: "lastModified",
// // //       label: "Last Modified",
// // //       render: (value) => (
// // //         <Box sx={{ display: "flex", alignItems: "center" }}>
// // //           <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
// // //           <Typography variant="body2" sx={{ color: "#666" }}>
// // //             {value}
// // //           </Typography>
// // //         </Box>
// // //       ),
// // //     },
// // //     {
// // //       id: "actions",
// // //       label: "Actions",
// // //       render: (value, row) => (
// // //         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
// // //           <Tooltip title="View details">
// // //             <IconButton
// // //               size="small"
// // //               onClick={() => handleViewResearch(row)}
// // //               sx={{
// // //                 color: "#1976d2",
// // //                 "&:hover": { backgroundColor: "#e3f2fd" },
// // //               }}
// // //             >
// // //               <Visibility fontSize="small" />
// // //             </IconButton>
// // //           </Tooltip>
// // //           <Tooltip title={row.approved ? "Unapprove research" : "Approve research"}>
// // //             <IconButton
// // //               size="small"
// // //               onClick={() => handleApproveResearch(row.id, row.approved)}
// // //               sx={{
// // //                 color: row.approved ? "#ff9800" : "#4caf50",
// // //                 "&:hover": { 
// // //                   backgroundColor: row.approved ? "#fff3e0" : "#e8f5e9" 
// // //                 },
// // //               }}
// // //             >
// // //               {row.approved ? <Cancel fontSize="small" /> : <CheckCircle fontSize="small" />}
// // //             </IconButton>
// // //           </Tooltip>
// // //         </Box>
// // //       ),
// // //     },
// // //   ]

// // //   return (
// // //     <Box>
// // //       <PageHeader title="Research Management" subtitle="View and manage all research projects" />

// // //       <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
// // //         <Typography variant="h6" sx={{ fontWeight: 700, width: { xs: '100%', md: 'auto' } }}>
// // //           {loading ? "Loading..." : `All Projects (${filteredResearch.length})`}
// // //         </Typography>
        
// // //         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
// // //           <FormControl size="small" sx={{ minWidth: 180 }}>
// // //             <InputLabel>Status</InputLabel>
// // //             <Select
// // //               value={statusFilter}
// // //               label="Status"
// // //               onChange={(e) => setStatusFilter(e.target.value)}
// // //             >
// // //               <MenuItem value="all">All Statuses</MenuItem>
// // //               <MenuItem value="published">Approved</MenuItem>
// // //               <MenuItem value="in-progress">Pending Approval</MenuItem>
// // //             </Select>
// // //           </FormControl>

// // //           <FormControl size="small" sx={{ minWidth: 200 }}>
// // //             <InputLabel>Researcher</InputLabel>
// // //             <Select
// // //               value={researcherFilter}
// // //               label="Researcher"
// // //               onChange={(e) => setResearcherFilter(e.target.value)}
// // //             >
// // //               <MenuItem value="all">All Researchers</MenuItem>
// // //               {researchersList.map((name) => (
// // //                 <MenuItem key={name} value={name}>{name}</MenuItem>
// // //               ))}
// // //             </Select>
// // //           </FormControl>
          
// // //           <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search projects..." />
// // //         </Box>
// // //       </Box>

// // //       {loading ? (
// // //         <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// // //           <Typography>Loading research data...</Typography>
// // //         </Box>
// // //       ) : (
// // //         <>
// // //           <DataTable columns={columns} data={paginatedData} />
// // //           <TablePagination
// // //             component="div"
// // //             count={filteredResearch.length}
// // //             page={page}
// // //             onPageChange={handleChangePage}
// // //             rowsPerPage={rowsPerPage}
// // //             onRowsPerPageChange={handleChangeRowsPerPage}
// // //             rowsPerPageOptions={[5, 10, 25]}
// // //           />
// // //         </>
// // //       )}

// // //       {/* FIXED: The Dialog content is now fully included below */}
// // //       <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} maxWidth="md" fullWidth>
// // //         <DialogTitle sx={{ pb: 1 }}>
// // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // //             <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: "#1976d2" }}>
// // //               <Description />
// // //             </Avatar>
// // //             <Typography variant="h6" sx={{ fontWeight: 700 }}>
// // //               Research Details
// // //             </Typography>
// // //           </Box>
// // //         </DialogTitle>
// // //         <DialogContent>
// // //           {selectedResearch && (
// // //             <Box sx={{ pt: 2 }}>
// // //               <Box sx={{ mb: 3 }}>
// // //                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
// // //                   {selectedResearch.title}
// // //                 </Typography>
// // //                 <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
// // //                   <Box sx={{ display: "flex", alignItems: "center" }}>
// // //                     <Person sx={{ fontSize: 16, color: "#666", mr: 1 }} />
// // //                     <Typography variant="body2" sx={{ fontWeight: 500 }}>
// // //                       {selectedResearch.researcher}
// // //                     </Typography>
// // //                   </Box>
// // //                   <Typography variant="body2" sx={{ color: "#666" }}>•</Typography>
// // //                   <Typography variant="body2" sx={{ color: "#666" }}>
// // //                     {selectedResearch.department}
// // //                   </Typography>
// // //                   <Chip
// // //                     label={selectedResearch.status.replace("-", " ")}
// // //                     color={getStatusColor(selectedResearch.status)}
// // //                     size="small"
// // //                     sx={{ textTransform: "capitalize" }}
// // //                   />
// // //                 </Box>
// // //               </Box>

// // //               <Box sx={{ mb: 3 }}>
// // //                 <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
// // //                   Description
// // //                 </Typography>
// // //                 <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6, mb: 2 }}>
// // //                   {selectedResearch.description}
// // //                 </Typography>
                
// // //                 {selectedResearch.abstract && selectedResearch.abstract !== selectedResearch.description && (
// // //                   <>
// // //                     <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
// // //                       Abstract
// // //                     </Typography>
// // //                     <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
// // //                       {selectedResearch.abstract}
// // //                     </Typography>
// // //                   </>
// // //                 )}
// // //               </Box>
                  
// // //               {/* {selectedResearch.questions && selectedResearch.questions.length > 0 && (
// // //                 <Box sx={{ mb: 3 }}>
// // //                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
// // //                     Questions & Answers
// // //                   </Typography>
// // //                   {selectedResearch.questions.map((qa, index) => (
// // //                     <Box key={index} sx={{ mb: 2 }}>
// // //                       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
// // //                         {qa.question}
// // //                       </Typography>
// // //                       <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, pl: 1 }}>
// // //                         {qa.answer}
// // //                       </Typography>
// // //                     </Box>
// // //                   ))}
// // //                 </Box>
// // //               )} */}

// // //               {selectedResearch.patent_status && (
// // //                 <Box sx={{ mb: 3 }}>
// // //                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
// // //                     Patent Status
// // //                   </Typography>
// // //                   <Chip 
// // //                     label={selectedResearch.patent_status} 
// // //                     color="info" 
// // //                     variant="outlined" 
// // //                   />
// // //                 </Box>
// // //               )}

// // //               {selectedResearch.documents && selectedResearch.documents.length > 0 && (
// // //                 <Box sx={{ mb: 3 }}>
// // //                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
// // //                     Documents ({selectedResearch.documents.length})
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
// // //                     {selectedResearch.documents.map((doc, index) => (
// // //                       <Chip 
// // //                         key={index}
// // //                         icon={<Description fontSize="small" />}
// // //                         label={doc.name || `Document ${index + 1}`}
// // //                         component="a"
// // //                         href={`${API_BASE_URL}${doc.url}`}
// // //                         target="_blank"
// // //                         rel="noopener noreferrer"
// // //                         clickable
// // //                         variant="outlined"
// // //                         size="small"
// // //                       />
// // //                     ))}
// // //                   </Box>
// // //                 </Box>
// // //               )}

// // //               <Box sx={{ mb: 3 }}>
// // //                 <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
// // //                   Research Tags
// // //                 </Typography>
// // //                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
// // //                   {selectedResearch.tags.map((tag, index) => (
// // //                     <Chip key={index} label={tag} variant="outlined" sx={{ borderColor: "#1976d2", color: "#1976d2" }} />
// // //                   ))}
// // //                 </Box>
// // //               </Box>

// // //               <Box
// // //                 sx={{
// // //                   display: "grid",
// // //                   gridTemplateColumns: "1fr 1fr",
// // //                   gap: 3,
// // //                   pt: 2,
// // //                   borderTop: "1px solid #f0f0f0",
// // //                 }}
// // //               >
// // //                 <Box>
// // //                   <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
// // //                     Created Date
// // //                   </Typography>
// // //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
// // //                     {selectedResearch.createdDate}
// // //                   </Typography>
// // //                 </Box>
// // //                 <Box>
// // //                   <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
// // //                     Last Modified
// // //                   </Typography>
// // //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
// // //                     {selectedResearch.lastModified}
// // //                   </Typography>
// // //                 </Box>
// // //               </Box>
// // //             </Box>
// // //           )}
// // //         </DialogContent>
// // //         <DialogActions sx={{ p: 3, pt: 2 }}>
// // //           <Button
// // //             onClick={() => setIsViewDialogOpen(false)}
// // //             variant="contained"
// // //             sx={{ background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" }}
// // //           >
// // //             Close
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Box>
// // //   )
// // // }

// // // export default Research



// // "use client"

// // import { useState, useEffect, useMemo } from "react"
// // import { 
// //   Box, 
// //   Avatar, 
// //   Typography, 
// //   Chip, 
// //   Dialog, 
// //   DialogTitle, 
// //   DialogContent, 
// //   DialogActions, 
// //   Button, 
// //   IconButton, 
// //   Tooltip,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   TablePagination 
// // } from "@mui/material"
// // import { Visibility, CalendarToday, Person, Description, CheckCircle, Cancel } from "@mui/icons-material"
// // import PageHeader from "../Components/PageHeaders"
// // import SearchBar from "../Components/SearchBar"
// // import DataTable from "../Components/DataTable"
// // import { auth } from "../../firebaseConfig"

// // const Research = () => {
// //   const [research, setResearch] = useState([])
// //   const [searchTerm, setSearchTerm] = useState("")
// //   const [selectedResearch, setSelectedResearch] = useState(null)
// //   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
// //   const [loading, setLoading] = useState(true)

// //   const [statusFilter, setStatusFilter] = useState("all")
// //   const [researcherFilter, setResearcherFilter] = useState("all")
// //   const [domainFilter, setDomainFilter] = useState("all")
  
// //   const [researchersList, setResearchersList] = useState([])
// //   const [domainsList, setDomainsList] = useState([])
  
// //   const [page, setPage] = useState(0)
// //   const [rowsPerPage, setRowsPerPage] = useState(5)

// //   const [sortConfig, setSortConfig] = useState({ key: 'createdDate', direction: 'descending' });

// //   const API_BASE_URL = "https://r2c.iiitd.edu.in/superapi";

// //   const getIdToken = async () => {
// //     const user = auth.currentUser;
// //     if (user) {
// //       return user.getIdToken();
// //     }
// //     throw new Error("No user logged in")
// //   }

// //   useEffect(() => {
// //     const fetchResearch = async () => {
// //       try {
// //         setLoading(true)
// //         const token = await getIdToken()
// //         const response = await fetch(`${API_BASE_URL}/studies`, {
// //           headers: { "Content-Type": "application/json", "id-token": token },
// //         })
// //         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
// //         const data = await response.json()
        
// //         const transformedData = data.studies?.map((study, index) => ({
// //           id: study._id || index,
// //           title: study.title || "Untitled Research",
// //           researcher: study.researcher_id || "Unknown Researcher",
// //           department: (study.genres && study.genres.length > 0) ? study.genres[0] : "General",
// //           status: study.approved ? "published" : "in-progress",
// //           createdDate: study.created_at || null,
// //           lastModified: study.updated_at || null,
// //           description: study.abstract || study.brief_description || "No description available",
// //           tags: study.genres || ["Research"],
// //           abstract: study.abstract,
// //           brief_description: study.brief_description,
// //           patent_status: study.patent_status,
// //           documents: study.documents || [],
// //           questions: study.questions || [],
// //           approved: study.approved
// //         })) || []

// //         setResearch(transformedData)
        
// //         const uniqueResearchers = [...new Set(transformedData.map(r => r.researcher))].filter(r => r !== "Unknown Researcher");
// //         setResearchersList(uniqueResearchers)

// //         const uniqueDomains = [...new Set(transformedData.map(r => r.department))];
// //         setDomainsList(uniqueDomains);

// //       } catch (err) {
// //         console.error("Failed to fetch studies:", err)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
// //     fetchResearch()
// //   }, [])

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleSortChange = (event) => {
// //     const [key, direction] = event.target.value.split('-');
// //     setSortConfig({ key, direction });
// //   };

// //   const filteredResearch = research.filter(
// //     (item) => {
// //       const matchesDomain = domainFilter === 'all' || item.department === domainFilter;
// //       const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
// //       const matchesResearcher = researcherFilter === 'all' || item.researcher === researcherFilter;
// //       const matchesSearch =
// //         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         item.department.toLowerCase().includes(searchTerm.toLowerCase());
// //       return matchesDomain && matchesStatus && matchesResearcher && matchesSearch;
// //     }
// //   );

// //   const sortedData = useMemo(() => {
// //     let sortableItems = [...filteredResearch];
// //     if (sortConfig.key) {
// //       sortableItems.sort((a, b) => {
// //         const aValue = a[sortConfig.key];
// //         const bValue = b[sortConfig.key];

// //         if (aValue === null) return 1;
// //         if (bValue === null) return -1;

// //         if (['createdDate', 'lastModified'].includes(sortConfig.key)) {
// //             const dateA = new Date(aValue).getTime();
// //             const dateB = new Date(bValue).getTime();
// //             if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
// //             if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1;
// //             return 0;
// //         }

// //         if (aValue.toString().toLowerCase() < bValue.toString().toLowerCase()) {
// //           return sortConfig.direction === 'ascending' ? -1 : 1;
// //         }
// //         if (aValue.toString().toLowerCase() > bValue.toString().toLowerCase()) {
// //           return sortConfig.direction === 'ascending' ? 1 : -1;
// //         }
// //         return 0;
// //       });
// //     }
// //     return sortableItems;
// //   }, [filteredResearch, sortConfig]);

// //   const paginatedData = sortedData.slice(
// //     page * rowsPerPage,
// //     page * rowsPerPage + rowsPerPage
// //   );

// //   // FIXED: Restored the function body
// //   const handleApproveResearch = async (id, currentApprovalStatus) => {
// //     try {
// //       const token = await getIdToken();
// //       const newApprovalStatus = !currentApprovalStatus;
      
// //       const response = await fetch(`${API_BASE_URL}/studies/${id}/approve`, {
// //         method: 'PATCH',
// //         headers: {
// //           "Content-Type": "application/json",
// //           "id-token": token,
// //         },
// //         body: JSON.stringify({ approved: newApprovalStatus })
// //       });

// //       if (response.ok) {
// //         setResearch(research.map(r => 
// //           r.id === id 
// //             ? { 
// //                 ...r, 
// //                 approved: newApprovalStatus,
// //                 status: newApprovalStatus ? "published" : "in-progress"
// //               }
// //             : r
// //         ));
// //         // console.log(`Study ${newApprovalStatus ? 'approved' : 'unapproved'} successfully`);
// //       } else {
// //         console.error("Failed to update approval status");
// //       }
// //     } catch (error) {
// //       console.error("Error updating approval status:", error);
// //     }
// //   };

// //   const handleViewResearch = (researchItem) => {
// //     setSelectedResearch(researchItem);
// //     setIsViewDialogOpen(true);
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case "draft":
// //         return "default"
// //       case "in-progress":
// //         return "primary"
// //       case "completed":
// //         return "success"
// //       case "published":
// //         return "secondary"
// //       default:
// //         return "default"
// //     }
// //   };

// //   const columns = [
// //     {
// //       id: "title",
// //       label: "Research Project",
// //       render: (value, row) => (
// //         <Box>
// //           <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
// //             {value}
// //           </Typography>
// //           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
// //             {row.tags.slice(0, 2).map((tag) => (
// //               <Chip
// //                 key={tag}
// //                 label={tag}
// //                 size="small"
// //                 variant="outlined"
// //                 sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
// //               />
// //             ))}
// //             {row.tags.length > 2 && (
// //               <Chip
// //                 label={`+${row.tags.length - 2}`}
// //                 size="small"
// //                 variant="outlined"
// //                 sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
// //               />
// //             )}
// //           </Box>
// //         </Box>
// //       ),
// //     },
// //     {
// //       id: "researcher",
// //       label: "Researcher",
// //       render: (value) => (
// //         <Box sx={{ display: "flex", alignItems: "center" }}>
// //           <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: "#1976d2" }}>
// //             <Person fontSize="small" />
// //           </Avatar>
// //           <Typography variant="body2" sx={{ fontWeight: 500 }}>
// //             {value}
// //           </Typography>
// //         </Box>
// //       ),
// //     },
// //     {
// //       id: "department",
// //       label: "Domain",
// //       render: (value) => (
// //         <Typography variant="body2" sx={{ fontWeight: 500 }}>
// //           {value}
// //         </Typography>
// //       ),
// //     },
// //     {
// //       id: "status",
// //       label: "Status",
// //       render: (value) => (
// //         <Chip
// //           label={value.replace("-", " ")}
// //           color={getStatusColor(value)}
// //           size="small"
// //           sx={{ fontWeight: 600, textTransform: "capitalize" }}
// //         />
// //       ),
// //     },
// //     {
// //       id: "createdDate",
// //       label: "Created",
// //       render: (value) => (
// //         <Box sx={{ display: "flex", alignItems: "center" }}>
// //           <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
// //           <Typography variant="body2" sx={{ color: "#666" }}>
// //             {value ? new Date(value).toLocaleDateString() : 'N/A'}
// //           </Typography>
// //         </Box>
// //       ),
// //     },
// //     {
// //       id: "lastModified",
// //       label: "Last Modified",
// //       render: (value) => (
// //         <Box sx={{ display: "flex", alignItems: "center" }}>
// //           <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
// //           <Typography variant="body2" sx={{ color: "#666" }}>
// //             {value ? new Date(value).toLocaleDateString() : 'N/A'}
// //           </Typography>
// //         </Box>
// //       ),
// //     },
// //     {
// //       id: "actions",
// //       label: "Actions",
// //       render: (value, row) => (
// //           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
// //               <Tooltip title="View details">
// //                   <IconButton
// //                       size="small"
// //                       onClick={() => handleViewResearch(row)}
// //                       sx={{ color: "#1976d2", "&:hover": { backgroundColor: "#e3f2fd" }, }}
// //                   >
// //                       <Visibility fontSize="small" />
// //                   </IconButton>
// //               </Tooltip>
// //               <Tooltip title={row.approved ? "Unapprove research" : "Approve research"}>
// //                   <IconButton
// //                       size="small"
// //                       onClick={() => handleApproveResearch(row.id, row.approved)}
// //                       sx={{
// //                           color: row.approved ? "#ff9800" : "#4caf50",
// //                           "&:hover": { backgroundColor: row.approved ? "#fff3e0" : "#e8f5e9" },
// //                       }}
// //                   >
// //                       {row.approved ? <Cancel fontSize="small" /> : <CheckCircle fontSize="small" />}
// //                   </IconButton>
// //               </Tooltip>
// //           </Box>
// //       ),
// //     },
// //   ];

// //   return (
// //     <Box>
// //       <PageHeader title="Research Management" subtitle="View and manage all research projects" />

// //       <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
// //         <Typography variant="h6" sx={{ fontWeight: 700, width: { xs: '100%', md: 'auto' } }}>
// //           {loading ? "Loading..." : `All Projects (${sortedData.length})`}
// //         </Typography>
        
// //         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
// //           <FormControl size="small" sx={{ minWidth: 180 }}>
// //             <InputLabel>Sort By</InputLabel>
// //             <Select
// //               value={`${sortConfig.key}-${sortConfig.direction}`}
// //               label="Sort By"
// //               onChange={handleSortChange}
// //             >
// //               <MenuItem value="createdDate-descending">Newest First</MenuItem>
// //               <MenuItem value="createdDate-ascending">Oldest First</MenuItem>
// //               <MenuItem value="title-ascending">Title (A-Z)</MenuItem>
// //               <MenuItem value="title-descending">Title (Z-A)</MenuItem>
// //               <MenuItem value="researcher-ascending">Researcher (A-Z)</MenuItem>
// //               <MenuItem value="researcher-descending">Researcher (Z-A)</MenuItem>
// //               <MenuItem value="department-ascending">Domain (A-Z)</MenuItem>
// //               <MenuItem value="department-descending">Domain (Z-A)</MenuItem>
// //             </Select>
// //           </FormControl>

// //           <FormControl size="small" sx={{ minWidth: 180 }}>
// //             <InputLabel>Domain</InputLabel>
// //             <Select
// //               value={domainFilter}
// //               label="Domain"
// //               onChange={(e) => setDomainFilter(e.target.value)}
// //             >
// //               <MenuItem value="all">All Domains</MenuItem>
// //               {domainsList.map((domain) => (
// //                 <MenuItem key={domain} value={domain}>{domain}</MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <FormControl size="small" sx={{ minWidth: 180 }}>
// //             <InputLabel>Status</InputLabel>
// //             <Select
// //               value={statusFilter}
// //               label="Status"
// //               onChange={(e) => setStatusFilter(e.target.value)}
// //             >
// //               <MenuItem value="all">All Statuses</MenuItem>
// //               <MenuItem value="published">Approved</MenuItem>
// //               <MenuItem value="in-progress">Pending Approval</MenuItem>
// //             </Select>
// //           </FormControl>

// //           <FormControl size="small" sx={{ minWidth: 200 }}>
// //             <InputLabel>Researcher</InputLabel>
// //             <Select
// //               value={researcherFilter}
// //               label="Researcher"
// //               onChange={(e) => setResearcherFilter(e.target.value)}
// //             >
// //               <MenuItem value="all">All Researchers</MenuItem>
// //               {researchersList.map((name) => (
// //                 <MenuItem key={name} value={name}>{name}</MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
          
// //           <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search projects..." />
// //         </Box>
// //       </Box>

// //       {loading ? (
// //         <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
// //           <Typography>Loading research data...</Typography>
// //         </Box>
// //       ) : (
// //         <>
// //           <DataTable columns={columns} data={paginatedData} />
// //           <TablePagination
// //             component="div"
// //             count={sortedData.length}
// //             page={page}
// //             onPageChange={handleChangePage}
// //             rowsPerPage={rowsPerPage}
// //             onRowsPerPageChange={handleChangeRowsPerPage}
// //             rowsPerPageOptions={[5, 10, 25]}
// //           />
// //         </>
// //       )}
      
// //       <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} maxWidth="md" fullWidth>
// //         <DialogTitle sx={{ pb: 1 }}>
// //           <Box sx={{ display: "flex", alignItems: "center" }}>
// //             <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: "#1976d2" }}>
// //               <Description />
// //             </Avatar>
// //             <Typography variant="h6" sx={{ fontWeight: 700 }}>
// //               Research Details
// //             </Typography>
// //           </Box>
// //         </DialogTitle>
// //         <DialogContent>
// //           {selectedResearch && (
// //             <Box sx={{ pt: 2 }}>
// //               <Box sx={{ mb: 3 }}>
// //                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
// //                   {selectedResearch.title}
// //                 </Typography>
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
// //                   <Box sx={{ display: "flex", alignItems: "center" }}>
// //                     <Person sx={{ fontSize: 16, color: "#666", mr: 1 }} />
// //                     <Typography variant="body2" sx={{ fontWeight: 500 }}>
// //                       {selectedResearch.researcher}
// //                     </Typography>
// //                   </Box>
// //                   <Typography variant="body2" sx={{ color: "#666" }}>•</Typography>
// //                   <Typography variant="body2" sx={{ color: "#666" }}>
// //                     {selectedResearch.department}
// //                   </Typography>
// //                   <Chip
// //                     label={selectedResearch.status.replace("-", " ")}
// //                     color={getStatusColor(selectedResearch.status)}
// //                     size="small"
// //                     sx={{ textTransform: "capitalize" }}
// //                   />
// //                 </Box>
// //               </Box>

// //               <Box sx={{ mb: 3 }}>
// //                 <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
// //                   Description
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6, mb: 2 }}>
// //                   {selectedResearch.description}
// //                 </Typography>
                
// //                 {selectedResearch.abstract && selectedResearch.abstract !== selectedResearch.description && (
// //                   <>
// //                     <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
// //                       Abstract
// //                     </Typography>
// //                     <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
// //                       {selectedResearch.abstract}
// //                     </Typography>
// //                   </>
// //                 )}
// //               </Box>
                  
// //               {/* {selectedResearch.questions && selectedResearch.questions.length > 0 && (
// //                 <Box sx={{ mb: 3 }}>
// //                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
// //                     Questions & Answers
// //                   </Typography>
// //                   {selectedResearch.questions.map((qa, index) => (
// //                     <Box key={index} sx={{ mb: 2 }}>
// //                       <Typography variant="body2" sx={{ fontWeight: "bold" }}>
// //                         {qa.question}
// //                       </Typography>
// //                       <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5, pl: 1 }}>
// //                         {qa.answer}
// //                       </Typography>
// //                     </Box>
// //                   ))}
// //                 </Box>
// //               )} */}

// //               {selectedResearch.patent_status && (
// //                 <Box sx={{ mb: 3 }}>
// //                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
// //                     Patent Status
// //                   </Typography>
// //                   <Chip 
// //                     label={selectedResearch.patent_status} 
// //                     color="info" 
// //                     variant="outlined" 
// //                   />
// //                 </Box>
// //               )}

// //               {selectedResearch.documents && selectedResearch.documents.length > 0 && (
// //                 <Box sx={{ mb: 3 }}>
// //                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
// //                     Documents ({selectedResearch.documents.length})
// //                   </Typography>
// //                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
// //                     {selectedResearch.documents.map((doc, index) => (
// //                       <Chip 
// //                         key={index}
// //                         icon={<Description fontSize="small" />}
// //                         label={doc.name || `Document ${index + 1}`}
// //                         component="a"
// //                         href={`https://r2c.iiitd.edu.in/api/${doc.url}`}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         clickable
// //                         variant="outlined"
// //                         size="small"
// //                       />
// //                     ))}
// //                   </Box>
// //                 </Box>
// //               )}

// //               <Box sx={{ mb: 3 }}>
// //                 <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
// //                   Research Tags
// //                 </Typography>
// //                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
// //                   {selectedResearch.tags.map((tag, index) => (
// //                     <Chip key={index} label={tag} variant="outlined" sx={{ borderColor: "#1976d2", color: "#1976d2" }} />
// //                   ))}
// //                 </Box>
// //               </Box>

// //               <Box
// //                 sx={{
// //                   display: "grid",
// //                   gridTemplateColumns: "1fr 1fr",
// //                   gap: 3,
// //                   pt: 2,
// //                   borderTop: "1px solid #f0f0f0",
// //                 }}
// //               >
// //                 <Box>
// //                   <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
// //                     Created Date
// //                   </Typography>
// //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
// //                     {selectedResearch.createdDate ? new Date(selectedResearch.createdDate).toLocaleDateString() : 'N/A'}
// //                   </Typography>
// //                 </Box>
// //                 <Box>
// //                   <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
// //                     Last Modified
// //                   </Typography>
// //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
// //                      {selectedResearch.lastModified ? new Date(selectedResearch.lastModified).toLocaleDateString() : 'N/A'}
// //                   </Typography>
// //                 </Box>
// //               </Box>
// //             </Box>
// //           )}
// //         </DialogContent>
// //         <DialogActions sx={{ p: 3, pt: 2 }}>
// //           <Button
// //             onClick={() => setIsViewDialogOpen(false)}
// //             variant="contained"
// //             sx={{ background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" }}
// //           >
// //             Close
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   )
// // }

// // export default Research


// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { 
//   Box, 
//   Avatar, 
//   Typography, 
//   Chip, 
//   Dialog, 
//   DialogTitle, 
//   DialogContent, 
//   DialogActions, 
//   Button, 
//   IconButton, 
//   Tooltip,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TablePagination 
// } from "@mui/material"
// import { Visibility, CalendarToday, Person, Description, CheckCircle, Cancel } from "@mui/icons-material"
// import PageHeader from "../Components/PageHeaders"
// import SearchBar from "../Components/SearchBar"
// import DataTable from "../Components/DataTable"
// import { auth } from "../../firebaseConfig"

// const Research = () => {
//   const [research, setResearch] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedResearch, setSelectedResearch] = useState(null)
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
//   const [loading, setLoading] = useState(true)

//   const [statusFilter, setStatusFilter] = useState("all")
//   const [researcherFilter, setResearcherFilter] = useState("all")
//   const [domainFilter, setDomainFilter] = useState("all")
//   
//   const [researchersList, setResearchersList] = useState([])
//   const [domainsList, setDomainsList] = useState([])
//   
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(5)

//   const [sortConfig, setSortConfig] = useState({ key: 'createdDate', direction: 'descending' });

//   const API_BASE_URL = "https://r2c.iiitd.edu.in/superapi";

//   const getIdToken = async () => {
//     const user = auth.currentUser;
//     if (user) {
//       return user.getIdToken();
//     }
//     throw new Error("No user logged in")
//   }

//   useEffect(() => {
//     const fetchResearch = async () => {
//       try {
//         setLoading(true)
//         const token = await getIdToken()
//         const response = await fetch(`${API_BASE_URL}/studies`, {
//           headers: { "Content-Type": "application/json", "id-token": token },
//         })
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
//         
//         const data = await response.json()
//         
//         const transformedData = data.studies?.map((study, index) => ({
//           id: study._id || index,
//           title: study.title || "Untitled Research",
//           researcher: study.researcher_id || "Unknown Researcher",
//           department: (study.genres && study.genres.length > 0) ? study.genres[0] : "General",
//           status: study.approved ? "published" : "in-progress",
//           createdDate: study.created_at || null,
//           lastModified: study.updated_at || null,
//           description: study.abstract || study.brief_description || "No description available",
//           tags: study.genres || ["Research"],
//           abstract: study.abstract,
//           brief_description: study.brief_description,
//           patent_status: study.patent_status,
//           documents: study.documents || [],
//           questions: study.questions || [],
//           approved: study.approved
//         })) || []

//         setResearch(transformedData)
//         
//         const uniqueResearchers = [...new Set(transformedData.map(r => r.researcher))].filter(r => r !== "Unknown Researcher");
//         setResearchersList(uniqueResearchers)

//         const uniqueDomains = [...new Set(transformedData.map(r => r.department))];
//         setDomainsList(uniqueDomains);

//       } catch (err) {
//         console.error("Failed to fetch studies:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchResearch()
//   }, [])

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSortChange = (event) => {
//     const [key, direction] = event.target.value.split('-');
//     setSortConfig({ key, direction });
//   };

//   const filteredResearch = research.filter(
//     (item) => {
//       const matchesDomain = domainFilter === 'all' || item.department === domainFilter;
//       const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
//       const matchesResearcher = researcherFilter === 'all' || item.researcher === researcherFilter;
//       const matchesSearch =
//         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.department.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesDomain && matchesStatus && matchesResearcher && matchesSearch;
//     }
//   );

//   const sortedData = useMemo(() => {
//     let sortableItems = [...filteredResearch];
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         const aValue = a[sortConfig.key];
//         const bValue = b[sortConfig.key];

//         if (aValue === null) return 1;
//         if (bValue === null) return -1;

//         if (['createdDate', 'lastModified'].includes(sortConfig.key)) {
//             const dateA = new Date(aValue).getTime();
//             const dateB = new Date(bValue).getTime();
//             if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
//             if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1;
//             return 0;
//         }

//         if (aValue.toString().toLowerCase() < bValue.toString().toLowerCase()) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (aValue.toString().toLowerCase() > bValue.toString().toLowerCase()) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [filteredResearch, sortConfig]);

//   const paginatedData = sortedData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleApproveResearch = async (id, currentApprovalStatus) => {
//     try {
//       const token = await getIdToken();
//       const newApprovalStatus = !currentApprovalStatus;
//       
//       const response = await fetch(`${API_BASE_URL}/studies/${id}/approve`, {
//         method: 'PATCH',
//         headers: {
//           "Content-Type": "application/json",
//           "id-token": token,
//         },
//         body: JSON.stringify({ approved: newApprovalStatus })
//       });

//       if (response.ok) {
//         setResearch(research.map(r => 
//           r.id === id 
//             ? { 
//                 ...r, 
//                 approved: newApprovalStatus,
//                 status: newApprovalStatus ? "published" : "in-progress"
//               }
//             : r
//         ));
//       } else {
//         console.error("Failed to update approval status");
//       }
//     } catch (error) {
//       console.error("Error updating approval status:", error);
//     }
//   };

//   const handleViewResearch = (researchItem) => {
//     setSelectedResearch(researchItem);
//     setIsViewDialogOpen(true);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "draft":
//         return "default"
//       case "in-progress":
//         return "primary"
//       case "completed":
//         return "success"
//       case "published":
//         return "secondary"
//       default:
//         return "default"
//     }
//   };

//   const columns = [
//     {
//       id: "title",
//       label: "Research Project",
//       render: (value, row) => (
//         <Box>
//           <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
//             {value}
//           </Typography>
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//             {row.tags.slice(0, 2).map((tag) => (
//               <Chip
//                 key={tag}
//                 label={tag}
//                 size="small"
//                 variant="outlined"
//                 sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
//               />
//             ))}
//             {row.tags.length > 2 && (
//               <Chip
//                 label={`+${row.tags.length - 2}`}
//                 size="small"
//                 variant="outlined"
//                 sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
//               />
//             )}
//           </Box>
//         </Box>
//       ),
//     },
//     {
//       id: "researcher",
//       label: "Researcher",
//       render: (value) => (
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: "#1976d2" }}>
//             <Person fontSize="small" />
//           </Avatar>
//           <Typography variant="body2" sx={{ fontWeight: 500 }}>
//             {value}
//           </Typography>
//         </Box>
//       ),
//     },
//     {
//       id: "department",
//       label: "Domain",
//       render: (value) => (
//         <Typography variant="body2" sx={{ fontWeight: 500 }}>
//           {value}
//         </Typography>
//       ),
//     },
//     {
//       id: "status",
//       label: "Status",
//       render: (value) => (
//         <Chip
//           label={value.replace("-", " ")}
//           color={getStatusColor(value)}
//           size="small"
//           sx={{ fontWeight: 600, textTransform: "capitalize" }}
//         />
//       ),
//     },
//     {
//       id: "createdDate",
//       label: "Created",
//       render: (value) => (
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
//           <Typography variant="body2" sx={{ color: "#666" }}>
//             {value ? new Date(value).toLocaleDateString() : 'N/A'}
//           </Typography>
//         </Box>
//       ),
//     },
//     {
//       id: "lastModified",
//       label: "Last Modified",
//       render: (value) => (
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
//           <Typography variant="body2" sx={{ color: "#666" }}>
//             {value ? new Date(value).toLocaleDateString() : 'N/A'}
//           </Typography>
//         </Box>
//       ),
//     },
//     {
//       id: "actions",
//       label: "Actions",
//       render: (value, row) => (
//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
//               <Tooltip title="View details">
//                   <IconButton
//                       size="small"
//                       onClick={() => handleViewResearch(row)}
//                       sx={{ color: "#1976d2", "&:hover": { backgroundColor: "#e3f2fd" }, }}
//                   >
//                       <Visibility fontSize="small" />
//                   </IconButton>
//               </Tooltip>
//               <Tooltip title={row.approved ? "Unapprove research" : "Approve research"}>
//                   <IconButton
//                       size="small"
//                       onClick={() => handleApproveResearch(row.id, row.approved)}
//                       sx={{
//                           color: row.approved ? "#ff9800" : "#4caf50",
//                           "&:hover": { backgroundColor: row.approved ? "#fff3e0" : "#e8f5e9" },
//                       }}
//                   >
//                       {row.approved ? <Cancel fontSize="small" /> : <CheckCircle fontSize="small" />}
//                   </IconButton>
//               </Tooltip>
//           </Box>
//       ),
//     },
//   ];

//   return (
//     <Box>
//       <PageHeader title="Research Management" subtitle="View and manage all research projects" />

//       <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: 700, width: { xs: '100%', md: 'auto' } }}>
//           {loading ? "Loading..." : `All Projects (${sortedData.length})`}
//         </Typography>
//         
//         <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
//           <FormControl size="small" sx={{ minWidth: 180 }}>
//             <InputLabel>Sort By</InputLabel>
//             <Select
//               value={`${sortConfig.key}-${sortConfig.direction}`}
//               label="Sort By"
//               onChange={handleSortChange}
//             >
//               <MenuItem value="createdDate-descending">Newest First</MenuItem>
//               <MenuItem value="createdDate-ascending">Oldest First</MenuItem>
//               <MenuItem value="title-ascending">Title (A-Z)</MenuItem>
//               <MenuItem value="title-descending">Title (Z-A)</MenuItem>
//               <MenuItem value="researcher-ascending">Researcher (A-Z)</MenuItem>
//               <MenuItem value="researcher-descending">Researcher (Z-A)</MenuItem>
//               <MenuItem value="department-ascending">Domain (A-Z)</MenuItem>
//               <MenuItem value="department-descending">Domain (Z-A)</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl size="small" sx={{ minWidth: 180 }}>
//             <InputLabel>Domain</InputLabel>
//             <Select
//               value={domainFilter}
//               label="Domain"
//               onChange={(e) => setDomainFilter(e.target.value)}
//             >
//               <MenuItem value="all">All Domains</MenuItem>
//               {domainsList.map((domain) => (
//                 <MenuItem key={domain} value={domain}>{domain}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl size="small" sx={{ minWidth: 180 }}>
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={statusFilter}
//               label="Status"
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <MenuItem value="all">All Statuses</MenuItem>
//               <MenuItem value="published">Approved</MenuItem>
//               <MenuItem value="in-progress">Pending Approval</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl size="small" sx={{ minWidth: 200 }}>
//             <InputLabel>Researcher</InputLabel>
//             <Select
//               value={researcherFilter}
//               label="Researcher"
//               onChange={(e) => setResearcherFilter(e.target.value)}
//             >
//               <MenuItem value="all">All Researchers</MenuItem>
//               {researchersList.map((name) => (
//                 <MenuItem key={name} value={name}>{name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           
//           <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search projects..." />
//         </Box>
//       </Box>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
//           <Typography>Loading research data...</Typography>
//         </Box>
//       ) : (
//         <>
//           <DataTable columns={columns} data={paginatedData} />
//           <TablePagination
//             component="div"
//             count={sortedData.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 25]}
//           />
//         </>
//       )}
//       
//       <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ pb: 1 }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: "#1976d2" }}>
//               <Description />
//             </Avatar>
//             <Typography variant="h6" sx={{ fontWeight: 700 }}>
//               Research Details
//             </Typography>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           {selectedResearch && (
//             <Box sx={{ pt: 2 }}>
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//                   {selectedResearch.title}
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Person sx={{ fontSize: 16, color: "#666", mr: 1 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                       {selectedResearch.researcher}
//                     </Typography>
//                   </Box>
//                   <Typography variant="body2" sx={{ color: "#666" }}>•</Typography>
//                   <Typography variant="body2" sx={{ color: "#666" }}>
//                     {selectedResearch.department}
//                   </Typography>
//                   <Chip
//                     label={selectedResearch.status.replace("-", " ")}
//                     color={getStatusColor(selectedResearch.status)}
//                     size="small"
//                     sx={{ textTransform: "capitalize" }}
//                   />
//                 </Box>
//               </Box>

//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
//                   Description
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6, mb: 2 }}>
//                   {selectedResearch.description}
//                 </Typography>
//                 
//                 {selectedResearch.abstract && selectedResearch.abstract !== selectedResearch.description && (
//                   <>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
//                       Abstract
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
//                       {selectedResearch.abstract}
//                     </Typography>
//                   </>
//                 )}
//               </Box>
//                   
//               {selectedResearch.patent_status && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
//                     Patent Status
//                   </Typography>
//                   <Chip 
//                     label={selectedResearch.patent_status} 
//                     color="info" 
//                     variant="outlined" 
//                   />
//                 </Box>
//               )}

//               {selectedResearch.documents && selectedResearch.documents.length > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
//                     Documents ({selectedResearch.documents.length})
//                   </Typography>
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                     {selectedResearch.documents.map((doc, index) => (
//                       <Chip 
//                         key={index}
//                         icon={<Description fontSize="small" />}
//                         label={doc.display_name || `Document ${index + 1}`}
//                         component="a"
//                         href={`https://r2c.iiitd.edu.in/api/${doc.file_location}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         clickable
//                         variant="outlined"
//                         size="small"
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               )}

//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
//                   Research Tags
//                 </Typography>
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                   {selectedResearch.tags.map((tag, index) => (
//                     <Chip key={index} label={tag} variant="outlined" sx={{ borderColor: "#1976d2", color: "#1976d2" }} />
//                   ))}
//                 </Box>
//               </Box>

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 3,
//             _id: "6892f9fd24e9251c23cd2fa9",
//                   pt: 2,
//                   borderTop: "1px solid #f0f0f0",
//                 }}
//               >
//                 <Box>
//                   <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
//                     Created Date
//                   </Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                     {selectedResearch.createdDate ? new Date(selectedResearch.createdDate).toLocaleDateString() : 'N/A'}
//                   </Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
//                     Last Modified
//                   </Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                      {selectedResearch.lastModified ? new Date(selectedResearch.lastModified).toLocaleDateString() : 'N/A'}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 2 }}>
//           <Button
//             onClick={() => setIsViewDialogOpen(false)}
//             variant="contained"
//             sx={{ background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// export default Research




"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  Box, 
  Avatar, 
  Typography, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  IconButton, 
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination 
} from "@mui/material"
import { Visibility, CalendarToday, Person, Description, CheckCircle, Cancel } from "@mui/icons-material"

// Firebase Imports
import { auth, db } from "../../firebaseConfig"; // Make sure to export 'db' from your config file
import { collection, getDocs } from "firebase/firestore";

// Component Imports
import PageHeader from "../Components/PageHeaders"
import SearchBar from "../Components/SearchBar"
import DataTable from "../Components/DataTable"


const Research = () => {
  const [research, setResearch] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedResearch, setSelectedResearch] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [statusFilter, setStatusFilter] = useState("all")
  const [researcherFilter, setResearcherFilter] = useState("all")
  const [domainFilter, setDomainFilter] = useState("all")
  
  const [researchersList, setResearchersList] = useState([])
  const [domainsList, setDomainsList] = useState([])
  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [sortConfig, setSortConfig] = useState({ key: 'createdDate', direction: 'descending' });

  const API_BASE_URL = "https://r2c.iiitd.edu.in/superapi";

  const getIdToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    throw new Error("No user logged in")
  }

  useEffect(() => {
    // Fetches both studies and researcher names, then combines them.
    const fetchAndProcessData = async () => {
      try {
        setLoading(true);
        const token = await getIdToken();

        // 1. Define promises for fetching studies and researchers
        const studiesPromise = fetch(`${API_BASE_URL}/studies`, {
            headers: { "Content-Type": "application/json", "id-token": token },
        });
        
        // Assuming your researchers/users are in a 'users' collection in Firestore
        const researchersPromise = getDocs(collection(db, "users"));

        // 2. Fetch data in parallel for efficiency
        const [studiesResponse, researchersSnapshot] = await Promise.all([
            studiesPromise,
            researchersPromise,
        ]);
        
        if (!studiesResponse.ok) {
            throw new Error(`HTTP error! status: ${studiesResponse.status}`);
        }
        
        const studiesData = await studiesResponse.json();

        // 3. Create a lookup map from researcher ID to displayName
        const researcherMap = {};
        researchersSnapshot.forEach((doc) => {
            // Assumes each user document has a 'displayName' field
            researcherMap[doc.id] = doc.data().displayName || doc.id;
        });

        // 4. Transform study data, replacing researcher_id with displayName
        const transformedData = studiesData.studies?.map((study, index) => ({
          id: study._id || index,
          title: study.title || "Untitled Research",
          // Use the map to get the name, with a fallback to the ID
          researcher: researcherMap[study.researcher_id] || "Unknown Researcher",
          department: (study.genres && study.genres.length > 0) ? study.genres[0] : "General",
          status: study.approved ? "published" : "in-progress",
          createdDate: study.created_at || null,
          lastModified: study.updated_at || null,
          description: study.abstract || study.brief_description || "No description available",
          tags: study.genres || ["Research"],
          abstract: study.abstract,
          brief_description: study.brief_description,
          patent_status: study.patent_status,
          documents: study.documents || [],
          questions: study.questions || [],
          approved: study.approved
        })) || [];

        setResearch(transformedData);
        
        // 5. Populate filter lists
        const uniqueResearchers = [...new Set(transformedData.map(r => r.researcher))].filter(r => r !== "Unknown Researcher");
        setResearchersList(uniqueResearchers);

        const uniqueDomains = [...new Set(transformedData.map(r => r.department))];
        setDomainsList(uniqueDomains);

      } catch (err) {
        console.error("Failed to fetch and process data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortChange = (event) => {
    const [key, direction] = event.target.value.split('-');
    setSortConfig({ key, direction });
  };

  const filteredResearch = research.filter(
    (item) => {
      const matchesDomain = domainFilter === 'all' || item.department === domainFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesResearcher = researcherFilter === 'all' || item.researcher === researcherFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDomain && matchesStatus && matchesResearcher && matchesSearch;
    }
  );

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredResearch];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null) return 1;
        if (bValue === null) return -1;

        if (['createdDate', 'lastModified'].includes(sortConfig.key)) {
            const dateA = new Date(aValue).getTime();
            const dateB = new Date(bValue).getTime();
            if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        }

        if (aValue.toString().toLowerCase() < bValue.toString().toLowerCase()) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue.toString().toLowerCase() > bValue.toString().toLowerCase()) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredResearch, sortConfig]);

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleApproveResearch = async (id, currentApprovalStatus) => {
    try {
      const token = await getIdToken();
      const newApprovalStatus = !currentApprovalStatus;
      
      const response = await fetch(`${API_BASE_URL}/studies/${id}/approve`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "id-token": token,
        },
        body: JSON.stringify({ approved: newApprovalStatus })
      });

      if (response.ok) {
        setResearch(research.map(r => 
          r.id === id 
            ? { 
                ...r, 
                approved: newApprovalStatus,
                status: newApprovalStatus ? "published" : "in-progress"
              }
            : r
        ));
      } else {
        console.error("Failed to update approval status");
      }
    } catch (error) {
      console.error("Error updating approval status:", error);
    }
  };

  const handleViewResearch = (researchItem) => {
    setSelectedResearch(researchItem);
    setIsViewDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "default"
      case "in-progress":
        return "primary"
      case "completed":
        return "success"
      case "published":
        return "secondary"
      default:
        return "default"
    }
  };

  const columns = [
    {
      id: "title",
      label: "Research Project",
      render: (value, row) => (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            {value}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {row.tags.slice(0, 2).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
              />
            ))}
            {row.tags.length > 2 && (
              <Chip
                label={`+${row.tags.length - 2}`}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.75rem", height: 20, borderColor: "#e0e0e0", color: "#666" }}
              />
            )}
          </Box>
        </Box>
      ),
    },
    {
      id: "researcher",
      label: "Researcher",
      render: (value) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 32, height: 32, mr: 2, backgroundColor: "#1976d2" }}>
            <Person fontSize="small" />
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {value}
          </Typography>
        </Box>
      ),
    },
    {
      id: "department",
      label: "Domain",
      render: (value) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      ),
    },
    {
      id: "status",
      label: "Status",
      render: (value) => (
        <Chip
          label={value.replace("-", " ")}
          color={getStatusColor(value)}
          size="small"
          sx={{ fontWeight: 600, textTransform: "capitalize" }}
        />
      ),
    },
    {
      id: "createdDate",
      label: "Created",
      render: (value) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
          <Typography variant="body2" sx={{ color: "#666" }}>
            {value ? new Date(value).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
      ),
    },
    {
      id: "lastModified",
      label: "Last Modified",
      render: (value) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarToday sx={{ fontSize: 16, color: "#666", mr: 1 }} />
          <Typography variant="body2" sx={{ color: "#666" }}>
            {value ? new Date(value).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      render: (value, row) => (
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Tooltip title="View details">
                  <IconButton
                      size="small"
                      onClick={() => handleViewResearch(row)}
                      sx={{ color: "#1976d2", "&:hover": { backgroundColor: "#e3f2fd" }, }}
                  >
                      <Visibility fontSize="small" />
                  </IconButton>
              </Tooltip>
              <Tooltip title={row.approved ? "Unapprove research" : "Approve research"}>
                  <IconButton
                      size="small"
                      onClick={() => handleApproveResearch(row.id, row.approved)}
                      sx={{
                          color: row.approved ? "#ff9800" : "#4caf50",
                          "&:hover": { backgroundColor: row.approved ? "#fff3e0" : "#e8f5e9" },
                      }}
                  >
                      {row.approved ? <Cancel fontSize="small" /> : <CheckCircle fontSize="small" />}
                  </IconButton>
              </Tooltip>
          </Box>
      ),
    },
  ];

  return (
    // The JSX for rendering the component remains the same.
    // ... (rest of the component)
    <Box>
      <PageHeader title="Research Management" subtitle="View and manage all research projects" />

      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, width: { xs: '100%', md: 'auto' } }}>
          {loading ? "Loading..." : `All Projects (${sortedData.length})`}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="createdDate-descending">Newest First</MenuItem>
              <MenuItem value="createdDate-ascending">Oldest First</MenuItem>
              <MenuItem value="title-ascending">Title (A-Z)</MenuItem>
              <MenuItem value="title-descending">Title (Z-A)</MenuItem>
              <MenuItem value="researcher-ascending">Researcher (A-Z)</MenuItem>
              <MenuItem value="researcher-descending">Researcher (Z-A)</MenuItem>
              <MenuItem value="department-ascending">Domain (A-Z)</MenuItem>
              <MenuItem value="department-descending">Domain (Z-A)</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Domain</InputLabel>
            <Select
              value={domainFilter}
              label="Domain"
              onChange={(e) => setDomainFilter(e.target.value)}
            >
              <MenuItem value="all">All Domains</MenuItem>
              {domainsList.map((domain) => (
                <MenuItem key={domain} value={domain}>{domain}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="published">Approved</MenuItem>
              <MenuItem value="in-progress">Pending Approval</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Researcher</InputLabel>
            <Select
              value={researcherFilter}
              label="Researcher"
              onChange={(e) => setResearcherFilter(e.target.value)}
            >
              <MenuItem value="all">All Researchers</MenuItem>
              {researchersList.map((name) => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search projects..." />
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography>Loading research data...</Typography>
        </Box>
      ) : (
        <>
          <DataTable columns={columns} data={paginatedData} />
          <TablePagination
            component="div"
            count={sortedData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      )}
      
      <Dialog open={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: "#1976d2" }}>
              <Description />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Research Details
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedResearch && (
            <Box sx={{ pt: 2 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {selectedResearch.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Person sx={{ fontSize: 16, color: "#666", mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {selectedResearch.researcher}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: "#666" }}>•</Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {selectedResearch.department}
                  </Typography>
                  <Chip
                    label={selectedResearch.status.replace("-", " ")}
                    color={getStatusColor(selectedResearch.status)}
                    size="small"
                    sx={{ textTransform: "capitalize" }}
                  />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Description
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6, mb: 2 }}>
                  {selectedResearch.description}
                </Typography>
                
                {selectedResearch.abstract && selectedResearch.abstract !== selectedResearch.description && (
                  <>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
                      Abstract
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6 }}>
                      {selectedResearch.abstract}
                    </Typography>
                  </>
                )}
              </Box>
                  
              {selectedResearch.patent_status && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Patent Status
                  </Typography>
                  <Chip 
                    label={selectedResearch.patent_status} 
                    color="info" 
                    variant="outlined" 
                  />
                </Box>
              )}

              {selectedResearch.documents && selectedResearch.documents.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Documents ({selectedResearch.documents.length})
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedResearch.documents.map((doc, index) => (
                      <Chip 
                        key={index}
                        icon={<Description fontSize="small" />}
                        label={doc.display_name || `Document ${index + 1}`}
                        component="a"
                        href={`https://r2c.iiitd.edu.in/api/${doc.file_location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        clickable
                        variant="outlined"
                        size="small"
                      />
          _id: "6892f9fd24e9251c23cd2fa9",
                                                </Box>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Research Tags
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {selectedResearch.tags.map((tag, index) => (
                    <Chip key={index} label={tag} variant="outlined" sx={{ borderColor: "#1976d2", color: "#1976d2" }} />
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 3,
                  pt: 2,
                  borderTop: "1px solid #f0f0f0",
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
                    Created Date
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {selectedResearch.createdDate ? new Date(selectedResearch.createdDate).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#666", mb: 0.5 }}>
                    Last Modified
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                     {selectedResearch.lastModified ? new Date(selectedResearch.lastModified).toLocaleDateString() : 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setIsViewDialogOpen(false)}
            variant="contained"
            sx={{ background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Research