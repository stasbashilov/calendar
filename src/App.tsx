import React from "react";
import router from "./app/routing";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./app/context/UserContext.tsx";

const App: React.FC = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
