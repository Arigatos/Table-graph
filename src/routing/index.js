import React from "react";
import { Routes, Route } from "react-router-dom";

import appRoutes from "./routes";

const DashboardRoutes = () => {
  return (
    <Routes>
      {appRoutes.map((route, i) => (
        <Route key={i} element={route.component()} {...route} />
      ))}
    </Routes>
  );
};

export default DashboardRoutes;
