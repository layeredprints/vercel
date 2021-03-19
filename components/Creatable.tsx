import { useState, KeyboardEvent, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { map, isEmpty } from 'lodash';
import c from '../utils/c';

const Creatable = ({
  name,
  placeholder,
  values,
  className,
  onChange,
}: {
  name: string,
  placeholder: string,
  values: any[],
  className?: string,
  onChange: (e: any) => void
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState([]);

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const parseToExport = (vals: any[]) => ({
    target: {
      name,
      value: map(vals, ({ value }) => (value)),
    },
  });

  const handleDelete = (newValues: any) => {
    setOptions(newValues);
    onChange(parseToExport(newValues));
  };

  const handleInputChange = (currentInputValue: string) => {
    setInputValue(currentInputValue);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab': {
        const newOption = createOption(inputValue);
        const allOptions = [...options, newOption];
        setOptions(allOptions);
        onChange(parseToExport(allOptions));
        setInputValue('');
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isEmpty(values)) {
      const defaultOptions = map(values, (value) => createOption(value));
      setOptions(defaultOptions);
      onChange(parseToExport(defaultOptions));
    }
  }, []);

  return (
    <CreatableSelect
      components={{
        DropdownIndicator: null,

      }}
      inputValue={inputValue}
      isClearable={false}
      isMulti
      menuIsOpen={false}
      onChange={(e: any) => {
        handleDelete(e);
      }}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      name={name}
      value={options}
      className={c('creatable border border-gray-400', className)}
    />
  );
};

export default Creatable;
