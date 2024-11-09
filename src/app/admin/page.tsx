'use client';
import NavBarAdmin from "@/app/admin/navbar";
import AdminManager from "@/app/admin/pages/AdminManager";
import ProductsManager from "@/app/admin/pages/ProductsManager";
import { useState } from "react";
export default function AdminPage() {
  const [page, setPage] = useState(0);
  return <div>

    {page == 0 && <AdminManager />}
    {page == 1 && <ProductsManager />}
  </div>;
}
