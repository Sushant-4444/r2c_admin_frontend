// "use client"

// import { createContext, useContext, useState, useEffect } from "react"
// import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth"
// import { auth } from "../../firebaseConfig"

// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         setUser({
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//           displayName: firebaseUser.displayName,
//           photoURL: firebaseUser.photoURL
//         })
//       } else {
//         setUser(null)
//       }
//       setLoading(false)
//     })

//     return unsubscribe
//   }, [])

//   // Get token on-demand when needed for API calls
//   const getToken = async () => {
//     if (user && auth.currentUser) {
//       try {
//         return await auth.currentUser.getIdToken()
//       } catch (error) {
//         console.error("Error getting ID token:", error)
//         return null
//       }
//     }
//     return null
//   }

//   const logout = async () => {
//     try {
//       await firebaseSignOut(auth)
//     } catch (error) {
//       console.error("Error signing out:", error)
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, getToken, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }



"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          console.log("Firebase idToken : ", idToken);

          // 🔐 Get user role and profile from your backend
          const res = await fetch("http://localhost:5000/auth/google-signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "id-token": idToken,
            },
            body: JSON.stringify({}), // Prevent body-parser error
          });

          if (!res.ok) throw new Error("Failed to fetch user role from server");

          const data = await res.json();
          console.log("User data from server:", data);

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: data.userProfile.role, // ✅ Add role to context
          });
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    if (auth.currentUser) {
      try {
        return await auth.currentUser.getIdToken();
      } catch (error) {
        console.error("Error getting ID token:", error);
        return null;
      }
    }
    return null;
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, getToken, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

