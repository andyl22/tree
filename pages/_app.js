import Header from "@/components/Header/Header";
import "@/styles/globals.scss";
import { css } from "@emotion/css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
