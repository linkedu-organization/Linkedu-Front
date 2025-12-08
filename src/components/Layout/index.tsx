// src/layout/Layout.tsx
import React from "react";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import Header from "@components/Header";

export interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  contentVariant?: "full" | "centeredCard";
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showFooter = true,
  contentVariant = "full",
}) => (
  <div className="link-layout flex flex-column min-h-screen">
    <Header simpleHeader />

    <main className="flex-1 p-4 flex justify-content-center">
      {contentVariant === "centeredCard" ? (
        <div className="surface-card w-full md:w-8 lg:w-6 xl:w-5 p-4 shadow-3 border-round-2xl">
          {children}
        </div>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </main>

    {showFooter && (
      <footer className="surface-100 text-center p-3 border-top-1 surface-border text-600 text-sm">
        © {new Date().getFullYear()} LinkEDU – Todos os direitos reservados.
      </footer>
    )}
  </div>
);
