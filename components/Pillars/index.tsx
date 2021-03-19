import { map } from 'lodash';
import ResponsiveWrapper from '../Layout/_partials/ResponsiveWrapper';
import Pillar from './_partials/Pillar';

const index = () => {
  const pillars = [{
    title: 'Flexibel',
    content: 'Slimme developers, enkel wanneer je ze nodig hebt. Per sprint.',
  }, {
    title: 'Snel',
    content: 'Geen tijdrovend wervingsproces. Een match? Aan de slag!',
  }, {
    title: 'Ervaren',
    content: 'Ervaren developers die matchen met jouw tech stack.',
  }, {
    title: 'Remote',
    content: 'Ook op (veilige) afstand zijn we dichtbij. Communicatie blijft key.',
  }];
  return (
    <section className="mb-24">
      <ResponsiveWrapper>
        <div className="flex">
          {map(pillars, (pillar) => (
            <Pillar {...pillar} />
          ))}
        </div>
      </ResponsiveWrapper>
    </section>
  );
};

export default index;
