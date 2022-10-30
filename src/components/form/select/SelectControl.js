import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Select, { components } from 'react-select';
import './select.sass';

const CaretDownIcon = ({ isOpen }) => {
    return (
        <svg
            className={ClassNames('css-6q0nyr-Svg', 'select__icon', { 'select__icon--open': isOpen })}
            height="20"
            width="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};

const DropdownIndicator1 = (props) => {
    const {
        selectProps: { menuIsOpen },
    } = props;

    return (
        <components.DropdownIndicator {...props}>
            <CaretDownIcon isOpen={menuIsOpen} />
        </components.DropdownIndicator>
    );
};

function SelectControl({ className, label, options, placeholder, onChange, isSearchable = false, ...props }) {

    const handleChange = (value) => {
        if (props.field && props.form) {
            props.form.setFieldValue(props.field.name, value.value);
        } else {
            onChange(value);
        }
    };

    return (
        <div className={ClassNames('select__container', className)}>
            <Select
                {...props}
                components={{ IndicatorSeparator: () => null, DropdownIndicator: DropdownIndicator1 }}
                className="select"
                classNamePrefix="select"
                placeholder={placeholder}
                options={options ? options : []}
                value={
                    options
                        ? props.field
                            ? options.find((option) => option.value === props?.field?.value)
                            : options.find((option) => option.value === props?.value?.value)
                        : ''
                }
                closeMenuOnSelect={true}
                isSearchable={isSearchable}
                onChange={handleChange}
                // defaultMenuIsOpen={true} //from get DOM option styles and className
            />
        </div>
    );
}

SelectControl.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
};
SelectControl.defaultProps = {
    className: '',
    label: '',
    placeholder: '',
    options: [],
    onChange: () => {},
};

export default SelectControl;
