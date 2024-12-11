import React from "react";
import AdminUsers from "../components/AdminUsers";
import AdminProducts from "../components/AdminProducts";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <hr></hr>
      <AdminUsers />
      <hr></hr>
      <AdminProducts />
    </div>
  );
}
