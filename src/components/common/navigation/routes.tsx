"use client";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Routes = () => {
  const activeRoute = usePathname();
  const isOnline = useOnlineStatus();

  const routes = [
    { route: "/", name: "Home" },
    { route: "/music", name: "Music" },
    { route: "/sounds", name: "Sounds" },
    { route: "/talents", name: "Talents" },
    { route: "/vr-concerts", name: "VR Concerts" },
    { route: "/offline", name: "Offline Music", requiresOnline: false },
  ];

  // Filter routes based on online status
  const filteredRoutes = routes.filter(
    (route) =>
      route.requiresOnline === undefined || route.requiresOnline === isOnline
  );

  return filteredRoutes.map((route, idx) => (
    <span className="block" key={idx}>
      <Link href={route.route}>
        <span
          className={`nav-link ${
            activeRoute === route.route ? "active font-semibold" : ""
          }`}
        >
          {route.name}
        </span>
      </Link>
    </span>
  ));
};

export default Routes;
