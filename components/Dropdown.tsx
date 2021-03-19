import Select from 'react-select';
import { find } from 'lodash';
import c from '../utils/c';

type DropDownOption = {
  key: string | number,
  value: string,
  label: string,
}

const Dropdown = ({
  name,
  label,
  options,
  required,
  onChange,
  value,
  disabled,
  loading,
  clearable = true,
  placeholder,
  className,
}: {
  value: string;
  options: DropDownOption[];
  onChange: (e: any) => void;
  name?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
}) => {
  const v = find(options, { value });
  return (
    <div className={c(['a-input', 'c-dropdown', className, { 'is-required': required }])}>
      {label && <label className="a-input__label">{label}</label> }
      <Select
        className="c-dropdown__select"
        value={v || null}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        isLoading={loading}
        isClearable={clearable}
        onChange={(option: any) => {
          onChange({ target: { name, value: option ? option.value : undefined } });
        }}
      />
    </div>
  );
};

export default Dropdown;
