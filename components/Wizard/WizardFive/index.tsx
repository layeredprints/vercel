import LastScreen from '../_partials/LastScreen';

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
    <LastScreen step={step} service={service} setStep={setStep} />
  </div>
);

export default index;
