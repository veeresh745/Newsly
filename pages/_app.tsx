// import "tailwindcss/tailwind.css";
import "../styles/global.css";
import "../lib/firebaseConfig/init";

import { useRouter } from "next/router";
import Script from "next/script";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Layout from "../components/layout";
import AppLayout from "../components/layout/appLayout";
import ProtectedRoute from "../components/layout/protectedRoutes";
import FirebaseProvider from "../lib/authContext";
import { parseError } from "../lib/errorHandler";

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noAuthPath = ["/", "/login", "/signup", "/404", "/_error"];
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        const message = parseError(error);
        toast.error(message);
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  });

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script id="google-analytics" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <FirebaseProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          {noAuthPath.includes(router.pathname) ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <ProtectedRoute>
              <AppLayout>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                <Component {...pageProps} />
              </AppLayout>
            </ProtectedRoute>
          )}
        </QueryClientProvider>
      </FirebaseProvider>
    </>
  );
}
export default MyApp;
