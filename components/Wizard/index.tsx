import { useState } from 'react';
import WizardInit from './WizardInit';
import WizardOne from './WizardOne';
import WizardTwo from './WizardTwo';
import WizardThree from './WizardThree';
import WizardFour from './WizardFour';
import WizardFive from './WizardFive';
import WizardNavigation from './_partials/WizardNavigation';
import Title from '../Title';
import ServicePicker from './_partials/ServicePicker';
import StepsOverview from './_partials/StepsOverview';
import ResponsiveWrapper from '../Layout/_partials/ResponsiveWrapper';

const index = ({
  wizardRef,
} : {
  wizardRef: any,
}) => {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(undefined);
  return (
    <section className="bg-gray-200 py-8" ref={wizardRef}>
      <ResponsiveWrapper>
        <div className="flex flex-col items-center w-full">
          <Title
            heading="h2"
            text="Ready? Set. Develop!"
            className="mb-6"
          />
          {(step !== 0 && service) && (
          <>
            <ServicePicker setStep={setStep} service={service} setService={setService} />
            <StepsOverview step={step} service={service} />
          </>
          )}
          {step === 0 && (
          <WizardInit step={step} setStep={setStep} setService={setService} />
          )}
          { step === 1 && (
          <WizardOne step={step} setStep={setStep} service={service} />
          )}
          { step === 2 && (
          <WizardTwo step={step} setStep={setStep} service={service} setService={setService} />
          )}
          { step === 3 && (
          <WizardThree step={step} setStep={setStep} service={service} setService={setService} />
          )}
          { step === 4 && (
          <WizardFour step={step} setStep={setStep} service={service} setService={setService} />
          )}
          { step === 5 && (
          <WizardFive step={step} setStep={setStep} service={service} setService={setService} />
          )}
        </div>
      </ResponsiveWrapper>
    </section>
  );
};

export default index;
