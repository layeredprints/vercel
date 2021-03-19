import Button from '../../Button';
import Title from '../../Title';
import LogoBAD from './LogoBAD';
import ResponsiveWrapper from './ResponsiveWrapper';

const Header = ({
  scrollToContact,
  scrollToWizard,
} : {
  scrollToContact: () => void,
  scrollToWizard: () => void,
}) => (
  <header className="relative w-full mb-32">
    <h1 className="hidden">Book A Developer</h1>
    <div className="absolute top-0 left-0 w-full -z-10">
      <div className="bg-bx-purple h-60" />
      <img
        src="/backgrounds/hero.png"
        alt="background hero"
        className="w-full h-72"
      />
    </div>
    <ResponsiveWrapper>
      <div className="flex justify-between items-center my-8">
        <LogoBAD />
        <Button
          outline
          type="button"
          onClick={scrollToContact}
          label="Contact"
        />
      </div>
      <div className="flex w-full mt-24">
        <div>
          <Title
            heading="h1"
            text="Developers nodig?"
            className="text-white"
          />
          <p className="font-openSans text-white mb-8">
            Boek ze hier, per sprint.
            Ervaren developers uit eigen land, met goesting om jouw uitdagingen aan te pakken.
            Mensen die perfect passen in agile development teams.
            Om een tijdelijk tekort op te vangen, een team op weg te zetten of te versterken met specifieke expertise.
          </p>
          <Button
            label="Boek nu"
            onClick={scrollToWizard}
          />
        </div>
        <img
          src="/header_team.svg"
          alt="teamword"
          className="w-1/3 ml-12"
        />
      </div>
    </ResponsiveWrapper>
  </header>
);

export default Header;
