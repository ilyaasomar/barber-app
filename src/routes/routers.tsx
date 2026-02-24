import RootLayout from "@/layout/RootLayout";
import Customers from "@/pages/customers/Customers";
import Dashboard from "@/pages/dashboard/Dashboard";
import { Routes, Route, Navigate } from "react-router";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import { ProtectedRoute, PublicRoute } from "@/components/ProtectedRoute";
import { RouteLoader } from "@/components/RouteLoader";
import PaymentMethod from "@/pages/payment-method/PaymentMethod";
import Services from "@/pages/services/Services";
import Invoices from "@/pages/invoices/Invoices";
import Appointments from "@/pages/appointments/Appointments";
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
