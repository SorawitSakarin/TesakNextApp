"use client";
import { logout } from "@/utils/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const queryClient = new QueryClient();

export default function NavBarAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
  const pathname = usePathname();
  const router = useRouter();

  if (!accessToken) {
    const urlParam = pathname;
    logout(urlParam);
  }
  const handleLogout = () => {
    signOut({ redirect: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nextauth.message");
    router.push("/login");
  };

  const [showingSideBar, setShowingSideBar] = useState(true);

  return (
    //TODO change layout to side manu
    <QueryClientProvider client={queryClient}>
      <>
        <div
          id="nav-bar"
          className="navbar bg-primary text-[#e6f4ea] shadow-lg fixed top-0 z-50"
        >
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Tesak Admin</a>
            <button className="btn btn-ghost text-xl">Products manager</button>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <button className="btn btn-circle btn-sm">SS</button>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <main className="w-screen flex relative">
          {showingSideBar ? (
            <div id="side-bar-show" className="fixed z-40">
              <div className="flex flex-col border-e bg-white relative h-screen">
                <div className="h-[70px] w-[70px]"></div>
                <div className="w-full flex justify-end">
                  <div
                    className="border-2 border-[#fff] hover:border-gray-300 text-gray-600 flex justify-center items-center w-[24px] cursor-pointer"
                    onClick={() => setShowingSideBar(false)}
                  >
                    {"<"}
                  </div>
                </div>
                <div className="px-4">
                  <ul className="mt-6 space-y-2">
                    <li>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="text-sm font-medium"> Admin</span>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          <li>
                            <Link
                              href="admin/user-manager"
                              passHref
                              legacyBehavior
                            >
                              <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                User manager
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="admin/calculate-id"
                              passHref
                              legacyBehavior
                            >
                              <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                Calculate Id
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="admin/line-message"
                              passHref
                              legacyBehavior
                            >
                              <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                Line message
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="text-sm font-medium"> Products</span>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          <li>
                            <Link
                              href="admin/products-manager"
                              passHref
                              legacyBehavior
                            >
                              <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                Product manager
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-100 absolute bottom-0">
                  <a
                    href="#"
                    className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      className="size-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="text-xs">
                        <strong className="block font-medium">Boa Boat</strong>
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div id="side-bar-hidden" className="fixed z-40">
              <div className="flex flex-col relative h-screen">
                <div className="h-[70px] w-[70px]"></div>
                <div
                  className="border-2 border-gray-300 text-gray-600 flex justify-center items-center w-[24px] cursor-pointer"
                  onClick={() => setShowingSideBar(true)}
                >
                  {">"}
                </div>
              </div>
            </div>
          )}
          {children}
        </main>
      </>
    </QueryClientProvider>
  );
}
