import { noop } from 'lodash';
import { useEffect, useState } from 'react';
import Button from '../../Button';

const WizardNavigation = ({
  step,
  service,
  isValid,
  setStep,
  onNext,
  onSubmit = (e: any) => noop(e),
}: {
  step: number,
  service: string,
  isValid: boolean,
  setStep: (e: number) => void,
  onNext?: (n: any) => void,
  onSubmit?: (v: any) => void,
}) => {
  const [lastStep, setLastStep] = useState(false);
  useEffect(() => {
    if (service === 'team' && step === 3) {
      setLastStep(true);
    } else if (service === 'project' && step === 5) {
      setLastStep(true);
    } else {
      setLastStep(false);
    }
  }, [step]);
  const renderButtons = () => {
    const prevBut = step !== 1
      && (
        <Button
          outline
          label="vorige"
          onClick={() => setStep(step - 1)}
          className="mr-4"
        />
      );
    const nextBut = lastStep
      ? (
        <Button
          label="submit"
          onClick={onSubmit}
          disabled={!isValid}
        />
      ) : (
        <Button
          type="submit"
          label="Volgende"
          disabled={!isValid}
          onClick={(e: any) => {
            onNext(e);
            setStep(step + 1);
          }}
        />
      );
    return (
      <nav className="flex">
        {prevBut}
        {nextBut}
      </nav>
    );
  };

  const buttons = (renderButtons());

  return (
    buttons
  );
};

export default WizardNavigation;
