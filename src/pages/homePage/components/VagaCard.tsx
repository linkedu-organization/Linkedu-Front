import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import type { Vaga } from "@domains/Vaga";

type Props = {
  vaga: Vaga;
  openDetails: (vaga: Vaga) => void;
};

const VagaCard = ({vaga, openDetails}: Props) => {

    return(
        <Card key={vaga.id} className="position-card"> 

            <div className="position-card-header">
              <h2 className="card-title">{vaga.titulo} - {vaga.categoria}</h2>
              <p className="position-work-hours">{vaga.cargaHoraria}h/semana</p>
            </div>  

            <p className="position-type">
              <span className="value ellipsis">{vaga.ehRemunerada ? "Remunerada" : "Voluntária"}</span>
            </p>

           <p className="position-lab">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-building" />
              </span>
              <span className="value ellipsis">{vaga.instituicao}</span>
            </p>

            <p className="position-recruiter">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-user" />
              </span>
              <b>Ofertada por: </b>
              <span className="value ellipsis">{vaga.recrutador?.perfil?.nome ?? "Desconhecido"}</span>
              </p>

            <p className="position-course">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-book" />
              </span>
              <b>Curso: </b>
              <span className="value ellipsis">{vaga.curso}</span>
            </p>

            <p className="position-skills">
              <span className="icon-badge" aria-hidden="true">
                <i className="pi pi-check-circle" />
              </span>
              <b>Conhecimentos Obrigatórios: </b>
              <span className="value ellipsis">{vaga.conhecimentosObrigatorios}</span>
            </p>
            
            <div className="position-card-footer">
              <Button
                  label="Ver Detalhes"
                  className="details-button"
                  onClick={() => openDetails(vaga)}
                />
            </div>
          </Card>
    );
};

export default VagaCard;