/* eslint-disable react/react-in-jsx-scope */
import AppButton from '@ui/AppButton';
import {useFormikContext} from 'formik';
import {FC} from 'react';

interface SubmitBtnProps {
  title: string;
}

const SubmitBtn: FC<SubmitBtnProps> = ({title}) => {
  const {handleSubmit, isSubmitting} = useFormikContext();
  return (
    <AppButton
      onPress={() => handleSubmit()}
      title={title}
      loading={isSubmitting}
    />
  );
};

export default SubmitBtn;
