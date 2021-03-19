import { Formik } from 'formik';
import {
  find, isEmpty, map, some,
} from 'lodash';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import c from '../../../utils/c';
import Input from '../../Input';
import Title from '../../Title';
import WizardNavigation from '../_partials/WizardNavigation';
import { WizardContext } from '../../../contextApi/WizardProvider';

const index = ({
  step,
  setStep,
  service,
  setService,
} : {
  step: number,
  setStep: (e: number) => void,
  service,
  setService: (s: string) => void,
}) => {
  const {
    projectInfo,
    submitProjectInfo,
  } = useContext(WizardContext);

  const skills = [{
    value: 'web_dev',
    label: 'Web Development',
  }, {
    value: 'mobile_dev',
    label: 'Mobile Development',
  }, {
    value: 'design',
    label: 'Design (UI / UX)',
  }, {
    value: 'business_analyse',
    label: 'Business Analyse',
  }, {
    value: 'functional_analyse',
    label: 'Functionele Analyse',
  }, {
    value: 'prod_management',
    label: 'Product Management',
  }, {
    value: 'blockchain',
    label: 'Blockchain',
  }, {
    value: 'big_data',
    label: 'Big Data',
  }, {
    value: 'ai',
    label: 'Artificial Intelligence',
  }, {
    value: 'machine_learning',
    label: 'Machine Learning',
  }, {
    value: 'chatbots',
    label: 'Chatbots',
  }, {
    value: 'printing',
    label: '3D printing',
  }];

  const initSelected = (selected: any[]) => {
    if (!isEmpty(selected)) {
      return selected;
    }
    return map(skills, ({ value }) => ({
      name: value,
      selected: false,
    }));
  };
  const [selectedSkills, setSelectedSkills] = useState(initSelected(projectInfo.selectedSkills));
  const [addedSkills, setAddedSkills] = useState([]);

  const toggleSelected = (v: string) => {
    const copySelected = { ...selectedSkills };
    const selectObject = find(copySelected, { name: v });
    selectObject.selected = !selectObject.selected;
    setSelectedSkills(copySelected);
  };

  const selectedSchema = Yup.object().shape({
    name: Yup.string(),
    selected: Yup.bool(),
  });

  const formValidationSchema = Yup.object().shape({
    selectedSkills: selectedSchema.test(
      'has-selected',
      'Please select one technologie',
      (values: any) => some(values, 'selected'),
    ).required(),

  });

  return (
    <article>
      <Formik
        validateOnMount
        enableReinitialize
        initialValues={{
          selectedSkills,
          addedSkills,
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values) => {
          submitProjectInfo(values.selectedSkills, 'selectedSkills');
          submitProjectInfo(values.addedSkills, 'addedSkills');
        }}
      >
        {({
          values,
          isValid,
          handleChange,
          handleSubmit,
        }) => (
          <form>
            <div className="flex">
              {map(skills, ({ value: v, label }) => {
                const selectObject = find(selectedSkills, { name: v });
                console.log(selectObject);
                const { name } = find(values.selectedSkills, { name: v });
                return (
                  <Input
                    name="selectedSkills"
                    type="customcheckbox"
                    onChange={(e: any) => {
                      toggleSelected(e.target.value);
                      handleChange({
                        type: 'change',
                        target: {
                          name: 'selectedSkills',
                          value: selectedSkills,
                        },
                      });
                    }}
                    value={name}
                  >
                    <div className={c('bg-white cursor-pointer', {
                      'border border-bx-blue': selectObject && selectObject.selected,
                    })}
                    >
                      {label}
                    </div>
                  </Input>
                );
              })}
            </div>
            <Title
              heading="h4"
              text="Staat de vaardigheid niet in de lijst?"
            />
            <p>Voeg ze hieronder toe</p>
            <Input
              type="creatable"
              placeholder="Type technology name and press ENTER to add"
              name="extraexperience"
              className="bg-white rounded-full"
              onChange={(e: any) => setAddedSkills(e.target.value)}
            />
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
    </article>
  );
};

export default index;
