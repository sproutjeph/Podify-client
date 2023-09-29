import React from 'react';
import {ReactNode} from 'react';
import {Formik, FormikHelpers} from 'formik';

interface FormProps<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void;
  children: ReactNode;
}

const Form = <T extends object>(props: FormProps<T>) => {
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validationSchema={props.validationSchema}>
      {props.children}
    </Formik>
  );
};

export default Form;
