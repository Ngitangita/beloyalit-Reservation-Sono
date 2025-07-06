import { createBrowserRouter } from "react-router-dom";
import CarouselWithContent from "~/pages/client/HomePage";
import { SignIn } from "~/pages/auth/SignIn";
import { SignUp } from "~/pages/auth/SignUp";
import DashboardPage from "~/pages/admin/DashboardPage";
import Catalogues from "~/pages/admin/Catalogues";
import ProtectedNotFound from "~/pages/not-found/ProtectedNotFound";
import PublicNotFound from "~/pages/not-found/PublicNotFound";
import PublicLayout from "~/components/layouts/PublicLayout";
import ProtectedLayout from "~/components/layouts/ProtectedLayout";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "catalogue",
        element: <Catalogues />,
      },
      {
        path: "*",
        element: <ProtectedNotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        element: <CarouselWithContent />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <PublicNotFound />,
      },
    ],
  },
]);

export default router;
