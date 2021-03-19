import { toLower } from 'lodash';
import { ReactNode } from 'react';

const Member = ({
  name,
  title,
} : {
  name: string,
  title: ReactNode,
}) => {
  console.log(title);
  return (
    <div className="flex flex-col items-center">
      <img src={`/team/${toLower(name)}.jpg`} alt={`${name}`} />
      <p>{name}</p>
      {title}
    </div>
  );
};

export default Member;
