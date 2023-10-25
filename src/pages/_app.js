import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps: { session, ...pageProps } }) {

  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  
  if (isAdminPage) {
    return (
      <div >
        <Layout session={session}>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </div>
    );
  }
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ToastContainer />
    </>
  );
}
