import NavBarAdmin from "@/app/admin/navbar";
import { authOptions } from "@/utils/auth";
import AuthProvider from "@/utils/providers/auth.provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { getServerSession } from "next-auth";
import SideBarLayout from "@/app/admin/sidebarLayout";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <AppRouterCacheProvider>
      <AuthProvider session={session}>
        <NavBarAdmin>
          <SideBarLayout>{children}</SideBarLayout>
        </NavBarAdmin>
      </AuthProvider>
    </AppRouterCacheProvider>
  );
}
