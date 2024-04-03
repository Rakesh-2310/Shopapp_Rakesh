import Home from "./home/Home";
import Productpage from "./productpage/Productpage";
import Addtocart from "./cartpage/Addtocart";
import { useState } from "react";
import Signup from "./signup/Signup";
import Login from "./Login";
import { AuthProvider } from "./Authcontext";
import { useRoutes } from "react-router-dom";

function App() {
  
  const [totalItems, setTotalItems] = useState(0);
  const routesArray = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "Signup",
      element: <Signup />,
    },
    {
      path: "/product/:Id",
      element: <Productpage totalItems={totalItems} />,
    },
    {
      path: "/Home",
      element: <Home totalItems={totalItems} />,
    },
    {
      path: "/Addtocart",
      element: <Addtocart totalItems={totalItems} setTotalItems={setTotalItems} />,
    },
  ];
  let routesElement = useRoutes(routesArray);

  return (
    <AuthProvider>
      {routesElement}
    </AuthProvider>
  );
}

export default App;