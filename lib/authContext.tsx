import { useState, useEffect, useContext, createContext } from "react";
import { getAuth, onAuthStateChanged, signOut as signout } from "firebase/auth";
import type { User } from "firebase/auth";
import { setCookie, destroyCookie } from "nookies";

type Props = {
  children: React.ReactNode;
};

type UserContext = {
  user: User | null;
  loading: boolean;
};

const authContext = createContext<UserContext>({
  user: null,
  loading: true,
});

export default function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      //user returned from firebase not the state
      if (authUser) {
        // Save token for backend calls
        authUser.getIdToken().then((token) =>
          setCookie(null, "idToken", token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          })
        );

        // Save decoded token on the state
        setUser(authUser);
        // authUser.getIdTokenResult().then((result) => setUser(result));
        // console.log({ authUser, user });
      }
      if (!authUser) setUser(null);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider value={{ user, loading }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);

export const signOut = async () => {
  const auth = getAuth();
  destroyCookie(null, "idToken");
  await signout(auth);
};
