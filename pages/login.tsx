import type { NextPage } from "next";
import {
    getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup
} from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import GoogleOauthButton from '../components/buttons/GoogleOauth';
import LandingNavbar from '../components/navbar/landingNavbar';
import SplashScreen from '../components/SplashScreen';
import { useAuth } from '../lib/authContext';
import { parseFirebaseError } from '../lib/errorHandler';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, loading } = useAuth();

  const router = useRouter();

  if (loading) return <SplashScreen />;

  console.log({ user });

  if (!loading && user) {
    if (router.query.redir) {
      console.log(router.query.redit);
      router.push(`${router.query.redir}`);
    } else {
      router.push("/app/dashboard");
    }
    return <SplashScreen />;
  }

  const auth = getAuth();

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("success", user);
        toast.success("Welcome back!");
        router.push("/app/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;

        console.log({ errorCode });
        const message = parseFirebaseError(errorCode);
        toast.error(message);
      });
  }

  function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("sign with google", user);
        toast.success("Welcome back!");
        if (router.query.src === "extension") {
          router.push("/auth_extension");
        }
        router.push("/app/dashboard");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        // console.log(error);
        const message = parseFirebaseError(errorCode);
        toast.error(message);
      });
  }

  return (
    <>
      <Head>
        <title>login | mio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingNavbar />
      <div className="overflow-hidden mx-auto max-w-sm lg:max-w-4xl mt-10 flex justify-center">
        <div className="w-full p-8 lg:w-5/12 rounded-lg flex flex-col justify-center mx-5">
          <div className="space-y-2 pb-5">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 text-center">
              Login to continue
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Do not have an account?{" "}
              <Link href="/signup">
                <a className="font-bold">signup here</a>
              </Link>
            </p>
          </div>
          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
              Email
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
                Password
              </label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              onClick={() => login()}
              className="btn bg-brand-accent hover:opacity-90 border-0 w-full dark:text-gray-200 hover:bg-brand-accent rounded-md"
            >
              Login
            </button>
          </div>
          {/* TODO: uncommnent on official launch */}
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-2/5 lg:w-2/5"></span>
            <p className="text-xs text-center text-gray-500 uppercase dark:text-gray-300">
              or
            </p>
            <span className="border-b w-2/5 lg:w-2/5"></span>
          </div>
          <GoogleOauthButton onClick={() => loginWithGoogle()} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
