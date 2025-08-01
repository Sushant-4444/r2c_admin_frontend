"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Alert,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import { AdminPanelSettings, Google } from "@mui/icons-material";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";
import { useAuth } from "../Contexts/AuthContext";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Show loading while checking auth state
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // Redirect if already authenticated
  if (user) {
    navigate("/admin");
    return null;
  }

  const signInWithGoogle = async () => {
    const provider = googleProvider;
    const result = await signInWithPopup(auth, provider);
    return result.user;
  };

  const getIdToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    throw new Error("No user logged in");
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Sign in and get the user
      await signInWithGoogle();
      const token = await getIdToken();
      console.log("Google sign-in successful. Token:", token);

      // Call backend to check admin status
      const response = await fetch("https://r2c.iiitd.edu.in/superapi/auth/google-signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "id-token": token,
        },
        body: JSON.stringify({}), // Required to prevent body-parser crash
      });

      if (!response.ok) {
        setError("You are not authorized to access the admin panel.");
        return;
      }

      const data = await response.json();

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        setError("You are not authorized to access the admin panel.");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        setError("Sign-in was cancelled");
      } else if (error.code === "auth/popup-blocked") {
        setError("Popup was blocked by your browser. Please allow popups and try again.");
      } else {
        setError(error.message || "Failed to sign in with Google");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={24} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Box
            sx={{
              background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
              p: 4,
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto 16px",
                background: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <AdminPanelSettings sx={{ fontSize: 40, color: "white" }} />
            </Avatar>
            <Typography variant="h4" sx={{ color: "white", fontWeight: 700, mb: 1 }}>
              Research Admin
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
              Secure Access Portal
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", mb: 3, fontWeight: 600, color: "#1976d2" }}
            >
              Sign In to Continue
            </Typography>

            <Typography
              variant="body2"
              sx={{ textAlign: "center", mb: 4, color: "#666" }}
            >
              Use your Google account to access the admin panel
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              onClick={handleGoogleSignIn}
              startIcon={<Google />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                boxShadow: "0 8px 32px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
                  boxShadow: "0 12px 40px rgba(25, 118, 210, 0.4)",
                },
                "&:disabled": {
                  background: "#ccc",
                },
              }}
            >
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
