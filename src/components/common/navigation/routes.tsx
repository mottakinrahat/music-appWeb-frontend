import Link from "next/link";
import path from "path";
import React from "react";

const Routes = () => {
  const routes = [
    { route: "/", name: "Home" },
    { route: "/music", name: "Music" },
    { route: "/sounds", name: "Sounds" },
    { route: "/talents", name: "Talents" },
    { route: "/vr-concerts", name: "VR Concerts" },
  ];
  return (
    <ul className="flex gap-10 text-base">
      {routes.map((route, idx) => (
        <li key={idx}>
          <Link href={route.route}>
            <span
              className={`nav-link ${
                path.sep === route.route ? "active font-semibold" : ""
              }`}
            >
              {route.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Routes;
