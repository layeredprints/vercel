import ProjectOne from './_partials/ProjectOne';
import TeamOne from './_partials/TeamOne';

const index = ({
  step,
  setStep,
  service,
} : {
  step: number,
  setStep: (e: number) => void,
  service: string,
}) => (
  <div>
    {service === 'team' ? (
      <TeamOne step={step} setStep={setStep} service={service} />
    ) : (
      <ProjectOne step={step} setStep={setStep} service={service} />
    )}
  </div>
);

export default index;
