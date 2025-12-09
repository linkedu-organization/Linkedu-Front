import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import "primeicons/primeicons.css";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

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
            src="/images/logo-clara.png"
            height="40"
            width="130px"
            className="ml-2 mr-4"
          />
        </Link>
      </div>
    );
  } else {
    const panelMenuItems = [
      {
        label: "Início",
        icon: "pi pi-home",
        command: () => navigate("/"),
      },
      {
        label: "Meu Perfil",
        icon: "pi pi-user",
        command: () => navigate("/"),
      },
      {
        label: "Minhas Vagas",
        icon: "pi pi-briefcase",
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
          width="130px"
          className="ml-2 mr-4"
        />
      </Link>
    );

    const end = (
      <div className="flex align-items-center gap-4 justify-center">
        <Button icon="pi pi-list" onClick={() => toggleMenu()} text />
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
          background: "#364FAB",
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
