import {useAppDispatch, useAppSelector} from '@store/hooks';
import {updateNotification} from '@store/notification';
import colors from '@utils/Colors';
import React, {FC, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AppNotificationProps {}

const AppNotification: FC<AppNotificationProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {message, type} = useAppSelector(state => state.notification);
  const height = useSharedValue(0);
  const heightStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });
  let backgroundColor = colors.ERROR;
  let textColor = colors.CONTRAST;

  switch (type) {
    case 'success':
      backgroundColor = colors.SUCCESS;
      textColor = colors.PRIMARY;
      break;
  }

  useEffect(() => {
    let timeOutId = 0;
    const performAnimation = () => {
      height.value = withTiming(45, {
        duration: 150,
      });

      timeOutId = setTimeout(() => {
        height.value = withTiming(0, {
          duration: 150,
        });
        dispatch(updateNotification({message: '', type}));
      }, 3000);
    };

    if (message) {
      performAnimation();
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, height, message, type]);

  return (
    <Animated.View style={[styles.container, {backgroundColor}, heightStyle]}>
      <Text style={[styles.message, {color: textColor}]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    alignItems: 'center',
  },
});

export default AppNotification;
