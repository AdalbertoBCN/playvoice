import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";

import { ClerkProvider } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TailwindIndicator } from "./components/tailwind-indicator";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedLayout from "./layouts/protected-layout";
import PublicLayout from "./layouts/public-layout";
import { cn } from "./lib/utils";
import { ChatVoice } from "./pages/chat-voice";
import DashboardPage from "./pages/dashboard";
import HomeTest from "./pages/home-test";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";

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
      { path: '/chat-voice', element: <ChatVoice /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}
    >
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
