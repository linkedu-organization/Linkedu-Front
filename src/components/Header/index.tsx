import { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

interface HeaderProps {
  headerType: "simple" | "full";
}

const Header = ({ headerType }: HeaderProps) => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [query, setQuery] = useState("");
  const toggleMenu = () => setMenuVisible((v) => !v);

  const logo = (
    <Link to="/">
      <img
        alt="logo"
        src="/images/logo-clara.png"
        height="50"
        width="100px"
        className="ml-2 mr-4"
      />
    </Link>
  );

  let content = <div />;

  if (headerType === "simple") {
    content = <div className="simple-header">{logo}</div>;
  } else {
    const panelMenuItems = [
      { 
        label: "Início", 
        icon: "pi pi-home", 
        command: () => navigate("/") 
      },
      { 
        label: "Meu Perfil", 
        icon: "pi pi-user", 
        command: () => navigate("/") 
      },
      { 
        label: "Minhas Vagas", 
        icon: "pi pi-briefcase", 
        command: () => navigate("/") 
      },
      { 
        label: "Sair", 
        icon: "pi pi-sign-out", 
        command: () => navigate("/") 
      },
    ];

    const submitSearch = () => {
      const q = query.trim();
      if (!q) {
        navigate({ pathname: "/", search: "" });
        return;
      }
      navigate({ pathname: "/", search: `?q=${encodeURIComponent(q)}` });
    };

    const end = (
      <div className="flex align-items-center">
        <div className="search-container">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={query}
              type="text"
              style={{ height: "2rem" }}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") 
                  submitSearch();
              }}
            />
          </IconField>
        </div>

        <div className="flex align-items-center gap-4 justify-center">
          <Button 
            icon="pi pi-align-justify" 
            onClick={toggleMenu} 
            text 
          />

          {menuVisible && (
            <div className="menu-container">
              <PanelMenu model={panelMenuItems} style={{ width: "200px" }} />
            </div>

          )}
          
        </div>
      </div>
    );

    content = (
      <Menubar
        start={logo}
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
};

export default Header;