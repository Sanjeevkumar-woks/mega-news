import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Category from "./components/category";
import Header from "./components/header";
import CategoriesBar from "./components/categoriesBar";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword ";
import ForgetPassword from "./pages/ForgetPassword ";
import SubscriptionForm from "./components/subscribe";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./redux/authSlice";
import { jwtDecode } from "jwt-decode";
import ContactUs from "./components/contactUs";
import AboutUs from "./components/aboutUs";
import Footer from "./components/Footer";
import Profile from "./pages/profile";
import PageNotFound from "./pages/PageNotFound";
import SavedArticles from "./components/savedArticles";
import { useEffect } from "react";
import Unsubscribe from "./pages/unsubscribe";
// Custom Route for Protected Routes (Requires Auth)
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Custom Route for Auth-Only Routes (Accessible Only if Not Authenticated)
const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUnsubscribePage = location.pathname === "/unsubscribe";

  // Check if token exists in local storage and set user in redux if available
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { userName, emailId, _id } = jwtDecode(token);
        const user = { userName, emailId, _id };
        dispatch(login({ user, token }));
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      {!isUnsubscribePage && <Header />}
      {!isUnsubscribePage && <CategoriesBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Protected Routes (Requires Auth) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-articles"
          element={
            <ProtectedRoute>
              <SavedArticles />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes (Accessible Only if Not Authenticated) */}
        <Route
          path="/register"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/forgetPassword"
          element={
            <AuthRoute>
              <ForgetPassword />
            </AuthRoute>
          }
        />
        <Route
          path="/resetPassword/:token"
          element={
            <AuthRoute>
              <ResetPassword />
            </AuthRoute>
          }
        />

        {/* Catch-All for 404 */}

        <Route
          path="/unsubscribe/:user_id"
          element={
            <div className="absolute inset-0 min-w-screen min-h-screen flex flex-col z-50 bg-white">
              <Unsubscribe />
            </div>
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!isUnsubscribePage && <Footer />}
    </>
  );
}

export default App;
