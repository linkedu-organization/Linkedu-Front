import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import type { Vaga } from "@domains/Vaga";
import { Avatar } from "primereact/avatar"

type VagaCardProps = {
  vaga: Vaga;
  openDetails: (vaga: Vaga) => void;
};

const VagaCard = ({vaga, openDetails}: VagaCardProps) => {

    return(
        <Card key={vaga.id} className="position-card"> 

            <div className="position-card-header">
              <h2 className="card-title">{vaga.titulo} - {vaga.categoria}</h2>
              <p className="position-work-hours">{vaga.cargaHoraria}h/semana</p>
            </div>  

            <p className="position-type">
              <span className="value ellipsis">{vaga.ehRemunerada ? "Remunerada" : "Voluntária"}</span>
            </p>

           <div className="position-lab">
              <Avatar icon="pi pi-building" shape="circle" className="icon-badge mr-2" />
              <b>Instituição: </b>
              <span className="value ellipsis">{vaga.instituicao}</span>
            </div>

            <div className="position-recruiter">
              <Avatar icon="pi pi-user" shape="circle" className="icon-badge mr-2" />
              <b>Ofertada por: </b>
              <span className="value ellipsis">{vaga.recrutador?.perfil?.nome ?? "Desconhecido"}</span>
            </div>

            <div className="position-course">
              <Avatar icon="pi pi-book" shape="circle" className="icon-badge mr-2" />
              <b>Curso: </b>
              <span className="value ellipsis">{vaga.curso}</span>
            </div>

            <div className="position-skills">
              <Avatar icon="pi pi-check-circle" shape="circle" className="icon-badge mr-2" />
              <b>Conhecimentos Obrigatórios: </b>
              <span className="value ellipsis">{vaga.conhecimentosObrigatorios}</span>
            </div>
            
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