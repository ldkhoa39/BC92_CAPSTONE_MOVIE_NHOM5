import { Route } from "react-router-dom";
import { lazy } from "react";
import Another from "../pages/Another";
import PageNotFound from "../pages/PageNotFound";

const routes = [
  {
    path: "",
    element: lazy(() => import("./../pages/HomeTemplate")),
    nested: [
      {
        path: "",
        element: lazy(() => import("./../pages/HomeTemplate/Home")),
      },
      // CẬP NHẬT TRANG ĐẶT VÉ 
      {
        path: "checkout/:maLichChieu", 
        element: lazy(() => import("../pages/HomeTemplate/Checkout")),
      },
      {
        path: "list-movie",
        element: lazy(() => import("../pages/HomeTemplate/ListMovie")),
      },
      {
        path: "login",
        element: lazy(() => import("../pages/HomeTemplate/Login")),
      },
      {
        path: "register",
        element: lazy(() => import("../pages/HomeTemplate/Register")),
      },
      {
        path: "booking",
        element: lazy(() => import("../pages/HomeTemplate/Booking") )
      },
      {
        path: "hooks",
        element: lazy(() => import("../pages/HomeTemplate/Hooks")),
      },
      {
        path: "detail/:maPhim",
        element: lazy(() => import("../pages/HomeTemplate/Detail")),
      }
    ],
  },
  {
    path: "admin",
    element: lazy(() => import("../pages/AdminTemplate")),
    nested: [
      {
        path: "dashboard",
        element: lazy(() => import("../pages/AdminTemplate/DashBoard")),
      },
      {
        path: "add-user",
        element: lazy(() => import("../pages/AdminTemplate/AddUser")),
      },
    ],
  },
  {
    path: "auth",
    element: lazy(() => import("../pages/AdminTemplate/Auth")),
  },
  {
    path: "another",
    element: Another,
  },
  {
    path: "*",
    element: PageNotFound,
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      const Element = route.element;
      return (
        <Route key={route.path} path={route.path} element={<Element />} />
      );
    }
  });
};