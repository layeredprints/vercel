const InitOption = ({
  label,
  step,
  service,
  setStep,
  setService,
} : {
  label: string,
  step: number,
  service: string,
  setStep: (e: number) => void,
  setService: (s: string) => void,
}) => (
  <button
    type="button"
    className="bg-white rounded-2xl h-72 w-52 p-8 mx-4"
    onClick={() => {
      setStep(step + 1);
      setService(service);
    }}
  >
    <img src={`/wizard/${service}.svg`} alt={service} />
    <p className="font-poppins font-extrabold mt-4">{label}</p>
  </button>
);

export default InitOption;
