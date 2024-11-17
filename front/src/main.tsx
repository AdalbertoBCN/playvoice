import React from "react"
import ReactDOM from "react-dom/client"

import "./globals.css"

import { ClerkProvider } from "@clerk/clerk-react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { ThemeProvider } from "./components/theme-provider"
import ProtectedLayout from "./layouts/protected-layout"
import PublicLayout from "./layouts/public-layout"
import { ChatVoice } from "./pages/chat-voice"
import DashboardPage from "./pages/dashboard"
import Home from "./pages/home"
import SignInPage from "./pages/sign-in"
import SignUpPage from "./pages/sign-up"
import ProfilePage from "./pages/profile"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/chat-voice", element: <ChatVoice /> },
      { path: "/profile", element: <ProfilePage/> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-w-screen min-h-screen bg-black">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
)
