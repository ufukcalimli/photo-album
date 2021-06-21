import { AppProps } from "next/app";

// Redux
import { Provider } from "react-redux";
import { store } from "../redux/store";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
