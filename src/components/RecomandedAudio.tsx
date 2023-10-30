import {useFetchRecommendedAudios} from '@hooks/queries';
import AudioCard from '@ui/AudioCard';
import GridView from '@ui/GridView';
import PulseAnimationContainer from '@ui/PulseAnimationContainer';
import colors from '@utils/Colors';
import React, {FC} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface RecomandedAudioProps {}
const dummyData = new Array(6).fill('');

const RecomandedAudio: FC<RecomandedAudioProps> = ({}) => {
  const {data, isLoading} = useFetchRecommendedAudios();

  if (isLoading) {
    return (
      <PulseAnimationContainer>
        <View>
          <View style={styles.dummyTitleView} />
          <GridView
            col={3}
            data={dummyData}
            renderItem={item => {
              return <View style={styles.dummyAudioView} />;
            }}
          />
        </View>
      </PulseAnimationContainer>
    );
  }

  return (
    <View>
      <Text style={styles.title}>You may like this</Text>
      <GridView
        col={3}
        data={data || []}
        renderItem={item => {
          return (
            <AudioCard
              title={item.title}
              poster={item.poster}
              // onPress={() => onAudioPress(item, data)}
              // onLongPress={() => onAudioLongPress(item, data)}
              containerStyle={{width: '100%'}}
              // playing={onGoingAudio?.id === item.id}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  audioTitle: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  poster: {width: '100%', aspectRatio: 1, borderRadius: 7},
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
  dummyAudioView: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
  },
});

export default RecomandedAudio;
