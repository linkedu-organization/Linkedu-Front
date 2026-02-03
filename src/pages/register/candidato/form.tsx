import { useRegisterCandidato } from "@stores/register/candidato/formStore";
import RegisterWizard from "@components/RegisterWizard";
import TabDadosBasicos from "./tabs/tabDadosBasicos";
import TabEscolaridade from "./tabs/tabEscolaridade";
import TabProfissional from "./tabs/tabProfissional";

const RegisterCandidato = () => (
  <RegisterWizard
    title="Cadastro de Candidato"
    useStore={useRegisterCandidato}
    steps={[
      {
        label: "Dados básicos",
        render: (p) => <TabDadosBasicos {...p} />,
      },
      {
        label: "Escolaridade",
        render: (p) => <TabEscolaridade {...p} />,
      },
      {
        label: "Profissional",
        render: (p) => <TabProfissional {...p} />,
      },
    ]}
  />
);

export default RegisterCandidato;
