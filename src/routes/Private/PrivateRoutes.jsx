import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../../components/config/firebase";

function PrivateRoutes({ Component }) {
  const [authentificated, setAuthentificated] = useState(false);
  const [loading, setLoading] = useState(true);
  let auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthentificated(true);
      } else {
        setAuthentificated(false);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return authentificated ? <Component /> : <Navigate to="/" />;
}

export default PrivateRoutes;

