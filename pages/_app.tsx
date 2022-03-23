import "../styles/style.css";
import "../styles/graphicElement.css";

import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
