const ServicePicker = ({
  service,
  setStep,
  setService,
} : {
  service: string,
  setStep: (step: number) => void,
  setService: (serv: string) => void,
}) => (
  <div className="flex mb-8">
    <button
      type="button"
      onClick={() => {
        setService(service === 'team' ? 'project' : 'team');
        setStep(1);
      }}
      className="mr-4"
    >
      <img src="/chevron_left.svg" alt="chevron left" />
    </button>
    <div className="h-20 w-80 flex flex-col justify-center items-center bg-white rounded-xl">
      <p className="uppercase text-bx-purple font-openSans font-extrabold">uw keuze</p>
      <p className="font-openSans font-extrabold">{service === 'team' ? 'Ik wil iemand in mijn team' : 'Ik heb een project'}</p>
    </div>
    <button
      type="button"
      onClick={() => {
        setService(service === 'team' ? 'project' : 'team');
        setStep(1);
      }}
      className="ml-4"
    >
      <img src="/chevron_right.svg" alt="chevron right" />
    </button>
  </div>
);

export default ServicePicker;
