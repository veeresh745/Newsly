export type TIdTokenResult = {
  token: string;
  expirationTime: string;
  authTime: string;
  issuedAtTime: string;
  signInProvider: string | null;
  signInSecondFactor: string | null;
  claims: {
    [key: string]: any;
  };
};

export type T_Path = {
  id: string;
  name: string;
  createdAt: string;
  project: string;
};
