import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import Home from "./pages/Home.jsx";
import Type from "./pages/Type.jsx";
import Discuss from "./pages/Discuss.jsx";
import Highscores from "./pages/Highscores.jsx";
import "./index.css";
import Login from "./components/ui/Login.jsx";
import SignUp from "./components/ui/SignUp.jsx";
import Settings from "./components/ui/Settings.jsx";
import CreatePost from "./components/ui/CreatePost.jsx";
import Profile from "./components/ui/Profile.jsx";
import Play from "./pages/Play.jsx";

const queryClient = new QueryClient();


const GoogleAuthWrapper = () => {
  return <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}><Login/></GoogleOAuthProvider>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/discuss", element: <Discuss /> },
      { path: "/highscores", element: <Highscores /> },
      { path: "/login", element: <GoogleAuthWrapper /> },
      { path: "/old", element: <Type /> },
      { path: "/settings", element: <Settings /> },
      { path: "/profile", element: <Profile /> },
      { path: "/play", element: <Play /> },
      { path: "/post", element: <CreatePost /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    {/* </GoogleOAuthProvider>/ */}
  </StrictMode>
);
