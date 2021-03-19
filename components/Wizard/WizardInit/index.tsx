import InitOption from './_partials/initOption';

const WizardInit = ({
  step,
  setStep,
  setService,
} : {
  step: number,
  setStep: (e: number) => void,
  setService: (s: string) => void,
}) => (
  <div className="flex justify-between">
    <InitOption
      label="Ik wil iemand in mijn team"
      service="team"
      setService={setService}
      step={step}
      setStep={setStep}
    />
    <InitOption
      label="Ik heb een project"
      service="project"
      setService={setService}
      step={step}
      setStep={setStep}
    />

  </div>
);

export default WizardInit;
