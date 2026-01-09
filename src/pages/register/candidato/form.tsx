import { useMemo, useState } from "react";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Layout } from "@components/Layout";
import { useNotification } from "@contexts/notificationContext";
import { useRegisterCandidato } from "@stores/register/candidato/formStore";
import TabDadosBasicos from "./tabs/tabDadosBasicos";
import TabEscolaridade from "./tabs/tabEscolaridade";
import TabProfissional from "./tabs/tabProfissional";
import "./style.css";

const RegisterCandidato = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { formData, setField, validateStep, finalizeRegister } =
    useRegisterCandidato();
  const { showNotification } = useNotification();

  const nextStep = async () => {
    setSubmitted(true);
    if (await validateStep(activeIndex)) {
      setActiveIndex(activeIndex + 1);
    } else {
      showNotification("error", null, "Verifique os campos do formulário!");
    }

    setSubmitted(false);
  };

  const stepBack = () => {
    setSubmitted(false);
    setActiveIndex((v) => Math.max(0, v - 1));
  };

  const stepsItems = useMemo(
    () => [
      {
        component: (
          <TabDadosBasicos
            formData={formData}
            setField={setField}
            submitted={submitted}
          />
        ),
      },
      {
        component: (
          <TabEscolaridade
            formData={formData}
            setField={setField}
            submitted={submitted}
          />
        ),
      },
      {
        component: (
          <TabProfissional
            formData={formData}
            setField={setField}
            submitted={submitted}
          />
        ),
      },
    ],
    [formData, setField, submitted]
  );

  return (
    <div className="main-register">
      <Layout showFooter headerType="simple">
        <div className="container-register">
          <div className="card">
            <p className="tittle-register">Cadastro de Candidato</p>

            {stepsItems[activeIndex].component}

            <Steps
              model={stepsItems.map((_, index) => ({
                command: () => setActiveIndex(index),
              }))}
              activeIndex={activeIndex}
              readOnly
            />

            <div className="action-buttons">
              {activeIndex !== 0 && (
                <Button
                  className="step-button"
                  label="Voltar"
                  onClick={stepBack}
                  icon="pi pi-arrow-left"
                  iconPos="left"
                />
              )}

              {activeIndex < 2 && (
                <Button
                  className="step-button"
                  label="Próximo"
                  onClick={nextStep}
                  icon="pi pi-arrow-right"
                  iconPos="right"
                />
              )}

              {activeIndex === 2 && (
                <Button
                  className="step-button"
                  label="Concluir"
                  onClick={finalizeRegister}
                  icon="pi pi-check"
                  iconPos="right"
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default RegisterCandidato;
