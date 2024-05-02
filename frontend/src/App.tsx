/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout, Chat, ErrorPage, Home, SignIn, SignUp } from "./pages";
import { Toaster } from "react-hot-toast";
import { UseAuthContext } from "./context/AuthContext";

function App() {
  const context = UseAuthContext();
  if (!context) return null;
  const { isLoggedIn, loading } = context;
  if (loading) return null;

  return (
    <main>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Route>

          {/* Private Routes */}
          <Route
            path="/chat"
            element={isLoggedIn ? <Chat /> : <Navigate to={"/sign-in"} />}
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
