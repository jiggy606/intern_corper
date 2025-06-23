import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import { ForgotPassword } from "./pages/auth/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/layout/MainLayout";
import Corpers from "./pages/corpers/Corpers";
import Intern from "./pages/interns/Intern";
import AddIntern from "./pages/interns/AddIntern";
import PublicRouteWrapper from "./contexts/PublicRouteWrapper";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />


            <Route path="/dashboard" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="corper" element={<Corpers />} />
                <Route path="interns" element={<Intern />} />
                <Route path="interns/add-intern" element={<AddIntern />} />
            </Route>
        </Routes>

    );
};


{/* <Route path='/' element={<PublicRouteWrapper component={<Login />} />} /> */}