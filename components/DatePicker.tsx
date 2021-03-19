import { isArray } from 'lodash';
import moment, { isDate } from 'moment';
import ReactDatePicker from 'react-date-picker';
import c from '../utils/c';

const DatePicker = ({
  name,
  label,
  value,
  required,
  minDate,
  maxDate,
  selectRange,
  disabled,
  calenderIcon,
  clearIcon = true,
  className,
  onChange,
}: {
  name: string,
  label?: string,
  value: any,
  required?: boolean,
  minDate?: any,
  maxDate?: any,
  selectRange?: boolean,
  disabled?: boolean,
  calenderIcon?: any,
  clearIcon?: any,
  className?: string,
  onChange: (e: any) => void,
}) => {
  const datePickerTime = (isArray(value) || isDate(value)
    ? value : value ? moment(value).toDate() : null);
  return (
    <div className="c-datepicker">
      {label && (
      <label
        htmlFor={name}
        className={c('a-input__label', { 'a-input__label--required': required })}
      >{label}
      </label>
      )}
      <ReactDatePicker
        name={name}
        disabled={disabled}
        className={className}
        showLeadingZeros={false}
        value={datePickerTime}
        onChange={(e: any) => onChange({ target: { name, value: e } })}
        calendarIcon={calenderIcon || <i className="fa fa-calendar text-gray-500" />}
        clearIcon={clearIcon ? <i className="fa fa-times text-gray-500 u-text-light" /> : null}
        locale="nl-BE"
        format="d-M-y"
        required={required}
        maxDate={maxDate}
        minDate={minDate}
        selectRange={selectRange}
      />
    </div>
  );
};

export default DatePicker;
