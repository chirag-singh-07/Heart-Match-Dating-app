import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuthStore } from "./store/authStore";
import { useEffect, useState } from "react";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import GuestGuard from "./routes/GuestGuard";
import AuthGuard from "./routes/AuthGuard";
import MessagePage from "./pages/MessagePage";
import ExplorePage from "./pages/ExplorePage";
import MatchesPage from "./pages/MatchesPage";
import AuthLayout from "./layout/AuthLayout";
import GuestLayout from "./layout/GuestLayout";
import ProtectedGuard from "./routes/ProtectedGuard";
import LoadingPage from "./pages/LoadingPage";
// import CompleteProfile from "./pages/CompleteProfile";

const App = () => {
  const { checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, [checkAuth]);

  // const loading = true

  if (loading) return <LoadingPage />;

  return (
    <div>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* 🔒 Auth-Only Routes (Cannot access if NOT logged in) */}
          <Route
            path="/profile"
            element={
              <ProtectedGuard>
                <ProfilePage />
              </ProtectedGuard>
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedGuard>
                <ExplorePage />
              </ProtectedGuard>
            }
          />
          <Route
            path="/matches"
            element={
              <ProtectedGuard>
                <MatchesPage />
              </ProtectedGuard>
            }
          />
        </Route>
        <Route
          path="/messages"
          element={
            <ProtectedGuard>
              <MessagePage />
            </ProtectedGuard>
          }
        />

        <Route element={<GuestLayout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />
        </Route>

        <Route
          path="/login"
          element={
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          }
        />
        <Route
          path="/register"
          element={
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          }
        />

        {/* <Route path="/complete-profile" element={<CompleteProfile />} /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
