import { map, times } from 'lodash';
import { useEffect, useState } from 'react';
import c from '../../../utils/c';

const StepsOverview = ({
  step,
  service,
} : {
  step: number,
  service: string;
}) => {
  const [amountOfSteps, setAmountOfSteps] = useState<number>(0);
  useEffect(() => {
    setAmountOfSteps(service === 'team' ? 3 : 5);
  }, [service]);
  return (
    <div className="flex mb-12">
      {times(amountOfSteps, (s) => (
        <div
          className={c('h-2 w-12 mx-2 rounded-full', {
            'bg-bx-purple': s + 1 <= step,
            'bg-gray-400': s + 1 > step,
          })}
        />
      ))}
    </div>
  );
};

export default StepsOverview;
