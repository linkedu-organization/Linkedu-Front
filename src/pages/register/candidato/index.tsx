import { useState } from "react";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { useNotification } from "@contexts/notificationContext";
import { Layout } from "@components/Layout";
import TabEscolaridade from "./tabs/tabEscolaridade";
import TabProfissional from "./tabs/tabProfissional";
import TabDadosBasicos from "./tabs/tabDadosBasicos";
import "./style.css";

const RegisterCandidato = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [_, setSubmitted] = useState(false);
  const { showNotification } = useNotification();

  const nextStep = async () => {
    setActiveIndex(activeIndex + 1);
    // if (await validateStep(activeIndex)) {
    //  setSubmitted(true);
    //  setActiveIndex(activeIndex + 1);
    // } else {
    //  showNotification("error", null, "Verifique os campos do formulário!");
    // }
    // setSubmitted(false);
  };

  const stepBack = () => {
    setActiveIndex(activeIndex - 1);
  };

  const stepsItems = [
    {
      component: <TabDadosBasicos />,
    },
    {
      component: <TabEscolaridade />,
    },
    {
      component: <TabProfissional />,
    },
  ];

  return (
    <div className="main-register">
      <Layout showFooter headerType="simple">
        <div className="container-register">
          <div className="card">
            <p className="tittle-register">Cadastro de Candidato</p>
            <div>{stepsItems[activeIndex].component}</div>
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
                  onClick={(e) => stepBack()}
                />
              )}
              {activeIndex < 2 && (
                <Button
                  className="step-button"
                  label="Continuar"
                  onClick={(e) => nextStep()}
                />
              )}
              {activeIndex === 2 && (
                <Button
                  className="step-button"
                  label="Finalizar"
                  onClick={(e) => nextStep()} // finalizar
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
