import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import Home from "./pages/Home.jsx";
import Type from "./pages/Type.jsx";
import Discuss from "./pages/Discuss.jsx";
import Highscores from "./pages/Highscores.jsx";
import Login from "./components/ui/Auth/Login.jsx";
import SignUp from "./components/ui/Auth/SignUp.jsx";
import Settings from "./components/ui/Settings.jsx";
import CreatePost from "./components/ui/Post/CreatePost.jsx";
import Profile from "./components/ui/Profile.jsx";
import Play from "./pages/Play.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import PublicRoute from "./components/layout/PublicRoute.jsx";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";
import Store from "./pages/Store.jsx";
import PostPage from "./components/ui/Post/PostPage.jsx";
import Chats from "./pages/Chats.jsx";
import Friends from "./pages/Friends.jsx";
import Search from "./pages/Search.jsx";
import SnippetsList from "./pages/SnippetsList.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

const queryClient = new QueryClient();

const NotFoundRedirect = () => {
  return <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/discuss", element: <Discuss /> },
      { path: "/highscores", element: <Highscores /> },
      // { path: "/old", element: <Type /> },
      { path: "/duel", element: <Play /> },
      { path: "/multiplayer", element: <Play /> },
      { path: "/solo", element: <Play /> },
      { path: "/post", element: <CreatePost /> },
      { path: "/search/:username", element: <Search /> },
      { path: "/post/:id", element: <PostPage /> },
      { path: "/profile/:username", element: <Profile /> },
      { path: "/world", element: <Discuss /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/settings", element: <Settings /> },
          // { path: "/store", element: <Store /> },
          { path: "/chats", element: <Chats /> },
          { path: "/friends", element: <Friends /> },
          { path: "/submit-snippets", element: <SnippetsList /> },
          { path: "/chats/:username/:id", element: <Chats /> },
           { path: "/verify-email", element: <VerifyEmail/> },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/signup", element: <SignUp /> },
        ],
      },
      { path: "*", element: <NotFoundRedirect /> },
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
              className:
                "bg-primary border-bdshadow tracking-wide text-title3 py-1 border-4 text-white font-route",
              duration: 3000,
            }}
            position="bottom-right"
          />
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  </>,
);

// hikaru - 3, zoro - 1, marin -2, takina - 6, natsu - 1,
