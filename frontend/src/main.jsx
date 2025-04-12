import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import Home from "./pages/Home.jsx";
import Type from "./pages/Type.jsx";
import Discuss from "./pages/Discuss.jsx";
import Highscores from "./pages/Highscores.jsx";
import Login from "./components/ui/Login.jsx";
import SignUp from "./components/ui/SignUp.jsx";
import Settings from "./components/ui/Settings.jsx";
import CreatePost from "./components/ui/CreatePost.jsx";
import Profile from "./components/ui/Profile.jsx";
import Play from "./pages/Play.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import PublicRoute from "./components/layout/PublicRoute.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Store from "./pages/Store.jsx";
import PostPage from "./components/ui/PostPage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      // {
      //   path: "/",
      //   element: (
      //     <AuthLayout>
      //       <Home />
      //     </AuthLayout>
      //   ),
      // },
      { path: "/", element: <Home /> },
      { path: "/discuss", element: <Discuss /> },
      { path: "/highscores", element: <Highscores /> },
      { path: "/old", element: <Type /> },
      { path: "/play", element: <Play /> },
      { path: "/post", element: <CreatePost /> },
      { path: "/post/:id", element: <PostPage /> },
      { path: "/profile/:username", element: <Profile /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/settings", element: <Settings /> },
          { path: "/store", element: <Store /> },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> },
        ],
      },
    ],
  },
]);

// Disabled strictmode
createRoot(document.getElementById("root")).render(
  <> 
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            toastOptions={{
              className: "bg-primary border-bdshadow text-[22px] py-1 border-4 text-white font-route",
              duration: 3000,
            }}
            position="bottom-right"
          />
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
    /
  </>
);
