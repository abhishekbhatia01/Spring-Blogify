import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import CreatBlog from "./pages/CreatBlog";
import Profile from "./pages/Profile";
import MyBlogs from "./pages/MyBlogs";
import About from "./pages/About";
import BlogDetail from "./pages/BlogDetail";
import { useAuthStore } from "./store/userAuthStore";
import RequireGuest from "./components/RequireGuest";

const RequireAuth = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles && roles.length > 0) {
    const hasRole = user?.roles?.some((role) => roles.includes(role));
    if (!hasRole) {
      return <Navigate to="/" replace />; // redirect to home or 403 page
    }
  }
  return children;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <RequireGuest>
                <Register />
              </RequireGuest>
            }
          />
          <Route
            path="/login"
            element={
              <RequireGuest>
                <Login />
              </RequireGuest>
            }
          />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route
              path="/create"
              element={
                <RequireAuth>
                  <CreatBlog />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth roles={["USER", "ADMIN"]}>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/my-blogs"
              element={
                <RequireAuth>
                  <MyBlogs />
                </RequireAuth>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
