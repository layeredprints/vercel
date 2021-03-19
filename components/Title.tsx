import c from '../utils/c';

const Title = ({
  text,
  heading,
  className,
} : {
  text: string,
  heading: 'h1' | 'h2' | 'h3' | 'h4',
  className?: string,
}) => {
  const baseStyling = 'font-poppins font-extrabold';
  const renderTitle = () => {
    switch (heading) {
      case 'h1':
        return (
          <h1 className={c(className, baseStyling, 'uppercase text-4xl')}>{text}</h1>
        );
      case 'h2':
        return (
          <h2 className={c(className, baseStyling, 'text-3xl')}>{text}</h2>
        );
      case 'h3':
        return (
          <h3 className={c(className, baseStyling, 'text-xl')}>{text}</h3>
        );
      case 'h4':
        return (
          <h4 className={c(className, baseStyling)}>{text}</h4>
        );
      default:
        return (
          <span className="hidden" />
        );
    }
  };

  const title = (renderTitle());

  return (
    title
  );
};

export default Title;
