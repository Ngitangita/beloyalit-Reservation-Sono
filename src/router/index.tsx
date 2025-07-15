import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "~/components/layouts/PublicLayout";
import ProtectedLayout from "~/components/layouts/ProtectedLayout";
import HomePage from "~/pages/client/HomePage";
import Catalogue from "~/pages/client/Catalogue";
import Basket from "~/pages/client/Basket";
import { SignIn } from "~/pages/auth/SignIn";
import { SignUp } from "~/pages/auth/SignUp";
import DashboardPage from "~/pages/admin/DashboardPage";
import Category from "~/pages/admin/Category";
import Catalogues from "~/pages/admin/Catalogues";
import MaterialDetail from "~/pages/client/MaterialDetail";
import PackDetail from "~/pages/client/PacksDetail";
import PublicNotFound from "~/pages/not-found/PublicNotFound";
import ProtectedNotFound from "~/pages/not-found/ProtectedNotFound";
import ReservationPack from "~/pages/client/ReservationPack";
import EspaceClient from "~/pages/client/Espace-client";
import Devis from "~/pages/client/Devis";
import Facture from "~/pages/client/Facture";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const router = createBrowserRouter([
   {
    path: "/admin",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
       { path: "catalogues", element: <Catalogues /> },
      { path: "categories", element: <Category /> },
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
      { path: "reservation-pack", element: <ReservationPack /> },
      { path: "pack-detail/:id", element: <PackDetail /> },
      { path: "client", element: <EspaceClient />},
      { path: "devis/:id", element: <Devis />},
      { path: "facture/:id", element: <Facture />},
      { path: "basket", element: <Basket /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "*", element: <PublicNotFound /> },
    ],
  },
]);

export default router;
