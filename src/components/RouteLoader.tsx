// import { useEffect } from "react";
// import { useLocation } from "react-router";
// import NProgress from "nprogress";

// export const RouteLoader = () => {
//   const location = useLocation();

//   useEffect(() => {
//     // Start the loader on route change
//     NProgress.start();

//     // Small timeout to stop it (optional)
//     NProgress.done();
//   }, [location]);

//   return null;
// };

// RouteLoader.tsx
import { useEffect } from "react";
import { useLocation } from "react-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // hide the top-right spinner

export const RouteLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // start top bar
    NProgress.done(); // finish immediately (or after data loaded)
  }, [location]);

  return null;
};
