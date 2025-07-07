import { Outlet } from "react-router-dom";
import Header from "../clientHome/Header";
import Footer from "../clientHome/Footer";


export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[130px] bg-gray-100 p-4 z-0">
        <Outlet />
      </main>
       <Footer />
    </div>
  );
}