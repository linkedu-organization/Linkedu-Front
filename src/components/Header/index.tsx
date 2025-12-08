import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import "primeicons/primeicons.css";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  simpleHeader: boolean;
}

export default function Header({ simpleHeader }: HeaderProps) {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  let content = <></>;

  if (simpleHeader) {
    content = (
      <div className="simple-header">
        <Link to="/">
          <img
            alt="logo"
            src="/images/logo.svg"
            height="40"
            className="ml-2 mr-4"
          />
        </Link>
      </div>
    );
  } else {
    const panelMenuItems = [
      {
        label: "Meu Perfil",
        icon: "pi pi-user",
        command: () => navigate("/"),
      },
      {
        label: "Histórico de Pedidos",
        icon: "pi pi-history",
        command: () => navigate("/"),
      },

      {
        label: "Sair",
        icon: "pi pi-sign-out",
        command: () => navigate("/"),
      },
    ];
    const start = (
      <Link to="/">
        <img
          alt="logo"
          src="/images/logo-clara.png"
          height="40"
          className="ml-2 mr-4"
        />
      </Link>
    );

    const end = (
      <div className="flex align-items-center">
        <div className="search-container" />

        <div className="flex align-items-center gap-4 justify-center iconGroup">
          <Button icon="pi pi-arrow-right" onClick={() => toggleMenu()} />
        </div>

        {menuVisible && (
          <div className="menu-container">
            <PanelMenu model={panelMenuItems} style={{ width: "200px" }} />
          </div>
        )}
      </div>
    );

    content = (
      <Menubar
        start={start}
        end={end}
        style={{
          background: "#2F292A",
          border: "none",
          borderRadius: "0%",
          padding: "0.5rem 2rem",
          width: "100vw",
        }}
      />
    );
  }
  return content;
}
