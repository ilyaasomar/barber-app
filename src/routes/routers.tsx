import RootLayout from "@/layout/RootLayout";
import Analytics from "@/pages/dashboard/Analytics";
import Dashboard from "@/pages/dashboard/Dashboard";
import Messages from "@/pages/dashboard/Messages";
import Notifications from "@/pages/dashboard/Notifications";
import Orders from "@/pages/dashboard/Orders";
import Products from "@/pages/dashboard/Products";
import Reports from "@/pages/dashboard/Reports";
import Settings from "@/pages/dashboard/Settings";
import Support from "@/pages/dashboard/Support";
import Users from "@/pages/dashboard/Users";
import { Routes, Route, Navigate } from "react-router";
const Routers = () => {
  return (
    <div>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
