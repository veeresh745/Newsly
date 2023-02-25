import type { NextPage } from "next";
import axios from 'axios';
import {
    createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup
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
import { parseError, parseFirebaseError } from '../lib/errorHandler';

const SignupPage: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const { user, loading } = useAuth();

  const router = useRouter();
  useEffect(() => {
    const inviteCode = router.query.inviteCode;

    if (!inviteCode || inviteCode.toString().trim().length <= 0) return;

    setInviteCode(inviteCode.toString());
  }, [router.query.inviteCode]);

  if (loading) return <SplashScreen />;

  if (!loading && user) {
    if (router.query.redir) {
      router.push(`${router.query.redir}`);
    } else {
      router.push("/app/dashboard");
    }
    return <SplashScreen />;
  }

  const auth = getAuth();

  async function createUserCredentials() {
    if (!email || !password || !inviteCode) {
      toast.error("Email, Password and Invite Code are required");
      return;
    }

    // TODO: validate data

    setIsloading(true);
    // check if invite code is valid
    try {
      await axios.get(`/api/invite?inviteCode=${inviteCode}`);
      setIsloading(false);
    } catch (error: any) {
      console.log(error);
      const message = parseError(error);
      toast.error(message);
      setIsloading(false);
      return;
    }

    try {
      // signup user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //  delete invite code
      await axios.delete(`/api/invite?inviteCode=${inviteCode}`);

      setIsloading(false);

      router.push("/app/dashboard");
    } catch (error: any) {
      const errorCode = error.code;

      const message = parseFirebaseError(errorCode);
      toast.error(message);

      setIsloading(false);
    }
  }

  async function loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        router.push("/app/dashboard");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const message = parseFirebaseError(errorCode);
        toast.error(message);
        // ...
      });
  }

  return (
    <>
      <Head>
        <title>signup | Publicator</title>
      </Head>
      <LandingNavbar />
      <div className="overflow-hidden mx-auto max-w-sm lg:max-w-4xl mt-10 flex justify-center">
        <div className="w-full p-8 lg:w-5/12 rounded-lg flex flex-col justify-center mx-5">
          <div className="space-y-2 pb-5">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 text-center">
              Create an account
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <Link href="/login">
                <a className="font-bold">login here</a>
              </Link>
            </p>
          </div>
          <div
            className={`${
              inviteCode ? "bg-green-200" : "bg-red-300"
            } rounded-lg p-2`}
          >
            {inviteCode && (
              <p className="text-md text-green-700 px-2">
                Your invite code is{" "}
                <span className="font-bold">{inviteCode}</span>
              </p>
            )}
            {!inviteCode && (
              <p className="text-md text-red-700 px-2">
                Oops! you need invite code to sign up at the moment 😧
              </p>
            )}
          </div>

          <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">
              Email
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              required={true}
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
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              onClick={createUserCredentials}
              className={`${
                isLoading && "loading text-gray-100"
              } btn bg-brand-accent hover:opacity-90 border-0 w-full dark:text-gray-200 hover:bg-brand-accent`}
            >
              Sign up
            </button>
          </div>
          {/* TODO: uncomment on official launch */}
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

export default SignupPage;
