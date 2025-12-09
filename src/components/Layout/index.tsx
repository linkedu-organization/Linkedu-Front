import React from "react";

import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import Header from "@components/Header";
import "./style.css";

export interface LayoutProps {
  children: React.ReactNode;
  showFooter: boolean;
  simpleHeader: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showFooter,
  simpleHeader,
}) => (
  <div>
    <Header simpleHeader={simpleHeader} />
    <main>
      <div>{children}</div>
    </main>

    {showFooter && <footer className="container-footer" />}
  </div>
);
