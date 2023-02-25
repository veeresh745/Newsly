import Link from "next/link";
import { useRouter } from "next/router";
import { createContext, useEffect, useRef, useState } from "react";
import { signOut } from "../../lib/authContext";
import DashboardNavbar from "../navbar";
import LandingNavbar from "../navbar/landingNavbar";
import Navbar from "../navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  const router = useRouter();

  const [removeSidebar, setRemoveSidebar] = useState(false);

  // no navbar on landing page
  const path_removeSidebar = ["/"];

  useEffect(() => {
    const asPathWithoutQuery = router.asPath.split("?")[0];
    if (path_removeSidebar.includes(asPathWithoutQuery)) {
      setRemoveSidebar(true);
    } else {
      setRemoveSidebar(false);
    }
  }, [router.asPath]);

  // TODO: make call to get all the mailboxes
  //

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 overflow-hidden">
        {!removeSidebar && (
          <aside className="w-24">
            <DashboardNavbar />
          </aside>
        )}
        <main className="flex-1 overflow-y-auto w-full">
          <Navbar />
          {children}
        </main>
      </div>
    </div>
  );
}
