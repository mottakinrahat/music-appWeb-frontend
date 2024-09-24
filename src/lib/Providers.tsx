"use client";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { AudioProvider } from "./AudioProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("ServiceWorker registration failed: ", error);
        });
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
