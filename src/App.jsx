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
import EditBlog from "./pages/EditBlog";
import { useAuthStore } from "./store/userAuthStore";
import RequireGuest from "./components/RequireGuest";
import Dashboard from "./pages/admin/Dashboard";
import DashboardHome from "./pages/admin/DashboardHome";
import UserManagement from "./pages/admin/UserManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import NotFound404 from "./pages/NotFound404";

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
            errorElement={<NotFound404 />}
          />
          <Route
            path="/login"
            element={
              <RequireGuest>
                <Login />
              </RequireGuest>
            }
            errorElement={<NotFound404 />}
          />
          <Route
            path="/admin"
            element={
              <RequireAuth roles={["ROLE_ADMIN"]}>
                <Dashboard />
              </RequireAuth>
            }
            errorElement={<NotFound404 />}
          >
            <Route
              index
              element={<DashboardHome />}
              errorElement={<NotFound404 />}
            />
            <Route
              path="users"
              element={<UserManagement />}
              errorElement={<NotFound404 />}
            />
            <Route
              path="blogs"
              element={<BlogManagement />}
              errorElement={<NotFound404 />}
            />
          </Route>
          <Route
            path="/"
            element={<MainLayout />}
            errorElement={<NotFound404 />}
          >
            <Route index element={<Home />} errorElement={<NotFound404 />} />
            <Route
              path="/blogs"
              element={<Blogs />}
              errorElement={<NotFound404 />}
            />
            <Route
              path="/create"
              element={
                <RequireAuth>
                  <CreatBlog />
                </RequireAuth>
              }
              errorElement={<NotFound404 />}
            />
            <Route
              path="/profile"
              element={
                <RequireAuth roles={["ROLE_USER", "ROLE_ADMIN"]}>
                  <Profile />
                </RequireAuth>
              }
              errorElement={<NotFound404 />}
            />
            <Route
              path="/my-blogs"
              element={
                <RequireAuth>
                  <MyBlogs />
                </RequireAuth>
              }
              errorElement={<NotFound404 />}
            />
            <Route
              path="/about"
              element={<About />}
              errorElement={<NotFound404 />}
            />
            <Route
              path="/blogs/:postId"
              element={<BlogDetail />}
              errorElement={<NotFound404 />}
            />
            <Route
              path="/edit-blog/:postId"
              element={
                <RequireAuth>
                  <EditBlog />
                </RequireAuth>
              }
              errorElement={<NotFound404 />}
            />
          </Route>
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
