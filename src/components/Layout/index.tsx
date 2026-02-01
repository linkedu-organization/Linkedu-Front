import React from "react";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import Header from "@components/Header";
import "./style.css";

export interface LayoutProps {
  children: React.ReactNode;
  headerType: "none" | "simple" | "full";
  showFooter: boolean;
}

export const Layout = ({ children, showFooter, headerType }: LayoutProps) => (
  <div className="layout-root">
    {headerType !== "none" && <Header headerType={headerType} />}
    <main className="layout-main">{children}</main>
    {showFooter && (
      <footer className="layout-footer">
        <p>Suporte técnico</p>
        <a href="mailto:linkedu@gmail.com">linkedu@gmail.com</a>
      </footer>
    )}
  </div>
);
