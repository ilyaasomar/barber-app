import RootLayout from "@/layout/RootLayout";
import Appointments from "@/pages/dashboard/Appointments";
import Customers from "@/pages/customers/Customers";
import Dashboard from "@/pages/dashboard/Dashboard";
import Invoices from "@/pages/dashboard/Invoices";
import PaymentMethod from "@/pages/dashboard/PaymentMethod";
import Services from "@/pages/dashboard/Services";
import Users from "@/pages/dashboard/Users";
import { Routes, Route, Navigate } from "react-router";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";
import { RouteLoader } from "@/components/RouteLoader";
const Routers = () => {
  return (
    <div>
      <RouteLoader />
      <Routes>
        {/* 🔒 Protected — only logged-in users */}
        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/users" element={<Users />} />
        </Route>

        {/* login and register */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Routers;
