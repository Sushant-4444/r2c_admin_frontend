// "use client"

// import { Navigate } from "react-router-dom"
// import { Box, CircularProgress } from "@mui/material"
// import { useAuth } from "../Contexts/AuthContext"

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     )
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />
//   }

//   return children
// }

// export default ProtectedRoute



"use client";

import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Not admin
  // console.log("User role:", user);
  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

