import { Routes, Route } from "react-router-dom";
import { AuthLayout, Chat, ErrorPage, Home, SignIn, SignUp } from "./pages";

function App() {
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
          <Route path="/chat" element={<Chat />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
