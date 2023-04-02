import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Transactions from "./pages/Transactions";
import Request from "./pages/Request";
import Users from "./pages/Users";
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/transcations"
            element={
              <ProtectedRoutes>
                <Transactions />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/requests"
            element={
              <ProtectedRoutes>
                <Request />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
