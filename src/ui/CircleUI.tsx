/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import colors from '@utils/Colors';
import {FC} from 'react';
import {FlexStyle, View} from 'react-native';

interface CircleUIProps {
  size: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CircleUI: FC<CircleUIProps> = ({size, position}) => {
  let viewPosition: FlexStyle = {};

  switch (position) {
    case 'top-left':
      viewPosition = {top: -size / 2, left: -size / 2};
      break;
    case 'top-right':
      viewPosition = {top: -size / 2, right: -size / 2};
      break;
    case 'bottom-right':
      viewPosition = {bottom: -size / 2, right: -size / 2};
      break;
    case 'bottom-left':
      viewPosition = {bottom: -size / 2, left: -size / 2};
      break;
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        position: 'absolute',
        ...viewPosition,
      }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.SECONDARY,
          opacity: 0.3,
        }}
      />
      <View
        style={{
          width: size / 1.5,
          height: size / 1.5,
          borderRadius: size / 2,
          backgroundColor: colors.SECONDARY,
          opacity: 0.3,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{translateX: -size / 3}, {translateY: -200 / 3}],
        }}
      />
    </View>
  );
};

export default CircleUI;
