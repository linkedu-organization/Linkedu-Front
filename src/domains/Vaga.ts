import type { Recrutador } from "./Recrutador";

export interface Vaga {
    id: number;
    recrutadorId: number;
    titulo: string;
    descricao: string;
    ehPublica: boolean;
    ehRemunerada: boolean;
    dataExpiracao: string;
    cargaHoraria: number;
    duracao: string;
    instituicao: string;
    curso: string;
    linkInscricao: string;
    local: string;
    publicoAlvo: string[];
    conhecimentosObrigatorios: string[];
    conhecimentosOpcionais: string[];
    categoria: string;
    recrutador?: Recrutador;
}