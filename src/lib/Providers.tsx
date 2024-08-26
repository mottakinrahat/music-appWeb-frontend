"use client";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
