import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";
export const meta: V2_MetaFunction = () => {
  return [
    { title: "Shelf Docs" },
    { name: "description", content: "Welcome to shelf docs!" },
  ];
};

export default function Index() {
  return (
    < >
     <Header /> 

      <Outlet />
    </>
  );<Header />
}
