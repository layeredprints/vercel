import ProjectTwo from './_partials/ProjectTwo';
import TeamTwo from './_partials/TeamTwo';

const index = ({
  step,
  setStep,
  service,
  setService,
} : {
  step: number,
  setStep: (e: number) => void,
  service: string,
  setService: (s: string) => void,
}) => (
  <div>
    {service === 'team' ? (
      <TeamTwo step={step} setStep={setStep} service={service} />
    ) : (
      <ProjectTwo step={step} setStep={setStep} service={service} />
    )}
  </div>
);

export default index;
