import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "~/components/layouts/PublicLayout";
import ProtectedLayout from "~/components/layouts/ProtectedLayout";
import HomePage from "~/pages/client/HomePage";
import Catalogue from "~/pages/client/Catalogue";
import Basket from "~/pages/client/Basket";
import { SignIn } from "~/pages/auth/SignIn";
import { SignUp } from "~/pages/auth/SignUp";
import DashboardPage from "~/pages/admin/DashboardPage";
import Catalogues from "~/pages/admin/Catalogues";
import MaterialDetail from "~/pages/client/MaterialDetail";
import PublicNotFound from "~/pages/not-found/PublicNotFound";
import ProtectedNotFound from "~/pages/not-found/ProtectedNotFound";

const router = createBrowserRouter([
   {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "catalogue", element: <Catalogues /> },
      { path: "*", element: <ProtectedNotFound /> },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "catalogues", element: <Catalogue /> },
      { path: "materiel/:id", element: <MaterialDetail /> },
      { path: "basket", element: <Basket /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "*", element: <PublicNotFound /> },
    ],
  },
]);

export default router;
