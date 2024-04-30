import { Routes, Route } from "react-router-dom";
import { AuthLayout, Home, SignIn, SignUp } from "./pages";

function App() {
  return (
    <main>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

export default App;
