import { toLower } from 'lodash';
import { htmlToText } from 'html-to-text';
import Title from '../../Title';

const Pillar = ({
  title,
  content,
} : {
  title: string,
  content: any,
}) => (
  <article className="flex flex-col items-center mx-12 w-32">
    <img
      src={`/pillars/${toLower(title)}.svg`}
      alt={`Illustration of ${title}`}
      className="mb-4"
    />
    <Title
      heading="h4"
      text={title}
    />
    <p className="text-center mt- text-sm">{htmlToText(content)}</p>
  </article>
);

export default Pillar;
