import Button from './Button';
import Creatable from './Creatable';
import Input from './Input';

const Contact = ({
  contactRef,
} : {
  contactRef: any,
}) => (
  <section ref={contactRef}>
    <form className="w-full flex flex-col" action="">
      <Input
        name="email"
        type="email"
        label="email"
        placeholder="Type je email"
        className="rounded-full"
        onChange={(e: any) => console.log(e)}
      />
      <Input
        name="number"
        type="number"
        placeholder="Type een getal"
        className="rounded-full"
        label="getal"
        onChange={(e: any) => console.log(e)}
      />
      <Input
        name="text"
        type="text"
        placeholder="Type je tekst"
        className="rounded-full"
        onChange={(e: any) => console.log(e)}
      />
      <Input
        name="textarea"
        type="textarea"
        className="resize-none rounded-xl"
        rows={5}
        placeholder="Type je tekst"
        onChange={(e: any) => console.log(e)}
      />
      <Input
        name="extra_technologies"
        type="creatable"
        defaultValue={['yes', 'no', 'what']}
        placeholder="Type a custom technology and press 'ENTER'"
        className="rounded-full"
        onChange={(e: any) => console.log(e)}
      />
      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          label="Send"
          onClick={() => console.log('yeah')}
        />
      </div>
    </form>
  </section>
);

export default Contact;
