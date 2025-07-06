import { Outlet } from "react-router-dom";
import Header from "../clientHome/Header";

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="flex-1 p-4 bg-gray-100">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;
