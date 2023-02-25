export const GOOGLE_OAUTH = {
  client_id: String(process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID),
  client_secret: String(process.env.GOOGLE_OAUTH_CLIENT_SECRET),
};

export const NOTION_ENV = {
  client_token: process.env.NEXT_PUBLIC_NOTION_CLIENT_TOKEN,
  client_secret: process.env.NOTION_CLIENT_SECRET,
};

export const APP_ENV = {
  name: "Newsly",
  logo: "/logo.png",
  frontend_url: process.env.FRONTEND_URL,
  database_url: process.env.DATABASE_URL,
};

export const FIREBASE_ADMIN_ENV = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key?.replace(/\\n/g, "\n"),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
};
