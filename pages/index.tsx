import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Newsly</title>
      </Head>
      <p>Newsly</p>
      <p className="space-x-2">
        <Link href={"/signup"}>
          <a>Signup</a>
        </Link>
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
      </p>
    </>
  );
};

export default Home;
