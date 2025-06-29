import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import Corpers from "./pages/corpers/Corpers";
import Intern from "./pages/interns/Intern";
// import AddIntern from "./pages/interns/AddIntern";
import ProtectedRoute from "./contexts/PublicRouteWrapper";
import ResetPassword from "./pages/auth/ResetPassword";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="corper" element={<Corpers />} />
        <Route path="interns" element={<Intern />} />
      </Route>
    </Routes>
  );
};
