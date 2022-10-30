import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import styles from './input-control.module.sass';

/**
 *
 *  The  params with Formik https://formik.org/docs/api/
 */

const InputControl = ({
    className,
    label,
    labelClassName,
    error,
    refEffect,
    type,
    children,
    message,
    placeholder,
    variant: Component,
    ...props
}) => {
    const htmlFor = `${type}-${Math.random()}`;
    const wrapperRef = useRef(null);
    const attrs = props.field ? { ...props.field } : { ...props };
    const erorStyle = props.form
        ? props.form.errors && props.form.errors[attrs.name] && props.form.touched && props.form.touched[attrs.name]
        : error;
    const value = props.field ? (props.field.value ? props.field.value : '') : props.value;
    return (
        <div className={ClassNames(styles.wrapper, className)} ref={wrapperRef}>
            <label className={ClassNames(styles.label, labelClassName)} htmlFor={htmlFor}>
                {label}
            </label>
            <Component
                id={htmlFor}
                type={type}
                {...attrs}
                value={value}
                className={erorStyle ? styles.error : null}
                placeholder={placeholder}
            />
            {children}
        </div>
    );
};

InputControl.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
    message: PropTypes.bool,
    error: PropTypes.string,
    labelClassName: PropTypes.string,
    placeholder: PropTypes.string,
    refEffect: PropTypes.func,
    variant: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
};
InputControl.defaultProps = {
    type: 'text',
    children: null,
    message: false,
    error: '',
    labelClassName: '',
    placeholder: '',
    refEffect: () => {},
    variant: 'input',
};

export default InputControl;
