import { map } from 'lodash';
import ResponsiveWrapper from '../Layout/_partials/ResponsiveWrapper';
import Member from './_partials/Member';

const index = () => {
  const members = [{
    name: 'Nikolas',
    title: (
      <>
        <p>Digital Product /</p>
        <p>Project Manager</p>
      </>
    ),
  }, {
    name: 'Jens',
    title: (
      <>
        <p>Software Architect &amp;</p>
        <p>Back-end / Blockchain Developer</p>
      </>
    ),
  }, {
    name: 'Maarten',
    title: (
      <>
        <p>Full Stack Developer</p>
      </>
    ),
  }, {
    name: 'Jasper',
    title: (
      <>
        <p>Front-end Developer</p>
        <p>UX Designer</p>
      </>
    ),
  }, {
    name: 'Louis',
    title: (
      <>
        <p>Digital Product Designer</p>
      </>
    ),
  }];
  return (
    <ResponsiveWrapper>
      <div className="flex">
        {map(members, (member) => (
          <Member {...member} />
        ))}
      </div>
    </ResponsiveWrapper>
  );
};

export default index;
