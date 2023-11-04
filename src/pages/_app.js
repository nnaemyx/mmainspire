import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Homelayout from "@/components/Homelayout";
import { CustomContextProvider } from "@/context/Customcontext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  if (isAdminPage) {
    return (
      <div>
        <Layout session={session}>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </div>
    );
  }
  return (
    <CustomContextProvider session={session}>
      <Homelayout >
        <Component {...pageProps} />
        <ToastContainer />
      </Homelayout>
    </CustomContextProvider>
  );
}
