// import { find, reject, split, uniqueId, keys, map, concat, max, findIndex, forEach } from 'lodash-es';
import {
  createContext, useState, useMemo, useEffect,
} from 'react';

export const WizardContext = createContext<any>({});

const Personal: any = {
  telephone: null,
  email: null,
  message: null,
};

const Project: any = {
  selectedTypes: [],
  existingProjectUrl: null,
  selectedDeliveries: [],
  selectedSize: null,
  selectedSpeed: null,
  selectedStart: null,
  selectedSkills: null,
  addedSkills: null,
  personal: Personal,
};

const Team: any = {
  selectedTechnologies: [],
  addedTechnologies: [],
  sprintDuration: null,
  sprintCurrency: null,
  sprintAmount: null,
  sprintStart: null,
  personal: Personal,
};

export const WizardProvider = ({
  children,
}: any) => {
  const [teamInfo, setTeamInfo] = useState<any>(Team);
  const [projectInfo, setProjectInfo] = useState<any>(Project);
  const [personalInfo, setPersonalInfo] = useState<any>(Personal);

  const submitTeamInfo = (
    newInfo: any,
    name: string,
  ) => {
    console.log(newInfo, name);
    setTeamInfo((prevState: any) => ({ ...prevState, [name]: newInfo }));
  };

  const submitProjectInfo = (
    newInfo: any,
    name: string,
  ) => {
    setProjectInfo((prevState: any) => ({ ...prevState, [name]: newInfo }));
  };

  const submitWizardForm = (
    values: any,
    type: string,
  ) => {
    setPersonalInfo(values);
    if (type === 'team') {
      console.log(teamInfo);
    } else {
      console.log(projectInfo);
    }
  };

  const context = useMemo(() => ({
    teamInfo,
    projectInfo,
    personalInfo,
    submitTeamInfo,
    submitProjectInfo,
    setPersonalInfo,
    submitWizardForm,
  }), [
    teamInfo,
    projectInfo,
    personalInfo,
  ]);

  return (
    <WizardContext.Provider value={context}>
      {children}
    </WizardContext.Provider>
  );
};

export default WizardProvider;
