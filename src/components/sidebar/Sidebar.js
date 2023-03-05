import { NavLink } from "react-router-dom";

const dashboardMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Table",
    path: "/table",
  },
  {
    name: "Pie Chart",
    path: "/pie-chart",
  },
];

const Sidebar = ({ children }) => {
  return (
    <div className="sidebar">
      <div className="menu">
        {dashboardMenu.map((item, i) => {
          return (
            <NavLink
              to={item.path}
              key={i}
              className="link"
              activeclassname="active"
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
