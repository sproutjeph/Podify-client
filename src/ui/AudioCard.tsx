import colors from '@utils/Colors';
import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface AudioCardProps {
  title: string;
  poster?: string;
  playing?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?(): void;
  onLongPress?(): void;
}

const AudioCard: FC<AudioCardProps> = ({
  title,
  poster,
  playing,
  containerStyle,
  onLongPress,
  onPress,
}) => {
  const source = poster ? {uri: poster} : require('../assets/music.png');

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        console.log('on Audio Press');
      }}
      onLongPress={() => {
        console.log('on Audio Long Press');
      }}>
      <Image source={source} style={styles.image} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 15,
  },
  image: {
    height: 100,
    borderRadius: 7,
    resizeMode: 'cover',
    aspectRatio: 1,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
});

export default AudioCard;
