import {
  find, isEmpty, map, some,
} from 'lodash';
import { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import c from '../../../../utils/c';
import Input from '../../../Input';
import Title from '../../../Title';
import { WizardContext } from '../../../../contextApi/WizardProvider';
import WizardNavigation from '../../_partials/WizardNavigation';

const ProjectOne = ({
  step,
  service,
  setStep,
}: {
  step: number,
  service: string,
  setStep: (n: number) => void,
}) => {
  const {
    projectInfo,
    submitProjectInfo,
  } = useContext(WizardContext);
  const types = [{
    value: 'mobileApp',
    label: 'Mobiele applicatie',
  }, {
    value: 'webApp',
    label: 'Web applicatie',
  }, {
    value: 'api',
    label: 'API',
  }];

  const initSelected = (selected: any[]) => {
    if (!isEmpty(selected)) {
      return selected;
    }
    return map(types, ({ value }) => ({
      name: value,
      selected: false,
    }));
  };
  const [selectedTypes, setSelectedTypes] = useState(initSelected(projectInfo.selectedTypes));

  const toggleSelected = (v: string) => {
    const copySelected = { ...selectedTypes };
    const selectObject = find(copySelected, { name: v });
    selectObject.selected = !selectObject.selected;
    setSelectedTypes(copySelected);
  };

  const selectedSchema = Yup.object().shape({
    name: Yup.string(),
    selected: Yup.bool(),
  });

  const formValidationSchema = Yup.object().shape({
    selectedTypes: selectedSchema.test(
      'has-selected',
      'Please select one type',
      (values: any) => some(values, 'selected'),
    ).required(),
  });

  return (
    <article className="flex flex-col items-center">
      <header className="mb-6 w-full flex flex-col items-center">
        <Title
          heading="h3"
          text="Wat wil je bouwen?"
        />
        <p className="text-center">U kan meerdere opties aanduiden</p>
      </header>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={{
          selectedTypes,
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          isValid,
          handleChange,
          handleSubmit,
        }) => (
          <form>
            <div className="flex flex-wrap mb-16">
              {map(types, ({ value: v, label }) => {
                const selectObject = find(selectedTypes, { name: v });
                const { name } = find(values.selectedTypes, { name: v });
                return (
                  <Input
                    name="selectedTypes"
                    type="customcheckbox"
                    onChange={(e: any) => {
                      toggleSelected(e.target.value);
                      handleChange({
                        type: 'change',
                        target: {
                          name: 'selectedTypes',
                          value: selectedTypes,
                        },
                      });
                    }}
                    value={name}
                  >
                    <div className={c('bg-white cursor-pointer w-48 h-48 flex flex-col items-center justify-center rounded-lg mx-4', {
                      'border border-bx-blue': selectObject && selectObject.selected,
                    })}
                    >
                      <img
                        src={`/wizard/types/${v}.svg`}
                        alt={v}
                        className="w-16"
                      />
                      <p className="font-bold text-center">{label}</p>
                    </div>
                  </Input>
                );
              })}
            </div>
            <div className="flex flex-col items-center">
              <Title
                heading="h3"
                text="Bestaat er al iets?"
              />
              <p className="mb-6">Voeg hieronder een link toe naar het project</p>
              <Input
                type="text"
                placeholder="www.website.com"
                name="added"
                className="rounded-full mb-6"
                onChange={(e: any) => console.log(e)}
              />
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

export default ProjectOne;
