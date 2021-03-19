import { Formik } from 'formik';
import {
  find, isEmpty, map, some,
} from 'lodash';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { WizardContext } from '../../../../contextApi/WizardProvider';
import c from '../../../../utils/c';
import Input from '../../../Input';
import Title from '../../../Title';
import WizardNavigation from '../../_partials/WizardNavigation';

const TeamOne = ({
  step,
  service,
  setStep,
} : {
  step: number,
  service: string,
  setStep: (n: number) => void,
}) => {
  const {
    teamInfo,
    submitTeamInfo,
  } = useContext(WizardContext);
  const [addedTechnologies, setAddedTechnologies] = useState(teamInfo.addedTechnologies);
  const technologies = [{
    value: 'java',
    label: 'Java',
  }, {
    value: 'node',
    label: 'node.js',
  }, {
    value: 'php',
    label: 'PHP',
  }, {
    value: 'cplus',
    label: 'C/C++',
  }, {
    value: 'csharp',
    label: 'C#',
  }, {
    value: 'net',
    label: '.NET',
  }, {
    value: 'react',
    label: 'react.js',
  }, {
    value: 'angular',
    label: 'Angular',
  }, {
    value: 'no',
    label: 'Geen voorkeur',
  }];

  const initSelected = (selected: any[]) => {
    if (!isEmpty(selected)) {
      return selected;
    }
    return map(technologies, ({ value }) => ({
      name: value,
      selected: false,
    }));
  };
  const [selectedTechnologies, setSelectedTechnologies] = useState(initSelected(teamInfo.selectedTechnologies));

  const toggleSelected = (v: string) => {
    const copySelected = { ...selectedTechnologies };
    const selectObject = find(copySelected, { name: v });
    selectObject.selected = !selectObject.selected;
    setSelectedTechnologies(copySelected);
  };

  const selectedSchema = Yup.object().shape({
    name: Yup.string(),
    selected: Yup.bool(),
  });

  const formValidationSchema = Yup.object().shape({
    selectedTechnologies: selectedSchema.test(
      'has-selected',
      'Please select one technologie',
      (values: any) => some(values, 'selected'),
    ).required(),
  });

  return (
    <article className="flex flex-col items-center">
      <header className="mb-4">
        <Title
          heading="h3"
          text="Wat is de technologiestack?"
        />
        <p className="text-center">U kan meerdere opties aanduiden</p>
      </header>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={{
          selectedTechnologies,
          addedTechnologies,
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values: any) => {
          submitTeamInfo(values.selectedTechnologies, 'selectedTechnologies');
          submitTeamInfo(values.addedTechnologies, 'addedTechnologies');
        }}
      >
        {({
          values,
          isValid,
          handleChange,
          handleSubmit,
        }) => (
          <form>
            <div className="flex flex-wrap items-center justify-center mb-12">
              {map(technologies, ({ value: v, label }) => {
                const selectObject = find(selectedTechnologies, { name: v });
                const { name } = find(values.selectedTechnologies, { name: v });
                return (
                  <Input
                    name="selectedTechnologies"
                    type="customcheckbox"
                    onChange={(e: any) => {
                      toggleSelected(e.target.value);
                      handleChange({
                        type: 'change',
                        target: {
                          name: 'selectedTechnologies',
                          value: selectedTechnologies,
                        },
                      });
                    }}
                    value={name}
                  >
                    <div className={c('bg-white cursor-pointer w-56 h-56 rounded-xl mx-4 mb-4 flex justify-center items-center', {
                      'border-2 border-bx-blue': selectObject && selectObject.selected,
                    })}
                    >
                      <div>
                        <img
                          src={`/wizard/technologies/${v}.svg`}
                          alt={label}
                          className="w-24 mb-4"
                        />
                        <p className="font-bold text-center">{label}</p>
                      </div>
                    </div>
                  </Input>
                );
              })}
            </div>
            <div className="flex flex-col items-center">
              <header className="mb-4">
                <Title
                  heading="h4"
                  text="Staat de technologie niet in de lijst?"
                />
                <p className="text-center">Voeg ze hieronder toe</p>
              </header>
              <Input
                type="creatable"
                placeholder="Type technology name and press ENTER to add"
                name="extraTechnologies"
                className="bg-white rounded-full w-140"
                defaultValue={values.addedTechnologies}
                onChange={(e: any) => {
                  setAddedTechnologies(e.target.value);
                  handleChange({
                    type: 'change',
                    target: {
                      name: 'addedTechnologies',
                      value: addedTechnologies,
                    },
                  });
                }}
              />
            </div>
            <div className="flex justify-center my-12">
              <WizardNavigation
                step={step}
                service={service}
                setStep={setStep}
                onNext={handleSubmit}
                isValid={isValid}
              />
            </div>
          </form>
        )}
      </Formik>
    </article>
  );
};

export default TeamOne;
