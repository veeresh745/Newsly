import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react";
import { useAuth } from "../../lib/authContext";
import SplashScreen from "../SplashScreen";
import type { User } from "firebase/auth";

export const ProtectedRoutesContext = createContext<User | null>(null);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // console.log({ asPath: router.asPath, pathName: router.pathname });
    if (!loading && !user) {
      // router.push(`/login?redir=${router.asPath}`);
      router.push(`/login`);
    }
  }, [router, user, loading]);

  return (
    <>
      {!user && <SplashScreen />}
      {user && (
        <ProtectedRoutesContext.Provider value={user}>
          {children}
        </ProtectedRoutesContext.Provider>
      )}
    </>
  );
};

export default ProtectedRoute;
