import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { find } from 'lodash';
import Input from '../../../Input';
import Title from '../../../Title';
import WizardNavigation from '../../_partials/WizardNavigation';
import { WizardContext } from '../../../../contextApi/WizardProvider';

const TeamTwo = ({
  step,
  service,
  setStep,
}: {
  step: number,
  service: string,
  setStep: (s: number) => void,
}) => {
  const {
    teamInfo,
    submitTeamInfo,
  } = useContext(WizardContext);
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
  const [sprintDuration, setSprintDuration] = useState(teamInfo.sprintDuration);
  const [sprintCurrency, setSprintCurrency] = useState(teamInfo.sprintCurrency);
  const [sprintAmount, setSprintAmount] = useState(teamInfo.sprintAmount);
  const [sprintStart, setSprintStart] = useState(teamInfo.sprintStart || nextWeek);
  const currencyOptions = [
    { value: 'weeks', label: 'Weeks' },
    { value: 'months', label: 'Months' },
  ];

  const formValidationSchema = Yup.object().shape({
    sprintDuration: Yup.number().required(),
    sprintCurrency: Yup.string().required(),
    sprintAmount: Yup.number().required(),
    sprintStart: Yup.date().required(),
  });

  return (
    <div className="flex flex-col items-center">
      <Title
        heading="h3"
        text="Sprints"
      />
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={{
          sprintDuration,
          sprintCurrency,
          sprintAmount,
          sprintStart,
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values: any) => {
          submitTeamInfo(values.sprintDuration, 'sprintDuration');
          submitTeamInfo(values.sprintCurrency, 'sprintCurrency');
          submitTeamInfo(values.sprintAmount, 'sprintAmount');
          submitTeamInfo(values.sprintStart, 'sprintStart');
        }}
      >
        {({
          values,
          isValid,
          handleChange,
          handleSubmit,
        }) => (
          <form className="flex flex-col items-center w-140">
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <label className="py-2 font-openSans font-extrabold block cursor-pointer" htmlFor="sprintDuration">Hoe lang duurt een sprint?</label>
                  <div className="flex">
                    <Input
                      type="number"
                      name="sprintDuration"
                      onChange={(e: any) => {
                        setSprintDuration(e.target.value);
                        handleChange({
                          type: 'change',
                          target: {
                            name: 'sprintDuration',
                            value: e.target.value,
                          },
                        });
                      }}
                      className="rounded-full w-24 mr-2"
                      min={1}
                      max={10}
                      value={values.sprintDuration}
                    />
                    <Input
                      type="select"
                      name="sprintCurrency"
                      placeholder="Selecteer..."
                      options={currencyOptions}
                      className="rounded-full"
                      onChange={(e: any) => {
                        setSprintCurrency(e.value);
                        handleChange({
                          target: {
                            name: 'sprintCurrency',
                            value: find(currencyOptions, e.value),
                          },
                        });
                      }}
                      value={values.sprintCurrency}
                    />
                  </div>
                </div>
                <Input
                  type="number"
                  name="sprintAmount"
                  label="Hoeveel sprints heb je nodig?"
                  className="rounded-full"
                  min={1}
                  value={values.sprintAmount}
                  onChange={(e: any) => {
                    setSprintAmount(e.target.value);
                    handleChange({
                      type: 'change',
                      target: {
                        name: 'sprintAmount',
                        value: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <Input
                name="sprintStart"
                type="date"
                className="rounded-full"
                defaultValue={values.sprintStart}
                minDate={nextWeek}
                label="Wanneer wil je starten"
                onChange={(e: any) => {
                  setSprintStart(new Date(e));
                  handleChange({
                    type: 'change',
                    target: {
                      name: 'sprintStart',
                      value: new Date(e),
                    },
                  });
                }}
              />
            </div>
            <WizardNavigation
              step={step}
              service={service}
              setStep={setStep}
              onNext={handleSubmit}
              isValid={isValid}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default TeamTwo;
