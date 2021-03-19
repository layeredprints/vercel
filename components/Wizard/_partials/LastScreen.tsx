import { Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import validator from 'validator';
import Input from '../../Input';
import Title from '../../Title';
import WizardNavigation from './WizardNavigation';
import { WizardContext } from '../../../contextApi/WizardProvider';

const LastScreen = ({
  step,
  service,
  setStep,
}: {
  step: number,
  service: string,
  setStep: (s: number) => void,
}) => {
  const {
    personalInfo,
    submitWizardForm,
  } = useContext(WizardContext);
  const [telephone, setTelephone] = useState(personalInfo.telephone);
  const [email, setEmail] = useState(personalInfo.email);
  const [message, setMessage] = useState(personalInfo.message);
  let telephoneError = 'Vul telefoon of GSM in';
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formValidationSchema = Yup.object().shape({
    telephone: Yup.string()
      .test('checkTelephone', telephoneError, (value) => {
        if (value) {
          if (value.length === 12) {
            if (validator.isMobilePhone(value || '', ['nl-BE'], { strictMode: true })) {
              return true;
            }
            telephoneError = 'GSM formaat ongeldig (+32474XXXXXX)';
            return false;
          }
          if (validator.matches(value, /^\d{9}$/)) {
            return true;
          }
          telephoneError = 'Telefoonnummber formaat ongeldig (0XXXXXXXX)';
          return false;
        }
        telephoneError = 'Telefoonnummber is verplicht';
        return false;
      }).nullable(),
    email: Yup.string().matches(emailRegex).required().nullable(),
    message: Yup.string().nullable(),
  });
  return (
    <article className="flex flex-col items-center w-140">
      <header className="mb-6">
        <Title
          heading="h3"
          text="Wil je nog iets kwijt?"
        />
      </header>
      <Formik
        validateOnMount
        initialValues={{
          telephone,
          email,
          message,
        }}
        onSubmit={(values: any) => {
          submitWizardForm(values, service);
        }}
        validationSchema={formValidationSchema}
      >
        {({
          values,
          isValid,
          errors,
          handleChange,
          handleSubmit,
        }) => (
          <form className="w-full">
            <div className="flex w-full justify-between">
              <Input
                label="Telefoonnummer"
                type="tel"
                name="telephone"
                placeholder="telefoonnummer"
                className="rounded-full"
                infoBtn="+32xxxxxxxxx / 0xxxxxxxx"
                value={values.telephone}
                onChange={(e: any) => {
                  setTelephone(e.target.value);
                  handleChange({
                    type: 'change',
                    target: {
                      name: 'telephone',
                      value: e.target.value,
                    },
                  });
                }}
              />
              <Input
                label="E-mail"
                type="email"
                name="email"
                placeholder="naam@domein.be"
                className="rounded-full"
                defaultValue={values.email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                  handleChange({
                    type: 'change',
                    target: {
                      name: 'email',
                      value: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <Input
              name="message"
              label="Vertel ons iets over het team / jullie projecten / ..."
              type="textarea"
              className="rounded-2xl w-full resize-none"
              value={values.message}
              placeholder="Zijn er belangrijke zaken die wij nog moeten weten, of wil je gewoon ons wat inleiden..."
              onChange={(e: any) => {
                setMessage(e.target.value);
                handleChange({
                  type: 'change',
                  target: {
                    name: 'message',
                    value: e.target.value,
                  },
                });
              }}
            />
            <div className="w-full flex justify-center">
              <WizardNavigation
                step={step}
                service={service}
                setStep={setStep}
                onNext={handleSubmit}
                onSubmit={handleSubmit}
                isValid={isValid}
              />
            </div>
          </form>
        )}
      </Formik>
    </article>
  );
};

export default LastScreen;
