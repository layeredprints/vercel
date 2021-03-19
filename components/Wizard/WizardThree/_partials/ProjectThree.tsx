import { Formik } from 'formik';
import {
  find, isEmpty, map, some,
} from 'lodash';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { WizardContext } from '../../../../contextApi/WizardProvider';
import c from '../../../../utils/c';
import Input from '../../../Input';
import WizardNavigation from '../../_partials/WizardNavigation';

const ProjectThree = ({
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
  const today = new Date();
  const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

  const sizes = [{
    value: 'sm',
  }, {
    value: 'md',
  }, {
    value: 'lg',
  }];

  const speeds = [{
    value: 'slow',
  }, {
    value: 'medium',
  }, {
    value: 'fast',
  }];

  const initSelected = (type, selected: any[]) => {
    if (!isEmpty(selected)) {
      return selected;
    }
    if (type === 'size') {
      return map(sizes, ({ value }) => ({
        name: value,
        selected: false,
      }));
    }
    return map(speeds, ({ value }) => ({
      name: value,
      selected: false,
    }));
  };
  const [selectedSize, setSelectedSize] = useState(initSelected('size', projectInfo.projectSize));
  const [selectedSpeed, setSelectedSpeed] = useState(initSelected('speed', projectInfo.projectSpeed));
  const [selectedStart, setSelectedStart] = useState(projectInfo.projectStart || nextWeek);

  const toggleSelected = (type: string, v: string) => {
    const copySelected = (type === 'speed') ? { ...selectedSpeed } : { ...selectedSize };
    const selectObject = find(copySelected, { name: v });
    selectObject.selected = !selectObject.selected;
    if (type === 'size') {
      setSelectedSize(copySelected);
    } else {
      setSelectedSpeed(copySelected);
    }
  };

  const selectedSchema = Yup.object().shape({
    name: Yup.string(),
    selected: Yup.bool(),
  });

  const formValidationSchema = Yup.object().shape({
    selectedSize: selectedSchema.test(
      'has-selected',
      'Please select one technologie',
      (values: any) => some(values, 'selected'),
    ).required(),
    selectedSpeed: selectedSchema.test(
      'has-selected',
      'Please select one technologie',
      (values: any) => some(values, 'selected'),
    ).required(),
    selectedStart: Yup.date().required(),
  });

  return (
    <article>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={{
          selectedSize,
          selectedSpeed,
          selectedStart,
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values: any) => {
          submitProjectInfo(values.selectedTechnologies, 'selectedTechnologies');
          submitProjectInfo(values.addedTechnologies, 'addedTechnologies');
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
              <div>
                <label className="py-2 font-openSans font-extrabold block cursor-pointer" htmlFor="projectSize">Hoe groot is je project?</label>
                <div className="flex">
                  {map(sizes, ({ value: v }) => {
                    const selectObject = find(selectedSize, { name: v });
                    return (
                      <Input
                        name="selectedSize"
                        type="customcheckbox"
                        onChange={(e: any) => {
                          toggleSelected('size', e.target.value);
                          handleChange({
                            type: 'change',
                            target: {
                              name: 'selectedSize',
                              value: selectedSize,
                            },
                          });
                        }}
                        value={v}
                      >
                        <div className={c('bg-white cursor-pointer flex flex-col items-center', {
                          'border border-bx-blue': selectObject && selectObject.selected,
                        })}
                        >
                          <img
                            src={`/wizard/scopes/${v}.svg`}
                            className="w-6"
                            alt={v}
                          />
                          {v}
                        </div>
                      </Input>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="py-2 font-openSans font-extrabold block cursor-pointer" htmlFor="projectSpeed">Hoe snel wil je dit?</label>
                <div className="flex">
                  {map(speeds, ({ value: v }) => {
                    console.log(selectedSpeed);
                    const selectObject = find(selectedSpeed, { name: v });
                    console.log(selectObject);
                    return (
                      <Input
                        name="selectedSpeed"
                        type="customradio"
                        onChange={(e: any) => {
                          toggleSelected('speed', e.target.value);
                          handleChange({
                            type: 'change',
                            target: {
                              name: 'selectedSpeed',
                              value: selectedSpeed,
                            },
                          });
                        }}
                        value={v}
                      >
                        <div className={c('bg-white cursor-pointer', {
                          'border border-bx-blue': selectObject && selectObject.selected,
                        })}
                        >
                          {v}
                        </div>
                      </Input>
                    );
                  })}
                </div>
              </div>
            </div>
            <Input
              name="selectedStart"
              label="Wanneer wil je starten?"
              type="date"
              defaultValue={values.selectedStart}
              className="rounded-full"
              minDate={nextWeek}
              onChange={(e: any) => {
                handleChange({
                  type: 'change',
                  target: {
                    name: 'selectedStart',
                    value: new Date(e),
                  },
                });
              }}
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

export default ProjectThree;
