import nookies from "nookies";
import { GetServerSidePropsContext, NextApiHandler } from "next";
// import adminInit from "./firebaseConfig/init-admin";
import { getAuth } from "firebase-admin/auth";

export const authServer = async (ctx: GetServerSidePropsContext) => {
  const { idToken } = nookies.get(ctx);

  try {
    return getAuth().verifyIdToken(idToken);
  } catch (err) {
    return null;
  }
};
