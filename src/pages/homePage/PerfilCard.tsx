import { Card } from 'primereact/card';
import type { Perfil } from "../../domains/Perfil";

type Props = {
  perfil: Perfil;
};

const PerfilCard = ({perfil}: Props) => {
    return(
        <Card className="perfil-card">
            <div className="perfil-header">
              <h2 className="perfil-name">{perfil.nome ?? "Sem nome"}</h2>
            </div>
        </Card>
    );
};

export default PerfilCard;