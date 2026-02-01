import { useState } from "react";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { Layout } from "@components/Layout";
import { useNotification } from "@contexts/notificationContext";
import "./style.css";

type RegisterWizardProps = {
  title: string;
  useStore: unknown;
  steps: unknown[];
};

const RegisterWizard = ({ title, useStore, steps }: RegisterWizardProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const { formData, setField, validateStep, finalizeRegister, errors } =
    useStore();
  const { showNotification } = useNotification();
  const lastIndex = steps.length - 1;

  const nextStep = async () => {
    setSubmitted(true);
    if (await validateStep(activeIndex)) {
      if (activeIndex === lastIndex) {
        finalizeRegister();
      } else {
        setActiveIndex((v) => Math.min(lastIndex, v + 1));
      }
      setSubmitted(false);
    } else {
      showNotification("error", null, "Verifique os campos do formulário!");
    }
  };

  const stepBack = () => {
    setSubmitted(false);
    setActiveIndex((v) => Math.max(0, v - 1));
  };

  const current = steps[activeIndex];

  return (
    <div className="main-register">
      <Layout showFooter headerType="simple">
        <div className="container-register">
          <div className="card">
            <p className="tittle-register">{title}</p>

            {current.render({ formData, setField, submitted, errors })}

            <Steps
              model={steps.map((_, index) => ({
                command: () => setActiveIndex(index),
              }))}
              activeIndex={activeIndex}
              readOnly
            />
            <div
              className="action-buttons"
              style={{
                justifyContent: activeIndex === 0 ? "end" : "space-between",
              }}
            >
              {activeIndex !== 0 && (
                <Button
                  className="step-button"
                  label="Voltar"
                  onClick={stepBack}
                  icon="pi pi-arrow-left"
                  iconPos="left"
                />
              )}
              {activeIndex < lastIndex && (
                <Button
                  className="step-button"
                  label="Próximo"
                  onClick={nextStep}
                  icon="pi pi-arrow-right"
                  iconPos="right"
                />
              )}
              {activeIndex === lastIndex && (
                <Button
                  className="step-button"
                  label="Concluir"
                  onClick={nextStep}
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

export default RegisterWizard;
