import { useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useClickOutside } from "primereact/hooks";
import "primeicons/primeicons.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { useAuth } from "@contexts/authContext";

interface HeaderProps {
  headerType: "simple" | "full" | "home";
}

const Header = ({ headerType }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { perfil, handleLogout } = useAuth();

  const [menuVisible, setMenuVisible] = useState(false);
  const [query, setQuery] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);

  const isLoggedIn = !!perfil;
  const isExplorePage = location.pathname === "/explore";

  const toggleMenu = () => setMenuVisible((visible) => !visible);

  useClickOutside(menuRef, () => {
    setMenuVisible(false);
  });

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

  const redirectProfile = () => {
    if (perfil?.tipo === "CANDIDATO") {
      navigate("/profile/candidato");
    } else {
      navigate("/profile/recrutador");
    }
  };

  const submitSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      navigate({ pathname: "/explore", search: "" });
      return;
    }

    navigate({
      pathname: "/explore",
      search: `?q=${encodeURIComponent(trimmedQuery)}`,
    });
  };

  if (headerType === "simple") {
    return <div className="simple-header">{logo}</div>;
  }

  const panelMenuItems = [
    ...(!isLoggedIn && !isExplorePage
      ? [
          {
            label: "Início",
            icon: "pi pi-home",
            command: () => {
              setMenuVisible(false);
              navigate("/");
            },
          },
        ]
      : []),

    ...(!isExplorePage
      ? [
          {
            label: "Vagas e Perfis",
            icon: "pi pi-search",
            command: () => {
              setMenuVisible(false);
              navigate("/explore");
            },
          },
        ]
      : []),

    ...(isLoggedIn
      ? [
          {
            label: "Meu Perfil",
            icon: "pi pi-user",
            command: () => {
              setMenuVisible(false);
              redirectProfile();
            },
          },
          {
            label: "Sair",
            icon: "pi pi-sign-out",
            command: async () => {
              setMenuVisible(false);
              handleLogout();
            },
          },
        ]
      : []),
  ];

  const end = (
    <div className="flex align-items-center">
      {headerType !== "home" && (
        <div className="search-container">
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
              value={query}
              type="text"
              style={{ height: "2rem" }}
              placeholder="Buscar por vagas ou perfis"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") submitSearch();
              }}
            />
          </IconField>
        </div>
      )}

      {headerType === "home" ? (
        <div className="header-auth-actions">
          <Button
            label="Entrar"
            className="header-login-button"
            onClick={() => navigate("/login")}
          />

          <Button
            label="Registrar-se"
            className="header-register-button"
            onClick={() => navigate("/register")}
          />
        </div>
      ) : (
        <div
          className="flex align-items-center gap-4 justify-center"
          ref={menuRef}
        >
          <Button icon="pi pi-align-justify" onClick={toggleMenu} text />

          {menuVisible && (
            <div className="menu-container">
              <PanelMenu model={panelMenuItems} style={{ width: "200px" }} />
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
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
};

export default Header;