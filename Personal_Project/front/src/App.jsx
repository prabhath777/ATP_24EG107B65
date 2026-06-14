import  { useEffect } from "react";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/authStore";
import { loading as loadingStyle, pageWrapper } from "../common";

function App() {
  const { checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className={`${pageWrapper} min-h-screen flex items-center justify-center`}>
        <div className={loadingStyle}>
          🔴 Restoring session, please wait...
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
