import Home from "../views/Home";
import TableData from "../views/TableData";
import NotFound from "../views/NotFound";
import PieChartPage from "../views/PieChartPage";

const appRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/pie-chart",
    component: PieChartPage,
    exact: true,
  },
  {
    path: "/table",
    component: TableData,
    exact: true,
  },
  {
    path: "*",
    component: NotFound,
    exact: true,
  },
];

export default appRoutes;
