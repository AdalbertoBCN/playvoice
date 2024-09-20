import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";

import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider } from "./components/theme-provider";
import { Menu } from "./components/menu";
import { cn } from "./lib/utils";
import { TailwindIndicator } from "./components/tailwind-indicator";
import PublicLayout from "./layouts/public-layout";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import HomeTest from "./pages/home-test";
import ProtectedLayout from "./layouts/protected-layout";
import DashboardPage from "./pages/dashboard";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { MenuSysButtons } from "./components/menu-sys-buttons";
import { invoke } from "@tauri-apps/api/tauri";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomeTest /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="h-screen overflow-clip">

          <div
            className={cn(
              "h-screen overflow-auto border-t bg-background pb-8",
              // "scrollbar-none"
              "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
            )}
          >
            <RouterProvider router={router} />
          </div>
        </div>
        <TailwindIndicator />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
