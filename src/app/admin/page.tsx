'use client';

import { useEffect, useState } from "react";
export default function AdminPage() {
  useEffect(() => {
    location.href = "/admin/user-manager";
  }, []);
  return <>
  </>;
}
