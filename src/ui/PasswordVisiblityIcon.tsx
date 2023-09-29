/* eslint-disable react/react-in-jsx-scope */
import colors from '@utils/Colors';
import {FC} from 'react';
import Icon from 'react-native-vector-icons/Entypo';

interface PasswordVisiblityIconProps {
  privateIcon: boolean;
}

const PasswordVisiblityIcon: FC<PasswordVisiblityIconProps> = ({
  privateIcon,
}) => {
  return privateIcon ? (
    <Icon name="eye" color={colors.SECONDARY} size={16} />
  ) : (
    <Icon name="eye-with-line" color={colors.SECONDARY} size={16} />
  );
};

export default PasswordVisiblityIcon;
