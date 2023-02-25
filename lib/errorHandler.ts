// import { AxiosError } from "axios";

export const parseError = (error: any) => {
  console.log("PARSE_ERROR: ", error);
  if (error.isAxiosError) {
    return error.response.data?.error?.message || "Something went wrong! 😕";
  }
  return error.message;
};

export const parseFirebaseError = (error: any): string => {
  const errorCode = error.code.remove("auth/", "");
  switch (errorCode) {
    case "user-not-found" || "wrong-password":
      return "User not found";

    case "popup-closed-by-user":
      return "Authentication aborted";

    case "email-already-exists" || "email-already-in-use":
      return "Email already in use";

    default:
      return "Some error occurred";
  }
};
