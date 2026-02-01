import "./style.css";
import type { Vaga } from "@domains/Vaga";
import { publicoAlvo, categorias } from "@utils/constants";
import { getValueByKey } from "@utils/utils";
import { normalizeUrl } from "@utils/utils";

const VagaDetailsDialog = ({vaga} : {vaga: Vaga | null}) => { 
    
    if (!vaga) return null;
    return (
        <div>
              <div className="vaga-description">
                <h3>Descrição da Vaga</h3>
                <p>{vaga.descricao}</p>
              </div>

              <div className="vaga-details-grid">
                <div className="vaga-row">
                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-building" />
                    </span>

                    <span className="label"><b>Instituição</b></span>

                    <div className="value">{vaga.instituicao}</div>
                  </div>
                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-book" />
                    </span>
                    <span className="label"><b>Curso</b></span>
                    <div className="value">{vaga.curso}</div>
                  </div>
                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-user" />
                    </span>
                    <span className="label"><b>Público-alvo</b></span>
                    <div className="value">
                      {(vaga.publicoAlvo ?? [])
                        .map((v) => getValueByKey(v, publicoAlvo as any, "value", "label"))
                        .join(", ") || "-"}
                    </div>
                  </div>
                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-list" />
                    </span>
                    <span className="label"><b>Categoria</b></span>
                    <div className="value">{getValueByKey(vaga.categoria, categorias as any, "value", "label")}</div>
                  </div>
                </div>

                <div className="vaga-row">
                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-user" />
                    </span>
                    <span className="label"><b>Ofertada por</b></span>
                    <div className="value">{vaga.recrutador?.perfil?.nome ?? "Desconhecido"}</div>
                  </div>

                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-clock" />
                    </span>
                    <span className="label"><b>Carga horária</b></span>
                    <div className="value">{vaga.cargaHoraria}h/semana </div>
                  </div>

                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-clock" />
                    </span>
                    <span className="label"><b>Tempo de duração</b></span>
                    <div className="value">{vaga.duracao}</div>
                  </div>

                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-dollar" />
                    </span>
                    <span className="remunerada"><b>{vaga.ehRemunerada ? "Remunerada" : "Voluntária"}</b></span>
                  </div>
                </div>

                <div className="vaga-row wide">
                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-book" />
                    </span>
                    <span className="label"><b>Conhecimentos Obrigatórios</b></span>
                    <div className="value">{vaga.conhecimentosObrigatorios.join(", ")}</div>
                  </div>

                  <div className="item">
                    <span className="icon-badge" aria-hidden="true">
                      <i className="pi pi-book" />
                    </span>
                    <span className="label"><b>Conhecimentos Opcionais</b></span>
                    <div className="value">{vaga.conhecimentosOpcionais.join(", ")}</div>
                  </div>
                </div>

                <div className="vaga-row link-row">
                  <i className="pi pi-external-link" />
                  <b>Link para inscrição:</b>
                  <a href={normalizeUrl(vaga.linkInscricao)} target="_blank" rel="noopener noreferrer">
                    {vaga.linkInscricao}
                  </a>
                </div>
              </div>
            </div>
    );

};
export default VagaDetailsDialog;