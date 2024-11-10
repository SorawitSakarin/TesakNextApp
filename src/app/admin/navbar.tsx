"use client";
import Link from "next/link";
import liff from "@line/liff";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiMenuUnfold4Line, RiMenuLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { PiShoppingCartLight } from "react-icons/pi";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";
import { useSideBarStore } from "@/utils/store";
import { GrUserManager } from "react-icons/gr";
import { useEffect, useState } from "react";
import { logout } from "@/utils/auth";

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
  const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);
  const { showingSideBar, setShowingSideBar } = useSideBarStore();
  const [userName, setUserName] = useState<string | null>(null);

  if (!accessToken) {
    const urlParam = pathname;
    logout(urlParam);
  }
  const handleLogout = () => {
    signOut({ redirect: false });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("nextauth.message");
    if (liff.isLoggedIn()) {
      liff.logout();
    }
    router.push("/login");
  };

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        if (process.env.NODE_ENV === "development") {
          const api = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
          if (api) {
            setLineAccessToken(api);
            const name = "Chayatorn Kukiattikoon";
            setUserName(name);
          }
          //*this for testing liff log in ang get profile

          // const liffId = process.env.NEXT_PUBLIC_LIFF_ID_DEV;
          // if (liffId) {
          //   await liff.init({ liffId: liffId });
          //   if (liff.isLoggedIn()) {
          //     setLineAccessToken(liff.getAccessToken());
          //     try {
          //       liff.getProfile()
          //         .then((profile) => {
          //           const name = profile.displayName;
          //           setUserName(name);
          //         })
          //     } catch (error) {
          //       console.log("error", error);
          //     }

          //   } else {
          //     liff.login();
          //     setLineAccessToken(liff.getAccessToken());
          //   }
          // }
        } else {
          const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
          if (liffId) {
            await liff.init({ liffId: liffId });
            if (liff.isLoggedIn()) {
              setLineAccessToken(liff.getAccessToken());
              try {
                liff.getProfile().then((profile) => {
                  const name = profile.displayName;
                  setUserName(name);
                });
              } catch (error) {
                console.log("error", error);
              }
            } else {
              liff.login();
              setLineAccessToken(liff.getAccessToken());
            }
          }
        }
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    initializeLiff();
  }, []);

  const shortName = (name: string | null): string => {
    if (name) {
      const firstLetter = name.trim().match(/[a-zA-Z]/)?.[0] || '';
      const shortName = firstLetter.toUpperCase();
      return shortName;
    } else {
      return "";
    }
  };

  return (
    //TODO change layout to side manu
    <QueryClientProvider client={queryClient}>
      <>
        <div
          id="nav-bar"
          className="navbar bg-primary text-[#e6f4ea] shadow-lg fixed top-0 z-50"
        >
          <div className="flex flex-1 gap-2">
            {showingSideBar ? (
              <RiMenuUnfold4Line
                className="hover:cursor-pointer"
                onClick={() => setShowingSideBar(false)}
              />
            ) : (
              <RiMenuLine
                className="hover:cursor-pointer"
                onClick={() => setShowingSideBar(true)}
              />
            )}
            <Link href="/admin/user-manager" passHref legacyBehavior>
              <a className="btn btn-ghost text-xl">Tesak Admin</a>
            </Link>
          </div>
          <div className="flex-none gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <button className="btn btn-circle btn-sm">
                  {shortName(userName)}
                </button>
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
                <div>
                  <ul className="mt-6 space-y-2 list-none">
                    <li>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="inline-flex items-center text-base font-medium gap-2">
                            <FaRegUserCircle /> Admin
                          </span>
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

                        <ul className="mt-2 space-y-1 px-4 list-none">
                          <li>
                            <Link
                              href="/admin/user-manager"
                              passHref
                              legacyBehavior
                            >
                              <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="inline-flex items-center gap-2">
                                  <GrUserManager />
                                  User manager
                                </span>
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/calculate-id"
                              passHref
                              legacyBehavior
                            >
                              <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="inline-flex items-center gap-2">
                                  <IoMdInformationCircleOutline />
                                  Calculate Id
                                </span>
                              </a>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/admin/line-message"
                              passHref
                              legacyBehavior
                            >
                              <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="inline-flex items-center gap-2">
                                  <RiMessage2Line />
                                  Line message
                                </span>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="inline-flex items-center gap-2 text-base font-medium">
                            <AiOutlineProduct />
                            Products
                          </span>

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

                        <ul className="mt-2 space-y-1 px-4 list-none">
                          <Link
                            href="/admin/products-manager"
                            passHref
                            legacyBehavior
                          >
                            <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                              <span className="inline-flex items-center gap-2">
                                <PiShoppingCartLight />
                                Product manager
                              </span>
                            </a>
                          </Link>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-gray-100 absolute bottom-0 flex items-center gap-2 bg-white p-4">
                  <div
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <button className="btn btn-circle btn-sm">
                      {shortName(userName)}
                    </button>
                  </div>

                  <div>
                    <p className="text-xs">
                      <strong className="block font-medium">{userName}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div id="side-bar-hidden" className="fixed z-40">
              <div className="flex flex-col relative h-screen">
                <div className="h-[70px] w-[70px]"></div>
              </div>
            </div>
          )}
          {children}
        </main>
      </>
    </QueryClientProvider>
  );
}
