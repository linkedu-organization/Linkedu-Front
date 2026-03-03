import { useRegisterRecrutador } from "@stores/register/recrutador/formStore";
import RegisterWizard from "@components/RegisterWizard";
import TabDadosBasicos from "./tabs/tabDadosBasicos";
import TabProfissional from "./tabs/tabProfissional";

const RegisterRecrutador = () => (
  <RegisterWizard
    title="Cadastro de Recrutador"
    useStore={useRegisterRecrutador}
    steps={[
      {
        label: "Dados básicos",
        render: (p) => <TabDadosBasicos {...p} />,
      },
      {
        label: "Profissional",
        render: (p) => <TabProfissional {...p} />,
      },
    ]}
  />
);

export default RegisterRecrutador;
