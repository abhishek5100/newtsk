import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import Layout from "./components/Layout";
import EmployeeDataList from "./components/EmployeeDataList";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "employee-form",
        element: <EmployeeForm />,
      },
      {
        path: "/",
        element: <EmployeeDataList />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};


export default App;
